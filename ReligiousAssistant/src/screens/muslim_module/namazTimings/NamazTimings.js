/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, Center, VStack, Box} from 'native-base';

import timeICon from '../../../assets/images/clock_ic.png';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../../redux/slices/muslim_module_slices/bottomNavSlice';

export default function NamazTimings({navigation}) {

  const dispatch=useDispatch()
  //when tab is focused in MuslimBottomTab.js, this will be called 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          dispatch(setTab('Prayers'))    
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  const namazTimes = [
    {
      key: 1,
      title: 'Fajr',
      startTime: '4:30 AM',
      endTime: '5:00 AM',
      image: require('../../../assets/images/fajr_img.jpeg'),
    },
    {
      key: 2,
      title: 'Duhr',
      startTime: '1:30 PM',
      endTime: '2:00 PM',
      image: require('../../../assets/images/duhr_img.jpeg'),
    },
    {
      key: 3,
      title: 'Asr',
      startTime: '5:00 PM',
      endTime: '5:20 PM',
      image: require('../../../assets/images/asr_img.jpeg'),
    },
    {
      key: 4,
      title: 'Maghrib',
      startTime: '6:50 PM',
      endTime: '7:15 PM',
      image: require('../../../assets/images/maghrib_img.jpeg'),
    },
    {
      key: 5,
      title: 'Isha',
      startTime: '8:30 PM',
      endTime: '9:00 PM',
      image: require('../../../assets/images/isha_img.jpeg'),
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <View
        style={{
          flex: 0.17,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
          <Heading color={colors.secondary} marginLeft="10%" marginTop={'10%'}>
            <Text style={{fontFamily: fonts.Signika.bold}}>
              The Key of Jannah is{' '}
            </Text>
            <Heading color={colors.white}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Salah</Text>
            </Heading>
          </Heading>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <Image
            source={timeICon}
            style={{
              marginTop: '12%',
              marginRight: '5%',
              height: 100,
              width: 100,
            }}
            alt="icon .."
          />
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
            {/* Namaz timings of a mosque */}
          <Text
            style={{
              fontFamily: fonts.Signika.bold,
              color: colors.primary,
              marginLeft: '8%',
              fontSize: 16,
            }}>
            Namaz Timings about Sukkur IBA Mosque
          </Text>
        </Center>
        {namazTimes.map((itm, index) => {
          return (
            <Box
              key = {itm.key}
              p={-5}
              width="100%"
              bg={colors.cover}
              mt="3%"
              ml="2%"
              borderWidth={4}
              borderRadius={4}
              borderColor={colors.cover}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={itm.image}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                  alt="icon .."
                />
                {/* Start time of prayer */}
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.text}>Start time</Text>
                  <Text style={styles.startTime}>{itm.startTime}</Text>
                </View>
                {/* Emd time of prayer */}
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.text}>End time</Text>
                  <Text style={styles.endTime}>{itm.endTime}</Text>
                </View>
              </View>
            </Box>
          );
        })}
      </View>
    </View>
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
  startTime: {
    fontFamily: fonts.Signika.medium,
    color: colors.success.deep,
    marginTop: '5%',
    marginLeft: '6%',
    fontSize: 20,
  },
  endTime: {
    fontFamily: fonts.Signika.medium,
    color: colors.error,
    marginTop: '5%',
    marginLeft: '6%',
    fontSize: 20,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});
