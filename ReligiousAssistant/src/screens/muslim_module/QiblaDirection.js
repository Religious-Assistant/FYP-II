/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../theme/colors';
import {Center} from 'native-base';
import image from '../../../assets/images/qibla_bg.png';
import kompass from '../../../assets/images/kompas.png';
import kabahImg from '../../../assets/images/kakbah.png';

class QiblaDirection extends Component {
  state = {
    compassHeading: 0,
    qiblad: 0,
  };

  componentDidMount() {
    this.getLocation();
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, degree => {
      this.setState({compassHeading: degree});
    });

    return () => {
      CompassHeading.stop();
    };
  }

  calculate = (latitude, longitude) => {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    this.setState({qiblad});
    console.log({qiblad});
  };

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
            this.calculate(latitude, longitude);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission not granted!');
      }
    } catch (err) {
      console.log('Location permission not granted!');
    }
  };

  render() {
    return (
      <View style={styles.Maincontainer}>
        <ImageBackground
          style={styles.imageBg}
          resizeMode="stretch"
          source={image}>
          <Center w="100%" mt={'95'} h="95%" maxW="100%">
            <ImageBackground
              source={kompass}
              style={[
                styles.image,
                {
                  transform: [
                    {rotate: `${360 - this.state.compassHeading}deg`},
                  ],
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{rotate: `${this.state.qiblad}deg`}],
                }}>
                <Image
                  source={kabahImg}
                  style={{
                    marginBottom: '52%',
                    resizeMode: 'contain',
                    flex: 0.7,
                    alignSelf: 'center',
                    marginRight: '7.5%',
                  }}
                />
              </View>
            </ImageBackground>
          </Center>
        </ImageBackground>
      </View>
    );
  }
}

export default QiblaDirection;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  image: {width: '90%', flex: 0.5, resizeMode: 'contain', alignSelf: 'center'},
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
