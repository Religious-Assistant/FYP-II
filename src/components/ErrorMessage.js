/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link} from 'native-base';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function ErrorMessage(props) {
  return (
    <>
      {props.error && props.errosTouched && (
        <View style={{flexDirection: 'row'}} mt="2%">
          <Link _text={styles.link} alignSelf="flex-start" mr="1%">
            <MaterialIcons name="error-outline" color={colors.error} />
          </Link>
          <Text
            style={{fontSize: 10, color: colors.error}}
            alignSelf="flex-end">
            {props.error}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: colors.error,
    fontFamily: fonts.Signika.medium,
  },
});
