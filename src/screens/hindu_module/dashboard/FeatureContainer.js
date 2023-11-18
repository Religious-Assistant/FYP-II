/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {View, Text, Center, Image} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  RECITE_GITA,
  FIND_TEMPLE,
  VEG_DAYS,
  VIEW_HINDU_CALANDER,
  HINDU_ANNOUNCEMENTS,
  HINDU_AUTO_SILENT,
  ADD_TEMPLE,
} from '../../../navigation/constants';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserData,
  selectIsLoadingGetUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

import Loader from '../../common/Loader';

export default function FeatureContainer() {
  const navigator = useNavigation();

  const user = useSelector(selectUserData);
  const isLoadingUserData = useSelector(selectIsLoadingGetUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const featureArray1 = [
    {
      title: 'Recite Gita',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582828/religious-assistant/static_assets/gita2_ic_gaiiac.png'},
      screen: RECITE_GITA,
      disabled: user ? false : true,
    },
    {
      title: 'Closest Temple',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582845/religious-assistant/static_assets/temple3_ic_ofzxs1.png'},
      screen: FIND_TEMPLE,
      disabled: false,
    },
    {
      title: 'Veg Days',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582850/religious-assistant/static_assets/veg2_ic_l0risz.png'},
      screen: VEG_DAYS,
      disabled: user ? false : true,
    },
  ];

  const featureArray2 = [
    {
      title: 'Add Temple',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582872/religious-assistant/static_assets/add2_ic_jmq5xg.png'},
      screen: ADD_TEMPLE,
      disabled: user ? false : true,
    },
    {
      title: 'View Calander',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582876/religious-assistant/static_assets/calendar_ic_k7xz4s.png'},
      screen: VIEW_HINDU_CALANDER,
      disabled: false,
    },
    {
      title: 'Announcements',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663582880/religious-assistant/static_assets/announcement2_ic_xltjb7.png'},
      screen: HINDU_ANNOUNCEMENTS,
      disabled: user ? false : true,
    },
    // {
    //   title: 'Auto Silent',
    //   image: require('../../../../assets/images/auto_silent_ic.png'),
    //   screen: HINDU_AUTO_SILENT,
    //   disabled: user ? false : true,
    // },
  ];

  const featureArray3 = [
    // {
    //   title: 'Add Temple',
    //   image: require('../../../../assets/images/add2_ic.png'),
    //   screen: ADD_TEMPLE,
    //   disabled: user ? false : true,
    // },
  ];

  return (
    <View style={styles.container}>
      {isLoadingUserData ? (
        <Loader msg="Loading Dashboard..." />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.white,
              flex: 0.5,
              borderTopLeftRadius: 25,
            }}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
              }}>
              {featureArray1.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.title}
                    onPress={() => {
                      if (!item?.disabled) {
                        navigator.navigate(item.screen);
                      } else {
                        alert(`Created account to access`);
                      }
                    }}>
                    <FeatureCard>
                      <Image
                        source={item?.disabled ? {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png'} : item.image}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        alt="Icon..."
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </FeatureCard>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: -20,
              }}>
              {featureArray2.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.title}
                    onPress={() => {
                      if (!item?.disabled) {
                        navigator.navigate(item.screen);
                      } else {
                        alert(`Created account to access`);
                      }
                    }}>
                    <FeatureCard>
                      <Image
                        source={item?.disabled ? {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png'} : item.image}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        alt="Icon..."
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </FeatureCard>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: -20,
            }}>
            {featureArray3.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    if (!item?.disabled) {
                      navigator.navigate(item.screen);
                    } else {
                      alert(`Created account to access`);
                    }
                  }}>
                  <FeatureCard>
                    <Image
                      source={item?.disabled ? {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png'} : item.image}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      alt="Icon..."
                    />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </FeatureCard>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

function FeatureCard(props) {
  return <Center style={[styles.card]}>{props.children}</Center>;
}

function MoreFeaturesCard(props) {
  return <Center style={styles.moreFeaturesCard}>{props.children}</Center>;
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowOffset: {height: 1, width: 1},
    backgroundColor: colors.cover,
  },
  moreFeaturesCard: {
    width: 100,
    height: 90,
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.white,
  },
  cardTitle: {
    fontFamily: fonts.Signika.medium,
    fontSize: 14,
  },
});
