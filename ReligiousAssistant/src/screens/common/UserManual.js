/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';

import mosqueIcon from '../../../assets/images/Logo-combined.png';
import CustomButton from '../../components/CustomButton';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import registerScreenImg from '../../../assets/images/registerScreen.png';
export default function UserManual() {
  const mosqueInfo = [
    {
      key: 1,
      label: 'Mosque Name',
      info: 'Sukkur Iba',
    },
    {
      key: 2,
      label: 'Location',
      info: 'Sukkur IBA Uni',
    },
    {
      key: 3,
      label: 'Added By',
      info: 'Nadir Hussain',
    },
    {
      key: 4,
      label: 'Distance from you',
      info: '3km',
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              position: 'absolute',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <Image
                source={mosqueIcon}
                style={{
                  marginTop: '10%',
                  marginRight: '5%',
                  marginBottom: '5%',
                  height: 80,
                  width: 80,
                }}
                alt="icon .."
              />
            </View>
            <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
              <Heading
                color={colors.secondary}
                marginLeft="10%"
                marginTop={'5%'}>
                <Text style={{fontFamily: fonts.Signika.bold}}>User </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    {'\n'}Manual
                  </Text>
                </Heading>
              </Heading>
            </View>
          </View>
          <View style={{flex: 0.83}} width="95%" alignItems="center">
            <Center
              width="95%"
              space={2}
              maxW="95%"
              marginTop={'33%'}
              marginLeft={'5%'}
              marginBottom={'5%'}>
              <VStack space={3} w="100%" marginTop={'10%'}>
                <Text style={styles.boldHeading}>1. INTRODUCTION</Text>
                <Text style={styles.secondHeading}>
                  1.1 What is Religious Assistant?
                </Text>

                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Religious Assistant
                  </Text>{' '}
                  is developed to provide ease to both Hindu and Muslim
                  communities in performing.
                </Text>
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Which devices does the mobile app support?
                  </Text>
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}You can install{' '}
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Religious Assistant
                  </Text>{' '}
                  on any mobile devices that have Android (mobile phones and
                  tablets) operating systems.
                </Text>
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    How it Works?
                  </Text>
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}For using{' '}
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Religious Assistant{' '}
                  </Text>
                  you must be connected to the internet and allow app to access
                  location and media to use the features of app.
                </Text>
                <Text style={styles.info}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Religious Assistant{' '}
                  </Text>{' '}
                  app allows you to:
                </Text>
                <Text style={styles.bullets}>
                  {'\u2022'}
                  Locate closest local mosques and temples
                  {'\n'}
                  {'\u2022'} Get Notifified about the exact Namaz timings
                  {'\n'}
                  {'\u2022'} Use Silent mode during Namaz time or in temple
                  {'\n'}
                  {'\u2022'} Children to Play Game to learn Namaz
                  {'\n'}
                  {'\u2022'} Help hindus to remember veg and non-veg days
                  {'\n'}
                  {'\u2022'} Make announcements
                  {'\n'}
                  {'\u2022'} Recite Holy books
                  {'\n'}
                  {'\u2022'} View Calendars for both Muslims and Hindus
                  {'\n'}
                  {'\u2022'} Find Qibla direction, use Tasbih counter
                  {'\n'}
                  {'\u2022'} and more
                </Text>
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    How much the mobile app costs?
                  </Text>
                </Text>
                <Text style={styles.info}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    {'\t\t\t'}Religious Assistant{' '}
                  </Text>
                  for mobile devices is available for free.
                </Text>
                <Text style={styles.secondHeading}>
                  1.2 How to install Religious Assistant?
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}Go to the Google Play Store and search for Religious
                  Assistant app.To find and install Religious Assistant app for
                  Android:
                </Text>
                <Text style={styles.bullets}>
                  1. On your Android phone, open Google Play Store. {'\n'}
                  2. Tap the Search icon. {'\n'}
                  3. Enter Religious Assistant in the search field. {'\n'}
                  4. Select Religious Assistant in the search results to go to
                  the app page. {'\n'}
                  5. Follow the standard installation procedure.
                </Text>

                <Text style={styles.secondHeading}>
                  1.3 Will your data be secured?
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}You may want to be sure that your personal files
                  won't get into the wrong hands. You may be especially
                  concerned about your mobile device, because your data is used
                  by the application. {'\n'}
                  {'\t\t\t\t'}Let us assure you that your data will be safe. And
                  the data won't get into the wrong hands
                </Text>
                <Text style={styles.boldHeading}>2. APP OVERVIEW</Text>
                <Text style={styles.secondHeading}>2.1 Registration</Text>
                <Text style={styles.info}>
                  {'\t\t\t'}To use the app you have either login or connect as
                  guest. If you don't have an account click on the sign up
                  button and register.
                </Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />
                <Text style={styles.info}>
                  For registration you have to enter your username, password,
                  phone number for further verification and select your
                  religion.{'\n'}
                  {'\t\t\t'} If you do registeration you will be able to use
                  multiple features that a guest user can not access
                </Text>
                <Text style={styles.secondHeading}>2.2 Dashboards</Text>
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Muslims Dashboard
                  </Text>
                </Text>
                <Text style={styles.info}>
                  Muslims can use multiple features that provide ease to perform
                  religious activities. They can locate the closest local
                  mosques, keep track of their religious activities, recite
                  Quran, get Rakats information, Learn Namaz and more.{'\n'}
                  {'\t\t\t'} You have to allow the location and media access to
                  the app so that you can find Qibla Direction and manage your
                  profile.
                </Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />
                <Text style={styles.info}>
                  {' '}
                  The figure shows the registered Muslim users' dashboard and
                  the Muslim guests can access some of the features. Also a
                  Muslim registered user can apply as Imaam and help Muslims to
                  update Namaz timings so they can get timely notifications
                </Text>
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Hindus Dashboard
                  </Text>
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}Hindus also have a variety of features such as veg
                  non-veg notifications, finding closest local temples, adding
                  temples and making announcements. The figure shows the
                  dashboard of registered Hindu users
                </Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />
                <Text style={styles.secondHeading}>2.3 Settings</Text>
                <Text style={styles.info}>
                  {'\t\t\t'}The Settings section includes updating profile, and
                  allowing app to send notifications to you such as Namaz
                  notifications. You can also enable or disable the auto silent
                  mode. You can also select or update a primary mosque to get
                  Namaz notifications
                </Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />

                <Text style={styles.secondHeading}>
                  2.4 How to find the closest Mosques or Temples?
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}First You hvae to Click on the Closest Mosque or
                  Closest Temple option from the Dashboard. Then you will see
                  the three closest Mosques or Temples according to your
                  location.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={registerScreenImg}
                    style={{
                      marginTop: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      height: 380,
                      width: 182,
                      marginLeft: '-2%',
                    }}
                    alt="icon .."
                  />
                  <Image
                    source={registerScreenImg}
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      marginLeft: '-4%',
                      height: 380,
                      width: 182,
                    }}
                    alt="icon .."
                  />
                </View>
                <Text>
                  {'\t\t\t'}When you click on the arrow you will be able to see
                  the directions in the map that will help you to fild the
                  Mosque or Temple easily.
                </Text>
                <Text style={styles.secondHeading}>
                  2.5 How to Add a new Mosque or Temple?
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}You might think, what to do if the Mosque or Temple
                  is not available? The answer is, you can add a new Mosque or
                  Temple by providing the information. If the provided
                  information is correct the Mosque or Temple will be added.
                </Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />
                <Text style={styles.secondHeading}>
                  2.5 How to Keep track of Namaz and Fast?
                </Text>
                <Text style={styles.info}>
                  {'\t\t\t'}Select accountability feature from dashboard then
                  you have to select any date. You will be given two option,
                  Prayer and Fast. When you select Namaz you have to check the
                  boxes of Namaz that you have offered and then click on the
                  save button. {'\n'}When you select the fast option, it will ask you
                  if you have kept fast or not, choose your option and click
                  save button.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={registerScreenImg}
                    style={{
                      marginTop: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      height: 380,
                      width: 182,
                      marginLeft: '-2%',
                    }}
                    alt="icon .."
                  />
                  <Image
                    source={registerScreenImg}
                    style={{
                      alignSelf: 'center',
                      marginTop: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      marginLeft: '-4%',
                      height: 380,
                      width: 182,
                    }}
                    alt="icon .."
                  />
                </View>
                <Text style={styles.boldHeading}>3. NOTIFICATIONS</Text>
                <Text style={styles.info}>{'\t\t\t'}You can enable or disable the notifications from settings. 
                You can check the notifications from Alerts option in the Dashboard.{'\n'}You will also get some consensus notifications to which you have to give correct response.</Text>
                <Image
                  source={registerScreenImg}
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                    height: 400,
                    width: 200,
                  }}
                  alt="icon .."
                />
                <Text style={styles.label}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    What is consensus?
                  </Text>
                </Text>
                <Text style={styles.info}>{'\t\t\t'} When a user add a Mosque or Apply as Imam, other users 
                will get notification to ensure that the provided information about the Mosque or Imam is correct.{'\n'}
                We would appreciate your participation in the consensus mechanism and we hope you won't ignore such notifications.
                </Text>
                <Text style={styles.theEnd}>THE END</Text>
                
              </VStack>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 17,
    padding: 5,
    color: colors.primary,
  },
  boldHeading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 19,
    padding: 5,
    color: colors.info,
  },
  secondHeading: {
    fontFamily: fonts.Signika.regular,
    fontSize: 19,
    padding: 5,
    color: colors.info,
  },
  theEnd: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    padding: 5,
    color: colors.secondary,
    alignSelf:"center",
    marginTop:"5%"
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 15,
    padding: 5,
    marginTop: '-4%',
    color: colors.tertiary,
  },
  bullets: {
    fontFamily: fonts.Signika.regular,
    fontSize: 15,
    padding: 5,
    marginTop: '-4%',
    marginLeft: '5%',
    color: colors.tertiary,
  },
});
