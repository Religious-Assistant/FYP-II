/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Button} from 'native-base';

import fonts from '../theme/fonts';

export default function CustomButton(props) {

  const colorscheme = props.colorscheme? props.colorscheme:"yellow"
  return (
    <Button
      onPress={props.onPress}
      disabled={props.disabled}
      onChangeText={props.onChangeText}
      isSecureText={true}
      w={{
        base: props.base,
      }}
      _text={{
        fontSize: 'md',
        fontFamily: fonts.Signika.medium,
        color: props.color,
      }}
      mt={props.mt}
      colorScheme={colorscheme}
      variant={props.variant}
      >
      {props.title}
    </Button>
  );
}
