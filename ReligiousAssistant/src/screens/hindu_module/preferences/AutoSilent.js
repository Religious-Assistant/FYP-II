// /**
//  * @author Kinza
//  * @version 1.0
//  */

//  import {StyleSheet} from 'react-native';
//  import React from 'react';

//  import { View, Text, Button } from 'react-native';
//  import { useRingerMode,
//    RINGER_MODE,
//    checkDndAccess,
//    requestDndAccess,
//    RingerModeType, } from 'react-native-ringer-mode';

//  const modeText = {
//    [RINGER_MODE.silent]: 'Silent',
//    [RINGER_MODE.normal]: 'Normal',
//    [RINGER_MODE.vibrate]: 'Vibrate',
//  };
//  const AutoSilent = () => {
//    const { mode, setMode } = useRingerMode();

//    const changeMode = async (newMode) => {

//      // From N onward, ringer mode adjustments that would toggle Do Not Disturb
//      // are not allowed unless the app has been granted Do Not Disturb Access.
//      // @see https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)

//      if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
//        const hasDndAccess = await checkDndAccess();
//        if (hasDndAccess === false) {
//          // This function opens the DND settings.
//          // You can ask user to give the permission with a modal before calling this function.
//          requestDndAccess();
//          return;
//        }
//      }

//      setMode(newMode);
//    };
//    return (
//      <View>
//        <Text>{mode}</Text>
//        <Button title="Silent" onPress={() => changeMode(RINGER_MODE.silent)} />
//        <Button title="Vibrate" onPress={() => changeMode(RINGER_MODE.vibrate)} />
//        <Button title="Normal" onPress={() => changeMode(RINGER_MODE.normal)} />

//      </View>
//    );
//  };
//  export default AutoSilent;

//  const styles = StyleSheet.create({});

// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/

// import React in our code
import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const AutoSilent = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        subscribeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            subscribeLocation()
        
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
  
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const subscribeLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
      
        console.log(position);
 
        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log(error.message)
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>

        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AutoSilent;
