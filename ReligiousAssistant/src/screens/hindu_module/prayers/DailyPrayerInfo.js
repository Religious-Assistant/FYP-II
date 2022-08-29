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

export default function DailyPrayerInfo() {
  const prayerInfo = [
    {
      key: 1,
      info: 'Take bath and wear clean clothes.',
    },
    {
      key: 2,
      info: 'Sit facing east or north to meditate, this will help you to achieve focus.',
    },
    {
      key: 3,
      info: 'Clean the pooja area.',
    },
    {
      key: 4,
      info: 'Light your Lamp.',
    },
    {
      key: 5,
      info: 'Start with the Ganesa hymn since he is the first God to pray. Say shlokas that relate to your house deity.',
    },
    {
      key: 6,
      info: 'If performing abhishekam, first clean the deity and then bath the deity with milk, honey, curd, sugar, and coconut water.',
    },
    {
      key: 7,
      info: 'Clean the idol with normal water after abhishekam.',
    },
    {
      key: 8,
      info: 'You can recite the same while offering flowers.',
    },
    {
      key: 9,
      info: 'Light the dhoops sticks and spreads the smoke throughout the house.',
    },
    {
      key: 10,
      info: 'Offer naivedyam to God – it can be fruits, milk, or anything you feel like offering to God.',
    },
    {
      key: 11,
      info: 'Perform aarti while reciting related verses.',
    },
    {
      key: 12,
      info: 'If you have performed abhishekam, you can consume the mixture as teertha and wind up your puja.',
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
          <Text style={styles.userText}>How to Perform Daily Pooja?</Text>
        </View>
        <Box
          rounded="lg"
          overflow="hidden"
          style={styles.boxContainer}
          borderColor={colors.cover}
          borderWidth="1"
          _light={{
            backgroundColor: colors.cover,
          }}>
          {prayerInfo.map(itm => {
            return (
              <Text key={itm.key} style={styles.statement}>
                {itm.key}. {itm.info}
              </Text>
            );
          })}
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Text
              color={colors.info}
              marginTop="3%"
              style={{fontFamily: fonts.Signika.regular}}
              fontWeight="400">
              pujaNpujari
            </Text>
          </View>
        </Box>
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
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
  },
});
