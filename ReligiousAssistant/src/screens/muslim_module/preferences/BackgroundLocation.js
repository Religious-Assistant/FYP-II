
import {Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';

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
        console.log('Permission yes');
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
                      locations.longitude,
                      locations.latitude,
                    );
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
