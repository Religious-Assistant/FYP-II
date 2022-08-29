/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {View, Box, Checkbox} from 'native-base';
import {StyleSheet, Text} from 'react-native';

//theme
import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function NamazTimes(props) {
  return (
    <View>
      <Box
        style={styles.subBox}
        _text={styles.text}
        shadow={2}
        p="1"
        px="3"
        pb="1"
        mb={props.mb}
        mt={props.mt}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>{props.text}</Text>
          <Checkbox
            value={props.text}
            my={2}
            colorScheme="green"
            accessibilityLabel="Namaz time"
          />
        </View>
      </Box>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
    color: colors.primary,
  },
  subBox: {
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
});
