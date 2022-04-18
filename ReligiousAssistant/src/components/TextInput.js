/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Input} from 'native-base';
import {StyleSheet} from 'react-native';

import colors from '../theme/colors';
import fonts from '../theme/fonts';


export default function TextInput(props) {
  const mRight = props.mr ? props.mr : 0;
  const mLeft = props.ml ? props.ml : 0;
  const mTop = props.mt ? props.mt : 0;
  const basee = props.base ? props.base : '0%';

  return (
    <Input
      _text={styles.text}
      color={colors.white}
      bgColor={colors.tertiary}
      placeholder={props.textTitle}
      mr={mRight}
      ml={mLeft}
      mt={mTop}
      w={{
        base: props.base,
        
      }}
      
    />
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 'md',
    fontWeight: '900',
    fontFamily: fonts.Signika.bold,
    color: 'white',
  },
});
