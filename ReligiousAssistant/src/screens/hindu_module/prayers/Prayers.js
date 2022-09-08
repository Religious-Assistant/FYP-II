/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Heading,
  Text,
  Image,
  Center,
  Card,
  VStack,
  ScrollView,
} from 'native-base';

//images
import prayerIcon from '../../../../assets/images/prayer.png';

//Redux
import {useDispatch} from 'react-redux';
import {setTab} from '../../../redux/slices/hindu_module_slices/bottomNavSlice';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  HINDU_PRAYERS,
  DAILY_PRAYER_INFO,
  PRAYER_ITEMS_LIST,
  PRAYER_NOT_TODO,
  HINDU_MORNING_PRAYER,
  HINDU_EVENING_PRAYER,
} from '../../../navigation/constants';

const Prayers = ({navigation}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  //when tab is focused in MuslimBottomTab.js, this will be called
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab(HINDU_PRAYERS));
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  const prayerData = [
    {
      key: 1,
      prayer: 'How to Perform Daily Pooja?',
      onclick: () => {
        navigator.navigate(DAILY_PRAYER_INFO);
      },
    },
    {
      key: 2,
      prayer: 'Pooja Samagri List',
      onclick: () => {
        navigator.navigate(PRAYER_ITEMS_LIST);
      },
    },
    {
      key: 3,
      prayer: 'What not to do during performing pooja?',
      onclick: () => {
        navigator.navigate(PRAYER_NOT_TODO);
      },
    },
    {
      key: 4,
      prayer: 'Karagre vasate (Morning Prayer)',
      onclick: () => {
        navigator.navigate(HINDU_MORNING_PRAYER);
      },
    },
    {
      key: 5,
      prayer: 'Aarti (Evening Prayer)',
      onclick: () => {
        navigator.navigate(HINDU_EVENING_PRAYER);
      },
    },
  ];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      flex={1}
      backgroundColor={colors.white}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        {/* Header */}
        <View
          style={{
            flex: 0.17,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading
              color={colors.secondary}
              marginLeft="40%"
              marginTop={'20%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Daily </Text>
              <Heading color={colors.white}>
                <Text style={{fontFamily: fonts.Signika.bold}}>Pooja</Text>
              </Heading>
            </Heading>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Image
              source={prayerIcon}
              style={{
                marginTop: '12%',
                marginRight: '45%',
                height: 100,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
        </View>
        <View style={{flex: 0.83}} width="95%">
          <Center
            width="95%"
            space={2}
            maxW="95%"
            marginLeft={'5%'}
            marginBottom={'5%'}>
            <VStack space={3} w="100%" marginTop={'10%'}>
              <Text style={styles.boldHeading}>
                Click to view prayer information
              </Text>
              {prayerData.map(itm => {
                return (
                  <TouchableOpacity key={itm.key} onPress={itm.onclick}>
                    <Card
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '3%',
                        backgroundColor: colors.cover,
                        elevation: 0.0,
                      }}>
                      <Text style={styles.label}>{itm.prayer}</Text>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          </Center>
        </View>
      </View>
    </ScrollView>
  );
};

export default Prayers;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    marginTop: '2%',
    padding: 5,
    color: colors.primary,
  },
  boldHeading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 18,
    padding: 5,
    color: colors.primary,
    alignSelf: 'center',
  },
  secondHeading: {
    fontFamily: fonts.Signika.regular,
    fontSize: 19,
    padding: 5,
    color: colors.info,
    alignSelf: 'center',
  },
});
