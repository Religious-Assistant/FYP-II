/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Input} from 'native-base';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function TextInput(props) {
  const mRight = props.mr ? props.mr : 0;
  const mLeft = props.ml ? props.ml : 0;
  const mTop = props.mt ? props.mt : 0;

  return (
    <Input
      _text={styles.text}
      color={colors.white}
      bgColor={colors.tertiary}
      placeholder={props.textTitle}
      mr={mRight}
      ml={mLeft}
      mt={mTop}
      name={props.name}
      w={{
        base: props.base,
      }}
      InputLeftElement={<Icon as={props.icon} size={5} ml="2%" color={colors.white} />}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      value={props.value}
      borderColor={props.isInValid ? 'red.400' : 'white'}
    />
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
});
