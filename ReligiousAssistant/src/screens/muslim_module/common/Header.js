/**
 * @author Nadir
 * @version 1.0
 */

import {View, Text, Image} from 'native-base';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import moment from 'moment'
import moment_hijri from 'moment-hijri'
import { useDispatch, useSelector } from 'react-redux';
import { selectHasError, selectIsLoading, selectUserData } from '../../../redux/slices/auth_slices/authSlice';

// https://ej2.syncfusion.com/documentation/calendar/islamic-calendar/

export default function Header() {

  const token=useSelector(selectUserData)

  let m = moment_hijri("1443/11/19", "iYYYY/iMM/iD"); // Parse a Hijri date.

  const[currentTime,setCurrentTime]=useState(
      {
        time:moment().format('LTS'),
        islamicDatem:  m.format("iYYYY/iM/iD"),
        engDate:moment().format("D MMM, y")
      }
    )

  useEffect(()=>{

    const timerId=setInterval(()=>{
      setCurrentTime(
        {
          time:moment().format('LTS'),
          islamicDate:m.format("iYYYY/iM/iD"),
          engDate:moment().format("D MMM, y")
        }
      )
    },1000)
    // return clearInterval(timerId)
  },[])

  return (
      <View  style={styles.container}>
      <View style={[styles.subContainer1, {flex:token?0.4:0.6}]}>
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
          {currentTime.time}
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
            {/* 19 Ramdan, 1443 */}
          <Text style={styles.dateInfo}>{currentTime.islamicDate}</Text>
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
          <Text style={styles.dateInfo}>{moment().format("MMMM Do, YYYY")}</Text>
        </View>

            {
              token?<View style={styles.infoContainer} mt={2}>
              <Image
                source={require('../../../assets/images/location_ic.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'white',
                }}
                alt="Icon"></Image>
              <Text style={styles.dateInfo}>Sukkur Sindh, Pakistan</Text>
            </View>:<></>
            }
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
