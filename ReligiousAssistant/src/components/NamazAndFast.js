/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider} from 'native-base';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

import NamazTimes from './NamazTimes';

export default function NamazAndFast(props) {
  const namaz = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
  return (
    <View style={styles.container}>
      <Box
        style={styles.mainBox}
        marginTop="5%"
        marginLeft={'2%'}
        maxW="96%"
        maxH={'93%'}>
        <VStack space="1.5" divider={<Divider />}>
          <NamazTimes text="Fajr" mt="2%" />
          <NamazTimes text="Zuhr" />
          <NamazTimes text="Asr" />
          <NamazTimes text="Maghrib" />
          <NamazTimes text="Isha" mb="2%" />
        </VStack>
      </Box>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: colors.white,
    marginTop: 30,
    fontFamily: fonts.Signika.regular,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    border: 1,
    borderWidth: 4,
    backgroundColor: colors.cover,
    borderColor: colors.cover,
  },
  subBox: {
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
});
