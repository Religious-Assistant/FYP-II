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

export default function PrayerNotToDo() {
  const prayerItems = [
    {
      key: 1,
      info: 'Do not light lamps without taking a bath.',
    },
    {
      key: 2,
      info: 'Sit in comfortable asana so that you can finish your puja without breaks.',
    },
    {
      key: 3,
      info: 'Do not have mobiles and other electronic items that can distract you.',
    },
    {
      key: 4,
      info: 'Do not perform puja while showing your back to the deities.',
    },
    {
      key: 5,
      info: 'Always offer anything to God in a plate, not in bare hands.',
    },
    {
      key: 6,
      info: 'Never light Diya with another Diya, considered as bad luck.',
    },
    {
      key: 7,
      info: 'Do not pluck basil leaves on festival days, Friday, Sunday, 11th, and 12th day.',
    },
    {
      key: 8,
      info: 'Have idols below 11 inches in your puja house.',
    },
    {
      key: 9,
      info: 'Praying to broken idols is strictly prohibited.',
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
          <Text style={styles.userText}>
            What not to do during performing pooja?
          </Text>
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
          {prayerItems.map(itm => {
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
    fontFamily: fonts.Signika.regular,
    color: colors.tertiary,
    fontSize: 18,
  },
});
