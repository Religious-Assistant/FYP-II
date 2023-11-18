/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {Text, View} from 'native-base';
import React from 'react';

//calendar
import {Calendar} from 'react-native-calendars';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//helper functions
import {
  writeIslamicFullDate,
  writeIslamicDateForCalendar,
} from '../../../utils/helpers';

export default function Calander() {
  function getDate(date) {
    const newDate = date.dateString.replaceAll('-', ',');
    const changeme =
      newDate.split(',')[1][0] == 0
        ? newDate.split(',')[1][1]
        : newDate.split(',')[1];
    const finalyear = newDate.split(',')[2];
    const finalmonth = changeme - 1;
    const finalDate = newDate.split(',')[0];
    return writeIslamicDateForCalendar(
      new Date(finalDate, finalmonth, finalyear),
      -2,
    );
  }

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text
          style={{
            color: colors.primary,
            alignSelf: 'center',
            fontFamily: fonts.Signika.bold,
            fontSize: 16,
          }}>
          {writeIslamicFullDate(new Date(), -2)}
        </Text>
        <Calendar
          style={{height: 500}}
          dayComponent={({date, state, marking}) => {
            return (
              <View
                style={{
                  height: 80,
                }}>
                <View
                  style={{
                    borderRadius: 40,
                    width: 50,
                    height: 50,
                    backgroundColor:
                      state == 'today' ? colors.primary : colors.cover,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: fonts.Signika.regular,
                      elevation: state === 'today' ? 2 : 1,
                      color: state === 'today' ? colors.white : colors.primary,
                      fontWeight: state === 'today' ? 'bold' : 'normal',
                    }}>
                    {date.dateString.split('-')[2]}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      elevation: state === 'today' ? 3 : 1,
                      fontFamily: fonts.Signika.bold,
                      fontSize: 16,
                      color:
                        state === 'today' ? colors.secondary : colors.primary,
                      fontWeight: state === 'today' ? 'bold' : 'normal',
                    }}>
                    {getDate(date)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
