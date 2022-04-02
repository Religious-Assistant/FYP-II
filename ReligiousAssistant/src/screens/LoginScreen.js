import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Box } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';

import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function LoginScreen() {
  return (
<Box>
<Box alignSelf="center" bg="primary.500" _text={{
      fontSize: "md",
      fontWeight: "medium",
      color: "warmGray.50",
      letterSpacing: "lg"
    }}>
      <Text style={styles.text}>Religious Assistant -Login</Text>
      </Box>
      </Box>
  )
}

const styles = StyleSheet.create({
  text:{
      fontSize:20,
      fontFamily: fonts.Signika.medium,
      backgroundColor: colors.secondary,
  }
})