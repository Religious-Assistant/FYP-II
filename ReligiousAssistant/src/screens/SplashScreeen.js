/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import bg_gif from  '../../assets/gifs/splash.gif';

function SplashScreeen() {
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="stretch"
      source={bg_gif}>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flexL: 1,
  },
  image: {
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

export default SplashScreeen;
