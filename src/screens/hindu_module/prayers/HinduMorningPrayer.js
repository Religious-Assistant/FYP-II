/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, View, Text, ScrollView} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

export default function HinduMorningPrayer() {
  const morningPrayer = [
    {
      key: 1,
      info: 'Om \n Karagre vasate lakshmi \n Kar mule saraswati \n Kar madhe tu govinda \n Prabhate kara darshanam',
    },
    {
      key: 2,
      info: 'Om \n Samudra vasane devi \n Parvatastana manditi \n Vishnu patni namastubhyam \n Padasparsham kshamasva me',
    },
    {
      key: 3,
      info: 'Om \n Vakra tunda mahakaya \n Surya koti sama prabha \n Nirvighnam kuru me deva \n Sarva karyeshu sarvada',
    },
    {
      key: 4,
      info: 'Om \n Bhur bhuva svaha \n Om tat savitur varenyam \n Bhargo devasya dhimahi \n Dhyo yo nah prachodayat',
    },
    {
      key: 5,
      info: 'Om \n Adi deva namastubhyam \n Praseeda mama bhaskaray \n Divakara namastubhyam \n Prabhakara namastute',
    },
    {
      key: 6,
      info: 'Om \n Brahma muraris tripurantkari \n Bhanu shashi bhumisuto budhascha \n Guruscha shukra shani rahu ketuvah \n Kurvantu sarve mama suprabhatam',
    },
    {
      key: 7,
      info: 'Om \n Asato ma sad gamaya \n Tamaso ma jyotir gamaya \n Mrutyor ma amritam gamaya',
    },
    {
      key: 8,
      info: 'Om shanti shanti shantihi',
    },
    {
      key: 9,
      info: 'Om \n Purnam adah purnam idam \n Purnat purnam udachyate \n Purnasya purnam adaya \n Purnam eva vashishyate',
    },
    {
      key: 10,
      info: 'Om shanti shanti shantihi',
    },
  ];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      flex={1}
      backgroundColor={colors.white}>
      {/* Main view */}
      <View style={styles.root}>
        <View>
          <Text style={styles.userText}>Karagre vasate (Morning Prayer)</Text>
        </View>
        {morningPrayer.map(itm => {
          return (
            <Box
              key={itm.key}
              rounded="lg"
              overflow="hidden"
              style={styles.boxContainer}
              borderColor={colors.cover}
              borderWidth="1"
              _light={{
                backgroundColor: colors.cover,
              }}>
              <Text style={styles.statement}>{itm.info}</Text>
            </Box>
          );
        })}
        <Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    alignSelf: 'center',
    fontFamily: fonts.Signika.medium,
    fontSize: 24,
    padding: 5,
    marginTop: '10%',
  },
  boxContainer: {
    minWidth: '90%',
    padding: 15,
    marginTop: 20,
  },
  statement: {
    marginTop: 20,
    padding: 2,
    color: colors.tertiary,
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
  },
});
