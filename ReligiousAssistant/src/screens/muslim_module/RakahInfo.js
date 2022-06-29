/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, Center, ScrollView} from 'native-base';


import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import rakahICon from '../../../assets/images/rakah_ic.png';
import Accordian from '../../components/Accordian';


export default function RakahInfo() {
  // static information about namaz rakats
  const rakats = {
    fajr: [
      {key: 1, rakatName: 'Sunnat', rakats: '2', value: false},
      {key: 2, rakatName: 'Farz', rakats: '2', value: false},
    ],
    duhr: [
      {key: 1, rakatName: 'Sunnat', rakats: '4', value: false},
      {key: 2, rakatName: 'Farz', rakats: '4', value: false},
      {key: 3, rakatName: 'Sunnat', rakats: '2', value: false},
      {key: 4, rakatName: 'Nafl', rakats: '2', value: false},
    ],
    asr: [
      {key: 1, rakatName: 'Sunnat', rakats: '4', value: false},
      {key: 2, rakatName: 'Farz', rakats: '4', value: false},
    ],
    maghrib: [
      {key: 1, rakatName: 'Farz', rakats: '3', value: false},
      {key: 2, rakatName: 'Sunnat', rakats: '2', value: false},
      {key: 3, rakatName: 'Nafl', rakats: '2', value: false},
    ],
    isha: [
      {key: 1, rakatName: 'Sunnat', rakats: '4', value: false},
      {key: 2, rakatName: 'Farz', rakats: '4', value: false},
      {key: 3, rakatName: 'Sunnat', rakats: '2', value: false},
      {key: 4, rakatName: 'Nafl', rakats: '2', value: false},
      {key: 5, rakatName: 'Witr', rakats: '3', value: false},
      {key: 6, rakatName: 'Nafl', rakats: '2', value: false},
    ],
    jummah: [
      {key: 1, rakatName: 'Sunnat', rakats: '4', value: false},
      {key: 2, rakatName: 'farz', rakats: '2', value: false},
      {key: 3, rakatName: 'Sunnat', rakats: '4', value: false},
      {key: 4, rakatName: 'Sunnat', rakats: '2', value: false},
      {key: 5, rakatName: 'Nafl', rakats: '2', value: false},
    ],
  };
  return (
    <ScrollView
    keyboardShouldPersistTaps="handled"
    flex={1}
    >
      
 <View style={{flex: 1, backgroundColor: colors.white}}>
  {/* Header */}
        <View
          style={{
            flex: 0.17,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Image
              source={rakahICon}
              style={{
                marginTop: '12%',
                marginRight: '5%',
                height: 100,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading
              color={colors.secondary}
              marginLeft="10%"
              marginTop={'10%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>
                Worries ends when{' '}
              </Text>
              <Heading color={colors.white}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  Salah begins
                </Text>
              </Heading>
            </Heading>
          </View>
        </View>
        <View style={{flex: 0.83}} width="95%">
          <Center
            width="85%"
            space={2}
            maxW="85%"
            marginTop={'5%'}
            marginLeft={'5%'}
            marginBottom={'5%'}>
            <Text
              style={{
                fontFamily: fonts.Signika.bold,
                color: colors.primary,
                marginLeft: '8%',
                fontSize: 20,
              }}>
              Rakats Information
            </Text>
          </Center>
          {/* Custom Accordian to show the rakats information */}
          <Accordian namazTime="Fajr" rakatsInfo={rakats.fajr} />
          <Accordian namazTime="Duhr" rakatsInfo={rakats.duhr} />
          <Accordian namazTime="Asr" rakatsInfo={rakats.asr} />
          <Accordian namazTime="Maghrib" rakatsInfo={rakats.maghrib} />
          <Accordian namazTime="Isha" rakatsInfo={rakats.isha} />
          <Accordian namazTime="Jummah" rakatsInfo={rakats.jummah} />
          <Accordian namazTime="Janaza Namaz" rakatsInfo={rakats.fajr} />
          <Accordian namazTime="Eid Namaz" rakatsInfo={rakats.fajr} />
        </View>
      </View>
    </ScrollView>
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});