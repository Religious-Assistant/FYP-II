/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Button} from 'native-base';

import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function CustomButton(props) {
  
  return (
    <Button
      onPress={props.onPress}
      disabled={props.disabled}
      onChangeText={props.onChangeText}
      isSecureText={true}
      _text={{
        fontSize: 'md',
        fontFamily: fonts.Signika.medium,
        color: props.color,
      }}
      mt={props.mt}
      colorScheme="yellow"
      variant={props.variant}>
      {props.title}
    </Button>
  );
}
