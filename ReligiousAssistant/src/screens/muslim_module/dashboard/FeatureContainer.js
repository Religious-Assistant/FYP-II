/**
 * @author Nadir
 * @version 1.0
 */

import {View, Text, Center, Image, ScrollView} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
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
} from '../../../navigation/constants';

//Redux
import {useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';

export default function FeatureContainer() {
  const navigator = useNavigation();
  const user = useSelector(selectUserData);

  const featureArray1 = [
    {
      title: 'Recite Quran',
      image: require('../../../../assets/images/quran1_ic.png'),
      screen: RECITE_QURAN,
      key: 1,
    },
    {
      title: 'Closest Mosque',
      image: require('../../../../assets/images/mosque1_ic.png'),
      screen: FIND_MOSQUE,
      key: 2,
    },
    {
      title: 'Qibla Rukh',
      image: require('../../../../assets/images/qibla_direction_ic.png'),
      screen: QIBLA_DIRECTION,
      key: 3,
    },
  ];

  const featureArray2 = [
    user
      ? {
          disabled: false,
          title: 'Learn Namaz',
          image: require('../../../../assets/images/learn_namaz1_ic.png'),
          screen: LEARN_NAMAZ,
          key: 4,
        }
      : {
          disabled: true,
          title: 'Learn Namaz',
          image: require('../../../../assets/images/learn_namaz1_ic.png'),
          screen: LEARN_NAMAZ,
          key: 4,
        },
    user
      ? {
          disabled: false,
          title: 'Accountability',
          image: require('../../../../assets/images/accountability_ic.png'),
          screen: ACCOUNTABILITY,
          key: 5,
        }
      : {
          disabled: true,
          title: 'Accountability',
          image: require('../../../../assets/images/accountability_ic.png'),
          screen: ACCOUNTABILITY,
          key: 5,
        },
    user
      ? {
          disabled: false,
          title: 'Announcements',
          image: require('../../../../assets/images/announcement1_ic.png'),
          screen: MUSLIM_ANNOUNCEMENTS,
          key: 6,
        }
      : {
          disabled: true,
          title: 'Announcements',
          image: require('../../../../assets/images/announcement1_ic.png'),
          screen: MUSLIM_ANNOUNCEMENTS,
          key: 6,
        },
  ];

  const featureArray3 = [
    user
      ? {
          disabled: false,
          title: 'Add Mosque',
          image: require('../../../../assets/images/add_ic.png'),
          screen: ADD_MOSQUE,
          key: 7,
        }
      : {
          disabled: true,
          title: 'Add Mosque',
          image: require('../../../../assets/images/add_ic.png'),
          screen: ADD_MOSQUE,
          key: 7,
        },
    user
      ? {
          disabled: false,
          title: 'Namaz Alarms',
          image: require('../../../../assets/images/namazTimes_ic.png'),
          screen: SET_PRAYER_TIMES,
          key: 7,
        }
      : {
          disabled: true,
          title: 'Namaz Alarms',
          image: require('../../../../assets/images/namazTimes_ic.png'),
          screen: SET_PRAYER_TIMES,
          key: 13,
        },
        user?.isImam
      ? {
          disabled: false,
          title: 'Update Times',
          image: require('../../../../assets/images/update_time_ic.png'),
          screen: UPDATE_NAMAZ_TIMES_IN_MOSQUE,
          key: 13,
        }
      : {
          disabled: true,
          title: 'Update Times',
          image: require('../../../../assets/images/update_time_ic.png'),
          screen: UPDATE_NAMAZ_TIMES_IN_MOSQUE,
          key: 7,
        },
        {
          disabled: false,
          title: 'Tasbih Counter',
          image: require('../../../../assets/images/tasbih1_ic.png'),
          screen: TASBIH_COUNTER,
          key: 9,
        },
    {
      disabled: false,
      title: 'View Calander',
      image: require('../../../../assets/images/islamic_calendar1_ic.png'),
      screen: VIEW_CALANDER,
      key: 8,
    },
    {
      disabled: false,
      title: 'Rakah Info',
      image: require('../../../../assets/images/rakat_ic.png'),
      screen: RAKAH_INFO,
      key: 10,
    },

    {
      disabled: false,
      title: '99 names',
      image: require('../../../../assets/images/names_ic.png'),
      screen: ALLAH_99_NAME,
      key: 11,
    },
    {
      disabled: false,
      title: 'Duas',
      image: require('../../../../assets/images/duas_ic.png'),
      screen: MUSLIM_DUAS,
      key: 12,
    },
  ];

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
                      navigator.navigate(item.screen);
                    }}>
                    <FeatureCard key={item.key}>
                      <Image
                        source={item.image}
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
                      navigator.navigate(item.screen);
                    }}
                    disabled={item.disabled}>
                    <FeatureCard key={item.key} disabled={item.disabled}>
                      <Image
                        source={item.image}
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
                      navigator.navigate(item.screen);
                    }}
                    disabled={item.disabled}>
                    <MoreFeaturesCard key={item.key} disabled={item.disabled}>
                      <Image
                        source={item.image}
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
      {
        props.disabled?
        <Center key={props.key} style={[styles.card,{borderColor:colors.error, borderWidth:2}]}>
        {props.children}
      </Center>
        :
        <Center key={props.key} style={styles.card}>
        {props.children}
      </Center>
      }
    </>

  );
}

function MoreFeaturesCard(props) {
  return (
      <>
        {
          props.disabled?
          <Center key={props.key} style={[styles.moreFeaturesCard,{borderColor:colors.error, borderWidth:2}]}>
          {props.children}
        </Center>
          :
          <Center key={props.key} style={styles.moreFeaturesCard}>
          {props.children}
        </Center>
        }
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
