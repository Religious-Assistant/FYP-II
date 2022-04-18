/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Button} from 'native-base';
import fonts from '../theme/fonts';

export default function MyButton(props) {
  return (
    <Button
      _text={{
        fontSize: 'md',
        fontWeight: '900',
        fontFamily: fonts.Signika.bold,
        color: props.color,
      }}
      mt={props.mt}
      colorScheme="yellow"
      variant={props.variant}>
      {props.title}
    </Button>
  );
}
