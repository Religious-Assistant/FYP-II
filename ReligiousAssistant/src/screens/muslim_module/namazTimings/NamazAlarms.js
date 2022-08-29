/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  ScrollView,
  Card,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

//for notifications
import PushNotification from 'react-native-push-notification';

//images
import appIcon from '../../../../assets/images/Logo-muslim.png';
import clockIcon from '../../../../assets/images/clock_ic.png';

//custom components
import CustomButton from '../../../components/CustomButton';
import Loader from '../../common/Loader';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUpdatedUserData,
  getUserData,
  selectHasLoadedUpdatedData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {
  getNamazAlarmsForUser,
  selectIsLoadingNamazAlarmTimesForUser,
  selectIsLoadingUpdateNamazAlarmTimes,
  selectNamazAlarmTimesForUser,
  selectUpdatedNamazAlarmTimes,
  updateNamazAlarmTimes,
} from '../../../redux/slices/muslim_module_slices/namazAlarmsSlice';

//helper function
import {setHours} from '../../../utils/helpers';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NamazAlarms() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const alarmTimes = useSelector(selectNamazAlarmTimesForUser);

  const isLoadingAlarmTimes = useSelector(
    selectIsLoadingNamazAlarmTimesForUser,
  );

  const isLoadingUpdatedAlarmTimes = useSelector(
    selectIsLoadingUpdateNamazAlarmTimes,
  );

  const hasUpdatedAlarms = useSelector(selectUpdatedNamazAlarmTimes);

  const fajrTime = useInput(new Date());
  const duhrTime = useInput(new Date());
  const asrTime = useInput(new Date());
  const maghribTime = useInput(new Date());
  const ishaTime = useInput(new Date());

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }

    if (user) {
      dispatch(getNamazAlarmsForUser({username: user?.username}));
    }
  }, [dispatch]);

  function updateNamazAlarms() {
    if (user) {
      dispatch(
        updateNamazAlarmTimes({
          username: user?.username,
          fajr: fajrTime.text,
          zuhr: duhrTime.text,
          asr: asrTime.text,
          maghrib: maghribTime.text,
          isha: ishaTime.text,
        }),
      );
      dispatch(getUpdatedUserData({username: user?.username}));
    } else {
      alert(`Error occured. Get back Later`);
    }
  }

  const hasLoadedUpdatedData = useSelector(selectHasLoadedUpdatedData);

  const getAlarmTimes = async () => {
    try {
      let result = await AsyncStorage.getItem('user');
      result = result != null ? JSON.parse(result) : null;
      return result?.alarms;
    } catch (e) {
      console.log('ERROR while Retrieving user data from Async Storage', e);
    }
  };

  useEffect(() => {
    if (hasLoadedUpdatedData) {
      //#region  Configure Alarm
      PushNotification.channelExists('namaz_notification', exists => {
        // PushNotification.cancelAllLocalNotifications()

        if (!exists) {
          createChannel();
          console.log('Created channel');
        } else {
          if (user?.preferences?.namazNotifications) {
            getAlarmTimes()
              .then(alarms => {
                console.log(alarms);
                alarms?.fajr !== 'NONE' ? createNotification(alarms?.fajr) : '';
                alarms?.zuhr !== 'NONE' ? createNotification(alarms?.zuhr) : '';
                alarms?.asr !== 'NONE' ? createNotification(alarms?.asr) : '';
                alarms?.maghrib !== 'NONE'
                  ? createNotification(alarms?.maghrib)
                  : '';
                alarms?.isha !== 'NONE' ? createNotification(alarms?.isha) : '';

                // PushNotification.getScheduledLocalNotifications(scheduled => {
                //   console.log(scheduled.length);
                // });
              })
              .catch(error => console.log(error));
          }
        }
      });
      //#endregion
    }
  }, [dispatch, hasLoadedUpdatedData]);

  const createChannel = async () => {
    await PushNotification.createChannel(
      {
        channelId: 'namaz_notification',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'azan2.mp3',
        importance: 4,
        vibrate: true,
      },
      created => {
        console.log(`createChannel returned '${created}'`);
      },
    );
  };

  const createNotification = async time => {
    if (time.toUpperCase() == 'NONE') {
      return;
    }
    var alarm = new Date();
    //   setHours(alarm,`${user?.alarms.fajr}`) ////1:31:03 am   //imported from helpers.js

    await setHours(alarm, time);

    PushNotification.localNotificationSchedule({
      channelId: 'namaz_notification',
      title: '⏰Namaz Notification⏰',
      message: 'Salah Wipes Away Sins',
      bigText:
        'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah]: \nSurah Baqrah (2:45)',
      soundName: 'azan2.mp3',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: alarm,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  };

  function useInput() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');

    const onChange = (event, selectedDate) => {
      const currDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currDate);

      let tempDate = new Date(currDate);
      let fTime = tempDate.toLocaleTimeString();
      setText(fTime);
    };
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
    return {
      showMode,
      onChange,
      date,
      text,
      show,
      mode,
    };
  }

  const data = [
    {
      key: 1,
      label: 'Fajr',
      defaultTime: alarmTimes?.fajr,
      updatedTime: fajrTime.text,
      showMode: () => fajrTime.showMode('time'),
      show: fajrTime.show,
      mode: fajrTime.mode,
      onChange: fajrTime.onChange,
    },
    {
      key: 2,
      label: 'Duhr',
      defaultTime: alarmTimes?.zuhr,
      updatedTime: duhrTime.text,
      showMode: () => duhrTime.showMode('time'),
      show: duhrTime.show,
      mode: duhrTime.mode,
      onChange: duhrTime.onChange,
    },
    {
      key: 3,
      label: 'Asr',
      defaultTime: alarmTimes?.asr,
      updatedTime: asrTime.text,
      showMode: () => asrTime.showMode('time'),
      show: asrTime.show,
      mode: asrTime.mode,
      onChange: asrTime.onChange,
    },
    {
      key: 4,
      label: 'Maghrib',
      defaultTime: alarmTimes?.maghrib,
      updatedTime: maghribTime.text,
      showMode: () => maghribTime.showMode('time'),
      show: maghribTime.show,
      mode: maghribTime.mode,
      onChange: maghribTime.onChange,
    },
    {
      key: 5,
      label: 'Isha',
      defaultTime: alarmTimes?.isha,
      updatedTime: ishaTime.text,
      showMode: () => ishaTime.showMode('time'),
      show: ishaTime.show,
      mode: ishaTime.mode,
      onChange: ishaTime.onChange,
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isLoadingAlarmTimes || isLoadingUpdatedAlarmTimes ? (
        <Loader msg="Loading/Updating ..." />
      ) : (
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
                  source={clockIcon}
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
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Set Prayer{' '}
                  </Text>
                  <Heading color={colors.white}>
                    <Text style={{fontFamily: fonts.Signika.bold}}>
                      {'\n'}Times
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
                marginTop={'26%'}
                marginLeft={'5%'}
                marginBottom={'5%'}>
                <VStack space={3} w="100%" marginTop={'10%'}>
                  <Text style={styles.boldHeading}>
                    You can set Prayer Times to get Namaz Notifications
                  </Text>
                  {data ? (
                    data.map(itm => {
                      return (
                        <Card
                          key={itm.key}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '3%',
                            backgroundColor: colors.cover,
                            elevation: 0.0,
                          }}>
                          <Text style={styles.label}>{itm.label}</Text>
                          <Text style={styles.secondHeading}>
                            {itm.updatedTime
                              ? itm.updatedTime
                              : itm.defaultTime}
                          </Text>
                          <MaterialCommunityIcons
                            name="clock-edit"
                            size={36}
                            color={colors.primary}
                            onPress={itm.showMode}
                            style={{alignSelf: 'center'}}
                          />
                          {itm.show && (
                            <DateTimePicker
                              value={new Date()}
                              mode={itm.mode}
                              is24Hour={false}
                              display="default"
                              onChange={itm.onChange}
                            />
                          )}
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}

                  <CustomButton
                    title={'Update Namaz Times'}
                    mt="5%"
                    onPress={() => {
                      updateNamazAlarms();
                    }}
                  />
                </VStack>
              </Center>
            </View>
          </View>
        </ScrollView>
      )}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 22,
    marginTop: '2%',
    padding: 5,
    color: colors.tertiary,
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
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 13,
    padding: 5,
    marginTop: '-4%',
    marginBottom: '-10%',
    color: colors.primary,
    alignSelf: 'center',
  },
});
