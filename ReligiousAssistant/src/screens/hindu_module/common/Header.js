/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'native-base';
import {StyleSheet} from 'react-native';

//moment
import moment from 'moment';
import {hinduEventsData} from '../calander/hinduEvents';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserData,
  selectIsLoadingGetUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

//for location
import Geocoder from 'react-native-geocoding';

export default function Header() {

  const [location, setLocation] = useState();
  
  const [event, setEvent] = useState(null);
  const todayDate = new Date();
  const eventDate = `${todayDate.getFullYear()}-${(
    '0' + todayDate.getDate()
  ).slice(-2)}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}`;

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isLoadingGetUserData = useSelector(selectIsLoadingGetUserData);

  const [currentTime, setCurrentTime] = useState({
    time: moment().format('LTS'),
  });

  useEffect(() => {
    const res = hinduEventsData.hasOwnProperty(eventDate);
    if (res) {
      setEvent(hinduEventsData[eventDate][0].name);
    } else {
      setEvent('No event');
    }
    dispatch(getUserData());
    {
      user
        ? Geocoder.from(
            user.location?.coordinates[1],
            user.location?.coordinates[0],
          )
            .then(json => {
              var addressComponent = json.results[0].address_components;
              //setReg({address: addressComponent});
              setLocation(addressComponent[1].long_name);
            })

            .catch(error => console.warn(error))
        : '';
    }

    const timerId = setInterval(() => {
      setCurrentTime({
        time: moment().format('LTS'),
      });
    }, 1000);
    // return clearInterval(timerId)
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer1}>
        <View style={styles.infoContainer}>
          <Image
            source={require('../../../../assets/images/islamic_date_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text numberOfLines={1} style={[styles.dateInfo, {fontSize: 18}]}>{event}</Text>
        </View>

        <View style={styles.infoContainer} mt={2}>
          <Image
            source={require('../../../../assets/images/date_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={styles.dateInfo}>
            {moment().format('MMMM Do, YYYY')}
          </Text>
        </View>
      </View>

      <View style={styles.subContainer2}>
        <View style={styles.infoContainer}>
          <Image
            source={require('../../../../assets/images/time_ic.png')}
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

        <View style={styles.infoContainer} mt={2}>
          <Image
            source={require('../../../../assets/images/location_ic.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          <Text style={styles.dateInfo}>
            {location ? location : 'No Location set'}
          </Text>
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
    paddingTop: 30,
    paddingLeft: 20,
  },
  subContainer2: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 20,
    marginLeft: "5%"
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
