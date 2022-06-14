/**
 * @author Nadir
 * @version 1.0
 */

import {View, Text, Image} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer1}>
        <View style={styles.infoContainer}>
          <Image
            source={require('../../../assets/images/time_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={[styles.namazInfoText, {color: colors.white}]}>
            06:45 PM
          </Text>
        </View>

        <View style={styles.infoContainer} mt={3}>
          <Image
            source={require('../../../assets/images/current_namaz_ic.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={[styles.namazInfoText, {fontSize: 20, marginTop: 6}]}>
            MAGHRIB
          </Text>
        </View>
      </View>

      <View style={styles.subContainer2}>
        <View style={styles.infoContainer}>
          <Image
            source={require('../../../assets/images/islamic_date_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={styles.dateInfo}>19 Ramdan, 1443</Text>
        </View>

        <View style={styles.infoContainer} mt={2}>
          <Image
            source={require('../../../assets/images/date_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={styles.dateInfo}>19 April, 2022</Text>
        </View>

        <View style={styles.infoContainer} mt={2}>
          <Image
            source={require('../../../assets/images/location_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={styles.dateInfo}>Sukkur Sindh, Pakistan</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row',
  },
  subContainer1: {
    flex: 0.4,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
  },
  subContainer2: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 20,
  },
  namazInfoText: {
    fontFamily: fonts.Signika.medium,
    color: colors.success.light,
    fontSize: 20,
    marginLeft: 3,
    marginTop: 3,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  dateInfo: {
    fontFamily: fonts.Signika.ligh,
    fontSize: 15,
    marginTop: 3,
    marginLeft: 3,
    color: colors.white,
  },
});
