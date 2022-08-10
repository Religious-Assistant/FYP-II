import {Calendar} from 'react-native-calendars';
import {View, Text, Button} from 'react-native';
import React from 'react';

export default function Calander() {
  function writeHijri(date, lang) {
    var date = date || new Date();
    lang = lang || 'en';
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString(lang + '-u-ca-islamic', options);
  }
  function getDate(date) {
     //console.log(writeHijri(new Date(date.dateString), 'ar').date);
     //console.log(date.dateString)
//      let _date = new Date('7/10/2019').toLocaleDateString('ar-SA').format('DD/MM/YYYY');

// console.log(_date);
let _date = new Date('2022-08-28').toLocaleDateString('ar').Date;
 //console.log(_date)
    return writeHijri(new Date(date.dateString), 'ar');
    //return toHijri(new Date(date.dateString)).date;
  }
  return (
    <View>
      <Calendar
        style={{height: 500}}
        dayComponent={({date, state, marking}) => {
          return (
            <View
              style={{
                height: 100,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  elevation: state === 'today' ? 2 : 1,
                  color: state === 'today' ? 'blue' : 'black',
                  fontWeight: state === 'today' ? 'bold' : 'normal',
                }}>
                {getDate(date)}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
