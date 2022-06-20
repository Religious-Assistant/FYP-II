/**
 * @author Nadir
 * @version 1.0
 */

import {View, Text, Center, Image, ScrollView} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

import {
  RECITE_QURAN,
  FIND_MOSQUE,
  VIEW_CALANDER,
  LEARN_NAMAZ,
  ACCOUNTABILITY,
  ANNOUNCEMENTS,
  ADD_MOSQUE,
  TASBIH_COUNTER,
  QIBLA_DIRECTION,
  RAKAH_INFO,
} from '../../navigation/constants';

//Redux
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/slices/auth_slices/authSlice';

export default function FeatureContainer() {

  const navigator = useNavigation();
  const token=useSelector(selectToken)

  const featureArray1 = [
    {
      title: 'Recite Quran',
      image: require('../../../assets/images/quran_ic.png'),
      screen: RECITE_QURAN,
    },
    {
      title: 'Closest Mosque',
      image: require('../../../assets/images/mosque_ic.png'),
      screen: FIND_MOSQUE,
    },
    {
      title: 'Qibla Rukh',
      image: require('../../../assets/images/qibla_direction_ic.png'),
      screen: QIBLA_DIRECTION,
    },
  ];

  const featureArray2 = [
    {
      title: 'Learn Namaz',
      image: require('../../../assets/images/learn_namaz_ic.png'),
      screen: LEARN_NAMAZ,
    },
    token?
    {
      title: 'Accountability',
      image: require('../../../assets/images/accountability_ic.png'),
      screen: ACCOUNTABILITY,
    }:
    {
      title: 'Announcements',
      image: require('../../../assets/images/announcement_ic.png'),
      screen: ANNOUNCEMENTS,
    }
    ,
    token?{
      title: 'Announcements',
      image: require('../../../assets/images/announcement_ic.png'),
      screen: ANNOUNCEMENTS,
    }:{
      title: 'Rakah Info',
      image: require('../../../assets/images/info_ic.png'),
      screen: RAKAH_INFO,
    },
  ];

  const featureArray3 = [
    token?
    {
      title: 'Add Mosque',
      image: require('../../../assets/images/add_ic.png'),
      screen: ADD_MOSQUE,
    }:undefined,
    {
      title: 'View Calander',
      image: require('../../../assets/images/islamic_calander_ic.png'),
      screen: VIEW_CALANDER,
    },
    {
      title: 'Tasbih Counter',
      image: require('../../../assets/images/tasbih_ic.png'),
      screen: TASBIH_COUNTER,
    },
    token?{
      title: 'Rakah Info',
      image: require('../../../assets/images/info_ic.png'),
      screen: RAKAH_INFO,
    }:undefined,
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
            return (<>
              {
                item?            
              <TouchableOpacity
                key={item.title}
                onPress={() => {
                  navigator.navigate(item.screen);
                }}>
                <FeatureCard>
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
              </TouchableOpacity>:<></>
          }</>
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
            return (<>
              {
                item?
                <TouchableOpacity
                key={item.title}
                onPress={() => {
                  navigator.navigate(item.screen);
                }}>
                <FeatureCard>
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
                :<></>
              }
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
              {item?<TouchableOpacity
                key={item.title}
                onPress={() => {
                  navigator.navigate(item.screen);
                }}>
                <MoreFeaturesCard key={index}>
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
                :<></>}
                </>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

function FeatureCard(props) {
  return <Center style={styles.card}>{props.children}</Center>;
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
