import React from 'react'
import { VStack, Select,CheckIcon } from 'native-base';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import { StyleSheet } from 'react-native';
export default function MyDropdown(props) {
    
  let [religion, setReligion] = React.useState('');
  return (
            <Select
              mt={props.mt}
              shadow={2}
              selectedValue={religion}
              minWidth="200"
              _text={styles.text}
              accessibilityLabel="Choose religion"
              placeholder="Choose religion"
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
              }}>
              <Select.Item shadow={2} label="Islam" value="islam" />
              <Select.Item shadow={2} label="Hinduism" value="hinduism" />
            </Select>
          
  )
}

const styles = StyleSheet.create({
    text: {
      fontSize: 'md',
      fontWeight: '900',
      fontFamily: fonts.Signika.bold,
      color: 'white',
    },
  });
  