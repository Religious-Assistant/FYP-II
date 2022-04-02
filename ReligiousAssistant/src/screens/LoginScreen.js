import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Box } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreeen from './SplashScreeen';
import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function LoginScreen() {
  return (
<SplashScreeen/>
  )
}

const styles = StyleSheet.create({
  text:{
      fontSize:20,
      fontFamily: fonts.SourceSansPro.bold,
      backgroundColor: colors.secondary,
  }
})


