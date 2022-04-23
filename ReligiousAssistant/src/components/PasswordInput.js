/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Input, Icon} from 'native-base';
import {StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function PasswordInput(props) {
  const mRight = props.mr ? props.mr : 0;
  const mLeft = props.ml ? props.ml : 0;
  const mTop = props.mt ? props.mt : 7;

  const [show, setShow] = React.useState(false);
  return (
    <Input
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      value={props.value}
      type={show ? 'text' : 'password'}
      _text={styles.text}
      color={colors.white}
      bgColor={colors.tertiary}
      name={props.name}
      InputRightElement={
        <Icon
          as={<Ionicons name={show ? 'eye' : 'eye-off'} />}
          size={6}
          mr="3%"
          color={colors.white}
          onPress={() => setShow(!show)}
        />
      }
      InputLeftElement={
        <Icon as={<Fontisto name="locked" />} size={5} ml="2%" color={colors.white} />
      }
      placeholder={props.textTitle}
      mr={mRight}
      ml={mLeft}
      mt={mTop}
      w={{
        base: props.base,
      }}
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
