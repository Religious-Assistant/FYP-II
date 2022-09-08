/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//theme
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const NetworkError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>OOPS- Network Error</Text>
    </View>
  );
};

export default NetworkError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.primary,
    fontSize: 30,
    fontFamily: fonts.Signika.bold,
  },
});
