/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Dimensions} from 'react-native';

//theme
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

//images
import empty_ic from '../../../assets/images/empty_ic.png';

const windowHeight = Dimensions.get('window').height;

const Empty = ({message}) => {
  return (
    <View style={styles.container}>
      <Image source={empty_ic} style={styles.box} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  text: {
    fontFamily: fonts.Signika.bold,
    fontSize: 25,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 200,
  },
});
