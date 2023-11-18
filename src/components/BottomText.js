/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {HStack, Text, Image, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//theme
import fonts from '../theme/fonts';
import colors from '../theme/colors';

export default function BottomText(props) {
  const navigator = useNavigation();
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
      <TouchableOpacity
        onPress={() => {
          navigator.navigate(props.destination);
        }}>
        <View style={styles.container}>
          <Text style={styles.link}>{props.goTo}</Text>
          <Image
            source={require('../../assets/images/right_arrow_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: colors.secondary,
              marginLeft: 5,
            }}
            alt="Icon.."
          />
        </View>
      </TouchableOpacity>
    </HStack>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
  link: {
    color: colors.secondary,
    fontFamily: fonts.Signika.medium,
  },
});
