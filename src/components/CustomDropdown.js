/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Select, CheckIcon} from 'native-base';

//theme
import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function CustomDropdown(props) {
  let [religion, setReligion] = React.useState('');
  return (
    <Select
      _text={styles.text}
      color={colors.white}
      mt={props.mt}
      shadow={2}
      selectedValue={religion}
      minWidth="50%"
      accessibilityLabel="Choose Religion"
      placeholder="Choose Religion"
      w={{
        base: props.base,
      }}
      _selectedItem={{
        bg: colors.secondary,
        endIcon: <CheckIcon size="5" />,
      }}
      _light={{
        bg: colors.tertiary,
        _text: {color: colors.white},
      }}
      _dark={{
        bg: colors.white,
      }}
      onValueChange={itemValue => {
        setReligion(itemValue);
        props.onValueChange;
      }}>
      <Select.Item shadow={2} label="Islam" value="1" color={'white'} />
      <Select.Item shadow={2} label="Hinduism" value="2" color={'white'} />
    </Select>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
});
