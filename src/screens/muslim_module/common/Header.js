/**
 * @author Nadir Hussain
 * @version 1.0
 */

import {View, Text, Image} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//moment
import moment from 'moment';
import moment_hijri from 'moment-hijri';

//for map
import Geocoder from 'react-native-geocoding';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserData,
  selectIsLoadingGetUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

//helper function
import {writeIslamicFullDate} from '../../../utils/helpers';

//constants
import {GOOGLE_MAPS_APIKEY} from '../../../components/componentsConstants';

Geocoder.init(GOOGLE_MAPS_APIKEY);
// https://ej2.syncfusion.com/documentation/calendar/islamic-calendar/

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);
  const isLoadingGetUserData = useSelector(selectIsLoadingGetUserData);

  const [islamicDate, setIslamicDate] = useState('');
  let m = moment_hijri('1443/11/20', 'iYYYY/iMM/iD'); // Parse a Hijri date.
  const [reg, setReg] = useState();
  const [location, setLocation] = useState(null);

  const [currentTime, setCurrentTime] = useState({
    time: moment().format('LTS'),
    islamicDatem: m.format('iYYYY/iM/iD'),
    engDate: moment().format('D MMM, y'),
  });

  useEffect(() => {
    dispatch(getUserData());
    setIslamicDate(writeIslamicFullDate(new Date(), -2));

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

    const timerId = setInterval(() => {
      setCurrentTime({
        time: moment().format('LTS'),
        islamicDate: m.format('iYYYY/iM/iD'),
        engDate: moment().format('D MMM, y'),
      });
    }, 1000);
    // return clearInterval(timerId)
  }, [dispatch]);
  //console.log(location)
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer1, {flex: user ? 0.4 : 0.6}]}>
        <View style={styles.infoContainer}>
          <Image
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663572763/religious-assistant/static_assets/time_ic_squ7w4.png'}}
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

        {user ? (
          <View style={styles.infoContainer} mt={2}>
            <Image
              source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663572808/religious-assistant/static_assets/location_ic_w7n2ng.png'}}
              style={{
                width: 25,
                height: 25,
                tintColor: 'white',
              }}
              alt="Icon"></Image>
            <Text style={styles.locationInfo} numberOfLines={2}>
              {location ? location : 'No location set'}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.subContainer2}>
        <View style={styles.infoContainer}>
          <Image
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663572853/religious-assistant/static_assets/islamic_date_ic_kllvuk.png'}}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
            alt="Icon"></Image>
          {/* 19 Ramdan, 1443 */}
          <Text style={styles.dateInfo}>{islamicDate}</Text>
        </View>

        <View style={styles.infoContainer} mt={2}>
          <Image
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663572899/religious-assistant/static_assets/date_ic_g1vgty.png'}}
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
    paddingTop: 40,
    paddingLeft: 20,
  },
  subContainer2: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingTop: 35,
    paddingLeft: 40,
  },
  namazInfoText: {
    fontFamily: fonts.Signika.medium,
    color: colors.success.light,
    fontSize: 16,
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

  locationInfo:{
    fontFamily: fonts.Signika.medium,
    color: colors.success.light,
    fontSize: 12,
    marginLeft: 3,
    marginTop: 3,
  }
});
