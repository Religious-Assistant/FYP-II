/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {HStack, Link, Text} from 'native-base';
import { StyleSheet} from 'react-native';

import {Icon} from 'native-base';
import Ioicon from 'react-native-vector-icons/Ionicons';

import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function BottomText(props) {
  return (
    <HStack mt={props.mt} justifyContent="center">
      <Text
        fontSize="sm"
        color={props.color}
        fontFamily={fonts.Signika.bold}
        w={{
          base: props.base,
        }}
        _dark={{
          color: colors.white,
        }}>
        {props.text}{' '}
      </Text>
      <Link _text={styles.link} href="#">
        {props.goTo}
        <Icon
          as={<Ioicon name="arrow-redo-circle-outline" />}
          color={colors.secondary}
          size={25}
        />
      </Link>
    </HStack>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
  link: {
    color: colors.secondary,
    fontSize: 'sm',
    fontFamily: fonts.Signika.medium,
  },
});
