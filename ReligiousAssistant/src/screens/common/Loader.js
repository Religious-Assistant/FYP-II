/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

//theme
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

const Loader = props => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      source={require('./loader2.json')}
      animationStyle={styles.lottie}
      speed={1}
      
      >
      <Text style={styles.lottieText}>{props.msg}</Text>
    </AnimatedLoader>
  );
};

export default Loader;

const styles = StyleSheet.create({
  lottie: {
    width: 175,
    height: 175,
  },
  lottieText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    color: colors.primary,
  },
});
