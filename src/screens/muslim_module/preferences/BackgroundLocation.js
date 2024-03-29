import {Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {getDistanceFromLatLonInKm} from '../../../utils/getDistance';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import {getBoundsOfDistance, getDistance, getPreciseDistance} from 'geolib';

import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType,
} from 'react-native-ringer-mode';

ReactNativeForegroundService.start({
  id: 144,
  title: 'Auto Silent Mode',
  message: 'Enabled',
});

RNLocation.configure({
  desiredAccuracy: {
    ios: 'best',
    android: 'highAccuracy',
  },
  interval: 1000,
  maxWaitTime: 1000,
});

let locationSubscription = null;
let locationTimeout = null;

export default function BackgroundLocation() {
  const [location, setLocation] = useState('');
  const {mode, setMode} = useRingerMode();

  const changeMode = async newMode => {
    //this code will run when user click on autosilent mode
    // if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
    //   const hasDndAccess = await checkDndAccess();
    //   if (hasDndAccess === false) {
    //     // This function opens the DND settings.
    //     // You can ask user to give the permission with a modal before calling this function.
    //     requestDndAccess();
    //     return;
    //   }
    // }

    setMode(newMode);
  };

  useEffect(() => {
    const requestPermission = async () => {
      //request the permission before starting the service.
      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
        //do your thing!
        ReactNativeForegroundService.add_task(
          () => {
            RNLocation.requestPermission({
              ios: 'whenInUse',
              android: {
                detail: 'fine',
              },
            }).then(granted => {
              console.log('Location Permissions: ', granted);
              // if has permissions try to obtain location with RN location
              if (granted) {
                locationSubscription && locationSubscription();
                locationSubscription = RNLocation.subscribeToLocationUpdates(
                  ([locations]) => {
                    locationSubscription();
                    locationTimeout && clearTimeout(locationTimeout);
                    console.log(
                      'Location',
                      locations.latitude,
                      locations.longitude,
                      '  ',
                      27.9541659,
                      68.6330657,
                    );
                    console.log(
                      'getDistancee --- in meters',
                      getDistance(
                        {
                          latitude: locations.latitude,
                          longitude: locations.longitude,
                        },
                        {latitude: 27.9541659, longitude: 68.6330657},
                      ),
                    );

                    console.log(
                      'Dist in Km',
                      getDistanceFromLatLonInKm(
                        locations.latitude,
                        locations.longitude,
                        27.9541659,
                        68.6330657,
                        'K',
                      ),
                    );
                    console.log(
                      'Dist in M',
                      getDistanceFromLatLonInKm(
                        locations.latitude,
                        locations.longitude,
                        27.9541659,
                        68.6330657,
                        'M',
                      ),
                    );
                    // if(
                    //   getDistanceFromLatLonInKm(
                    //     locations.latitude,
                    //     locations.longitude,
                    //     27.9503082,
                    //   68.6313388,
                    //     'K',
                    //   )
                    // <0.00300){
                    //   console.log("Silent")
                    // }else{
                    //   console.log("No silent")
                    // }
                  },
                );

                RNLocation.getLatestLocation().then(loc => {
                  //console.log(JSON.stringify(loc.latitude,loc.longitude));
                });

                //working but console many time at once
                // RNLocation.subscribeToLocationUpdates((locations) => {
                //   const {latitude, longitude} = locations[0];
                //   console.log(`${JSON.stringify({latitude, longitude})}`);
                // });
                //end
              } else {
                locationSubscription && locationSubscription();
                locationTimeout && clearTimeout(locationTimeout);
                console.log('no permissions to obtain location');
              }
            });
          },
          {
            delay: 1000,
            onLoop: true,
            taskId: 'taskid',
            onError: e => console.log('Error logging:', e),
          },
        );
      }
    };
    requestPermission();
  }, []);
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}
