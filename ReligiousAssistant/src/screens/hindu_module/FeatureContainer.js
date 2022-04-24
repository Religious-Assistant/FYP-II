import {View, Text, Center, Image, ScrollView} from 'native-base';

import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

import {
  RECITE_GITA,
  FIND_TEMPLE,
  VEG_DAYS,
  VIEW_HINDU_CALANDER,
  HINDU_ANNOUNCEMENTS,
  HINDU_AUTO_SILENT,
  ADD_TEMPLE,
} from '../../navigation/constants';

export default function FeatureContainer() {
  const navigator = useNavigation();

  const featureArray1 = [
    {
      title: 'Recite Gita',
      image: require('../../../assets/images/gita_ic.png'),
      screen: RECITE_GITA,
    },
    {
      title: 'Closest Temple',
      image: require('../../../assets/images/temple_ic.png'),
      screen: FIND_TEMPLE,
    },
    {
      title: 'Veg Days',
      image: require('../../../assets/images/veg_ic.png'),
      screen: VEG_DAYS,
    },
  ];

  const featureArray2 = [
    {
      title: 'View Calander',
      image: require('../../../assets/images/islamic_calander_ic.png'),
      screen: VIEW_HINDU_CALANDER,
    },
    {
      title: 'Announcements',
      image: require('../../../assets/images/announcement_ic.png'),
      screen: HINDU_ANNOUNCEMENTS,
    },
    {
      title: 'Auto Silent',
      image: require('../../../assets/images/auto_silent_ic.png'),
      screen: HINDU_AUTO_SILENT,
    }
  ];

  const featureArray3 = [
    {
      title: 'Add Temple',
      image: require('../../../assets/images/add_ic.png'),
      screen: ADD_TEMPLE,
    },
    // {
    //   title: 'Tasbih Counter',
    //   image: require('../../../assets/images/tasbih_ic.png'),
    //   screen: TASBIH_COUNTER,
    // },
    // {
    //   title: 'Rakah Info',
    //   image: require('../../../assets/images/info_ic.png'),
    //   screen: RAKAH_INFO,
    // },
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
                    alt='Icon...'
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
                  navigator.navigate(item.screen);
                }}>
                <FeatureCard>
                  <Image
                    source={item.image}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    alt='Icon...'
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
                  navigator.navigate(item.screen);
                }}>
                <FeatureCard>
                  <Image
                    source={item.image}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    alt='Icon...'
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </FeatureCard>
              </TouchableOpacity>
            );
          })}
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
