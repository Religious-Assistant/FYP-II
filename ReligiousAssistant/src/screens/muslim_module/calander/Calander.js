import {Text, View} from 'native-base';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
export default function Calander() {
  function gmod(n, m) {
    return ((n % m) + m) % m;
  }

  /* @param {Date}   date   - optional, default is today
   ** @param {number} adjust - optiona, days to adjust date by
   */
  function kuwaiticalendar(date, adjust) {
    var today = date ? new Date(+date) : new Date();
    if (adjust) {
      today.setDate(today.getDate() + +adjust);
    }

    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var m = month + 1;
    var y = year;

    if (m < 3) {
      y -= 1;
      m += 12;
    }

    var a = Math.floor(y / 100);
    var b = 2 - a + Math.floor(a / 4);

    if (y < 1583) b = 0;
    if (y == 1582) {
      if (m > 10) b = -10;
      if (m == 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    var jd =
      Math.floor(365.25 * (y + 4716)) +
      Math.floor(30.6001 * (m + 1)) +
      day +
      b -
      1524;

    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4);
    }

    var bb = jd + b + 1524;
    var cc = Math.floor((bb - 122.1) / 365.25);
    var dd = Math.floor(365.25 * cc);
    var ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;

    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;
    var wd = gmod(jd + 1, 7) + 1;

    var iyear = 10631 / 30;
    var epochastro = 1948084;
    var epochcivil = 1948085;

    var shift1 = 8.01 / 60;

    var z = jd - epochastro;
    var cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    var j = Math.floor((z - shift1) / iyear);
    var iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    var im = Math.floor((z + 28.5001) / 29.5);

    if (im == 13) im = 12;
    var id = z - Math.floor(29.5001 * im - 29);

    return [
      day, //calculated day (CE)
      month - 1, //calculated month (CE)
      year, //calculated year (CE)
      jd - 1, //julian day number
      wd - 1, //weekday number
      id, //islamic date
      im - 1, //islamic month
      iy, //islamic year
    ];
  }

  function writeIslamicFullDate(date, adjustment) {
    var wdNames = [
      'Ahad',
      'Ithnin',
      'Thulatha',
      'Arbaa',
      'Khams',
      'Jumuah',
      'Sabt',
    ];
    var iMonthNames = [
      'Muharram',
      'Safar',
      "Rabi'ul Awwal",
      "Rabi'ul Akhir",
      'Jumadal Ula',
      'Jumadal Akhira',
      'Rajab',
      "Sha'ban",
      'Ramadan',
      'Shawwal',
      "Dhul Qa'ada",
      'Dhul Hijja',
    ];
    var iDate = kuwaiticalendar(date, adjustment);
    var outputIslamicDate =
      iDate[5] + ' ' + iMonthNames[iDate[6]] + ' ' + iDate[7] + ' AH';
    return outputIslamicDate;
  }
  function writeIslamicDate1(date, adjustment) {
    var iDate = kuwaiticalendar(date, adjustment);
    var outputIslamicDate = iDate[5];
    return outputIslamicDate;
  }
  //console.log(writeIslamicDate(new Date(2022, 7, 17), -1).split(', ')[1].split(' ')[0]);
  function getDate(date) {
    const newDate = date.dateString.replaceAll('-', ',');
    const changeme =
      newDate.split(',')[1][0] == 0
        ? newDate.split(',')[1][1]
        : newDate.split(',')[1];
    //console.log(changeme)
    const finalyear = newDate.split(',')[2];
    const finalmonth = changeme - 1;
    const finalDate = newDate.split(',')[0];
    return writeIslamicDate1(new Date(finalDate, finalmonth, finalyear), -1);
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
          {writeIslamicFullDate(new Date(), -1)}
        </Text>
        <Calendar
          style={{height: 500}}
          dayComponent={({date, state, marking}) => {
            return (
              <View
                style={{
                  height: 100,
                }}>
                <View
                  style={{
                    borderRadius: 40,
                    width: 50,
                    height: 50,
                    backgroundColor: state=='today' ?colors.primary:colors.cover,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily:fonts.Signika.regular,
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
                      fontFamily:fonts.Signika.bold,
                      fontSize:16,
                      color: state === 'today' ? colors.secondary : colors.primary,
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
