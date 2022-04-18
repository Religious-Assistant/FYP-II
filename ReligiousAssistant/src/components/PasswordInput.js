/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Input, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import MyIcon from 'react-native-vector-icons/Ionicons';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function PasswordInput(props) {
  const mRight = props.mr ? props.mr : 0;
  const mLeft = props.ml ? props.ml : 0;
  const mTop = props.mt ? props.mt : 7;

  const [show, setShow] = React.useState(false);
  return (
    <Input
      type={show ? 'text' : 'password'}
      _text={styles.text}
      color={colors.white}
      bgColor={colors.tertiary}
      InputRightElement={
        <Icon
          as={<MyIcon name={show ? 'eye' : 'eye-off'} />}
          size={6}
          mr="2"
          color="white"
          onPress={() => setShow(!show)}
        />
      }
      
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
