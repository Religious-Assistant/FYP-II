/**
 * @author Nadir Hussain
 * @version 1.0
 */

import {View, Text, Center, Image, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  RECITE_QURAN,
  FIND_MOSQUE,
  VIEW_CALANDER,
  LEARN_NAMAZ,
  ACCOUNTABILITY,
  MUSLIM_ANNOUNCEMENTS,
  ADD_MOSQUE,
  TASBIH_COUNTER,
  QIBLA_DIRECTION,
  RAKAH_INFO,
  MUSLIM_DUAS,
  ALLAH_99_NAME,
  SET_PRAYER_TIMES,
  UPDATE_NAMAZ_TIMES_IN_MOSQUE,
  RECOMPENSE_GUIDELINES,
} from '../../../navigation/constants';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserData,
  selectIsLoadingGetUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FeatureContainer() {
  const navigator = useNavigation();
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  const isLoadingUserData = useSelector(selectIsLoadingGetUserData);

  const [featureArray1, setFeatureArray1] = useState([]);
  const [featureArray2, setFeatureArray2] = useState([]);
  const [featureArray3, setFeatureArray3] = useState([]);

  useEffect(() => {
    dispatch(getUserData());

    const getData = async () => {
      const data = await AsyncStorage.getItem('user');
      return await JSON.parse(data);
    };

    getData()
      .then(data => {
        setFeatureArray1([
          {
            title: 'Recite Quran',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663408573/religious-assistant/static_assets/quran1_ic_u53pnq.png',
            },
            screen: RECITE_QURAN,
            key: 1,
            disabled: user ? false : true,
          },
          {
            title: 'Closest Mosque',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409336/religious-assistant/static_assets/mosque1_ic_ay2vha.png',
            },
            screen: FIND_MOSQUE,
            key: 2,
            disabled: user ? false : true,
          },
          {
            title: 'Qibla Rukh',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409466/religious-assistant/static_assets/qibla_direction_ic_yprdoq.png',
            },
            screen: QIBLA_DIRECTION,
            key: 3,
            disabled: false,
          },
        ]);
        setFeatureArray2([
          {
            title: 'Learn Namaz',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409329/religious-assistant/static_assets/learn_namaz1_ic_ij8v9k.png',
            },
            screen: LEARN_NAMAZ,
            key: 4,
            disabled: user ? false : true,
          },
          {
            title: 'Accountability',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409334/religious-assistant/static_assets/accountability_ic_szkiz1.png',
            },
            screen: ACCOUNTABILITY,
            key: 5,
            disabled: user ? false : true,
          },
          {
            title: 'Announcements',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409328/religious-assistant/static_assets/announcement1_ic_diuelp.png',
            },
            screen: MUSLIM_ANNOUNCEMENTS,
            key: 6,
            disabled: user ? false : true,
          },
        ]);

        setFeatureArray3([
          {
            disabled: false,
            title: 'Add Mosque',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409335/religious-assistant/static_assets/add_ic_hh9ss7.png',
            },
            screen: ADD_MOSQUE,
            key: 7,
            disabled: user ? false : true,
          },
          {
            title: 'Namaz Alarms',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409334/religious-assistant/static_assets/namazTimes_ic_ouknl8.png',
            },
            screen: SET_PRAYER_TIMES,
            key: 7,
            disabled: user ? false : true,
          },
          {
            disabled: false,
            title: 'Update Times',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409336/religious-assistant/static_assets/update_time_ic_gkjad3.png',
            },
            screen: UPDATE_NAMAZ_TIMES_IN_MOSQUE,
            key: 13,
            disabled: user && data?.isImam ? false : true,
          },
          {
            title: 'Tasbih Counter',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409333/religious-assistant/static_assets/tasbih1_ic_mrqgfv.png',
            },
            screen: TASBIH_COUNTER,
            key: 9,
            disabled: user && data?.isImam ? false : true,
          },
          {
            title: 'View Calander',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409333/religious-assistant/static_assets/islamic_calendar1_ic_xwqmpa.png',
            },
            screen: VIEW_CALANDER,
            key: 8,
            disabled: false,
          },
          {
            title: 'Rakah Info',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409335/religious-assistant/static_assets/rakat_ic_vvrmzh.png',
            },
            screen: RAKAH_INFO,
            key: 10,
            disabled: false,
          },

          {
            title: '99 names',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409330/religious-assistant/static_assets/names_ic_jb1hj6.png',
            },
            screen: ALLAH_99_NAME,
            key: 11,
            disabled: false,
          },
          {
            title: 'Duas',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663409330/religious-assistant/static_assets/duas_ic_cy2t5k.png',
            },
            screen: MUSLIM_DUAS,
            key: 12,
            disabled: false,
          },
          {
            title: 'Guidelines',
            image: {
              uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663410137/religious-assistant/static_assets/guidelines_ic_vjzdvk.png',
            },
            screen: RECOMPENSE_GUIDELINES,
            key: 13,
            disabled: false,
          },
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
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
              <>
                {item ? (
                  <TouchableOpacity
                    key={item.key + Math.random()}
                    onPress={() => {
                      if (!item?.disabled) {
                        navigator.navigate(item.screen);
                      } else {
                        alert(`Create account to access the feature`);
                      }
                    }}>
                    <FeatureCard>
                      <Image
                        source={
                          item?.disabled
                            ? {
                                uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png',
                              }
                            : item.image
                        }
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        alt="Icon..."
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </FeatureCard>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </>
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
              <>
                {item ? (
                  <TouchableOpacity
                    key={item.key + Math.random()}
                    onPress={() => {
                      if (!item?.disabled) {
                        navigator.navigate(item.screen);
                      } else {
                        alert(`Create account to access the feature`);
                      }
                    }}>
                    <FeatureCard disabled={item.disabled}>
                      <Image
                        source={
                          item?.disabled
                            ? {
                                uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png',
                              }
                            : item.image
                        }
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        alt="Icon..."
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </FeatureCard>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </View>
      </View>
      <View style={{backgroundColor: colors.cover, flex: 0.3}} mb={5}>
        <Text style={styles.moreText} p={2}>
          More Features
        </Text>
        <ScrollView showsHorizontalScrollIndicator horizontal mt={1}>
          {featureArray3.map((item, index) => {
            return (
              <>
                {item ? (
                  <TouchableOpacity
                    key={item.key + Math.random()}
                    onPress={() => {
                      if (!item?.disabled) {
                        navigator.navigate(item.screen);
                      } else if (item?.title == 'Update Times') {
                        alert(`Accessible to IMAM only`);
                      } else {
                        alert(`Create account to access the feature`);
                      }
                    }}>
                    <MoreFeaturesCard key={item.key} disabled={item.disabled}>
                      <Image
                        source={
                          item?.disabled
                            ? {
                                uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663578167/religious-assistant/static_assets/lock_ic_rxfgxj.png',
                              }
                            : item.image
                        }
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        alt="Icon.."
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </MoreFeaturesCard>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

function FeatureCard(props) {
  return (
    <>
      {props.disabled ? (
        <Center
          key={props.key}
          style={[styles.card, {borderColor: colors.error, borderWidth: 2}]}>
          {props.children}
        </Center>
      ) : (
        <Center key={props.key} style={styles.card}>
          {props.children}
        </Center>
      )}
    </>
  );
}

function MoreFeaturesCard(props) {
  return (
    <>
      <Center key={props.key} style={styles.moreFeaturesCard}>
        {props.children}
      </Center>
    </>
  );
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
    // elevation:10,
    shadowOffset: {height: 1, width: 1},
    backgroundColor: colors.cover,
  },
  moreFeaturesCard: {
    width: 100,
    height: 90,
    borderRadius: 10,
    // elevation:10,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.white,
  },
  cardTitle: {
    fontFamily: fonts.Signika.medium,
    fontSize: 14,
  },
  moreText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 16,
    color: colors.secondary,
  },
});
