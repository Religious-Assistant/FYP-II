/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {Image, Center} from 'native-base';

import CompassHeading from 'react-native-compass-heading';

//maps
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

//theme
import colors from '../../../theme/colors';

const QiblaDirection = () => {
  const [compassHeading, setCompassHeading] = useState(0);
  const [qiblad, setQiblad] = useState(0);
  useEffect(() => {
    const degree_update_rate = 3;
    getLocation();
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);
  // Calculation of Qibla Direction
  function calculate(latitude, longitude) {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qibladir =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    setQiblad(qibladir);
    console.log(qibladir);
  }
  // getting user's current location using geolocation
  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: "App needs access to your phone's location.",
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude);
            calculate(latitude, longitude);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: false, timeout: 15000},
        );
      } else {
        console.log('Location permission not granted!');
      }
    } catch (err) {
      console.log('Location permission not granted!', err);
    }
  };
  return (
    <View style={styles.Maincontainer}>
      <ImageBackground
        style={styles.imageBg}
        resizeMode="stretch"
        source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663410336/religious-assistant/static_assets/qibla_bg_xdsxa8.png'}}>
        <Center w="100%" mt={'95'} h="95%" maxW="100%">
          {/* Compass */}
          <ImageBackground
            style={[
              styles.image,
              {transform: [{rotate: `${360 - compassHeading}deg`}]},
            ]}
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663410413/religious-assistant/static_assets/kompas_cdd7pe.png'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{rotate: `${qiblad}deg`}],
              }}>
              {/* Arrow that points to Qibla Direction */}
              {qiblad ? (
                <Image
                  source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663410496/religious-assistant/static_assets/kabah_ic_qbykat.png'}}
                  alt="alt"
                  size={10}
                  style={{
                    marginBottom: '87%',
                    resizeMode: 'contain',
                    flex: 0.7,
                    alignSelf: 'center',
                    marginRight: '-8%',
                  }}
                />
              ) : (
                <View></View>
              )}
            </View>
          </ImageBackground>
        </Center>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '90%',
    flex: 0.5,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  container: {backgroundColor: colors.cover, flex: 1},
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default QiblaDirection;
