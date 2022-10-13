/**
 * @author Kinza
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  Box,
  Checkbox,
  ScrollView,
  FormControl,
} from 'native-base';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

//custom
import CustomButton from '../../../components/CustomButton';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {
  getVegData,
  selectVegData,
  setVegData,
} from '../../../redux/slices/hindu_module_slices/vegNonVegSlice';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//images
import appIcon from '../../../../assets/images/Logo-muslim.png';
import {setHours} from '../../../utils/helpers';

const VegNonVegDays = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const vegData = useSelector(selectVegData);

  const [vegSubscription, setVegSubscription] = useState({
    monday: vegData ? vegData?.monday : false,
    tuesday: vegData ? vegData?.tuesday : false,
    wednesday: vegData ? vegData?.wednesday : false,
    thursday: vegData ? vegData?.thursday : false,
    friday: vegData ? vegData?.friday : false,
    saturday: vegData ? vegData?.saturday : false,
    sunday: vegData ? vegData?.sunday : false,
  });

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
    dispatch(getVegData({username: user?.username}));

    PushNotification.channelExists('veg_notification', async exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'veg_notification',
            channelName: 'My Veg Channel',
            channelDescription:
              'A channel to categorise your veg notifications',
            // soundName: 'azan2.mp3',
            importance: 5,
            vibrate: true,
          },
          created => {
            console.log(`createChannel returned '${created}'`);
          },
        );
      }
    });
  }, [dispatch, vegSubscription]); //TODO: Remove vegData incase problem

  const days = [
    {
      key: 1,
      dayName: 'Monday',
      value: vegData?.monday,
    },
    {
      key: 2,
      dayName: 'Tuesday',
      value: vegData?.tuesday,
    },
    {
      key: 3,
      dayName: 'Wednesday',
      value: vegData?.wednesday,
    },
    {
      key: 4,
      dayName: 'Thursday',
      value: vegData?.thursday,
    },
    {
      key: 5,
      dayName: 'Friday',
      value: vegData?.friday,
    },
    {
      key: 6,
      dayName: 'Saturday',
      value: vegData?.saturday,
    },
    {
      key: 7,
      dayName: 'Sunday',
      value: vegData?.sunday,
    },
  ];


  async function handlePress() {
    dispatch(setVegData({username: user?.username, vegSubscription}));

    console.log("Scheduled Veg Notfs")
    PushNotification.getScheduledLocalNotifications(noti => {
      console.log(noti);
    });

    // let scheduled=["2022-10-11T07:35:00.806Z","2022-10-16T07:35:00.806Z","2022-10-15T07:35:00.806Z","2022-10-12T07:35:00.806Z","2022-10-10T07:35:00.805Z"]
    // for(let i=0;i<scheduled.length;i++){
    //   let date = new Date(scheduled[i]);

    //   console.log(
    //     date.getFullYear() +
    //       '-' +
    //       (date.getMonth() + 1) +
    //       '-' +
    //       date.getDate() +
    //       '-' +
    //       date.getHours() +
    //       '-' +
    //       date.getMinutes() +
    //       '-' +
    //       date.getSeconds(),
    //   );
    // }


    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const time1 = new Date();
    var dayName = days[time1.getDay()].toLowerCase();

    PushNotification.cancelAllLocalNotifications();
    switch (dayName) {
      case 'monday':
        if (vegSubscription.monday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }

        break;
      case 'tuesday':
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        break;
      case 'wednesday':
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }

        break;
      case 'thursday':
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        break;
      case 'friday':
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        break;
      case 'saturday':
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        break;
      default:
        if (vegSubscription.monday) {
          let time = new Date();
          time.setDate(time.getDate() + 1);
          setNotification(time);
        }
        if (vegSubscription.tuesday) {
          let time = new Date();
          time.setDate(time.getDate() + 2);
          setNotification(time);
        }
        if (vegSubscription.wednesday) {
          let time = new Date();
          time.setDate(time.getDate() + 3);
          setNotification(time);
        }
        if (vegSubscription.thursday) {
          let time = new Date();
          time.setDate(time.getDate() + 4);
          setNotification(time);
        }
        if (vegSubscription.friday) {
          let time = new Date();
          time.setDate(time.getDate() + 5);
          setNotification(time);
        }
        if (vegSubscription.saturday) {
          let time = new Date();
          time.setDate(time.getDate() + 6);
          setNotification(time);
        }
        if (vegSubscription.sunday) {
          let time = new Date();
          setNotification(time);
        }
        break;
    }

    alert("Your days have been set..")
  }

  const handleDayChange = (state, day) => {
    setVegSubscription(prevState => ({
      ...prevState,
      [day.dayName.toLowerCase()]: state,
    }));
  };

  const setNotification = async time => {

    const hours=(new Date().getHours())

    const OFFSET_HOUR=8
    const OFFSET_MINS=30
    const OFFSET_FORMAT="am"

    if(hours<=12 && (hours%12)>OFFSET_HOUR){
      time.setDate(time.getDate()+7)
    }
  
    await setHours(time, `${OFFSET_HOUR}:${OFFSET_MINS}:00 ${OFFSET_FORMAT}`); 

      PushNotification.localNotificationSchedule({
        channelId: 'veg_notification',
        title: '⏰Veg Non-veg Notification⏰',
        message: 'Is it your veg day today?',
        bigText: 'Religious Assistant detected, it is your veg day',
        importance: 4,
        vibrate: true,
        smallIcon: appIcon,
        date: time,
        allowWhileIdle: true,
        repeatType: 'week',
        repeatTime: 1,
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        backgroundColor={colors.white}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
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
                source={{
                  uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663583852/religious-assistant/static_assets/vegDays_ic_gajffq.png',
                }}
                style={{
                  marginTop: '10%',
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
                <Text style={{fontFamily: fonts.Signika.bold}}>Veg </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>Days</Text>
                </Heading>
              </Heading>
            </View>
          </View>
          <View
            style={{flex: 0.8, marginTop: '20%'}}
            width="95%"
            maxW="80%"
            alignItems="center">
            <Center
              width="90%"
              space={2}
              maxW="90%"
              marginLeft={'6%'}
              marginTop="8"
              marginBottom={'5%'}>
              <Heading color={colors.primary}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  {'\n'}Select your Veg Days
                </Text>
              </Heading>
              <View style={{marginTop: '4%', width: '94%'}}>
                <FormControl>
                  {days.map(day => {
                    return (
                      <Item
                        day={day}
                        key={day.id}
                        handleDayChange={handleDayChange}
                      />
                    );
                  })}

                  <CustomButton
                    title="Save"
                    color="yellow"
                    mt="5%"
                    onPress={handlePress}
                  />
                </FormControl>
              </View>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const Item = ({day, handleDayChange}) => {
  return (
    <Box key={day.key} style={styles.subBox} _text={styles.text} px="3">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{day.dayName}</Text>
        <Checkbox
          name="day"
          my={2}
          colorScheme="green"
          accessibilityLabel="Namaz time"
          value={day}
          defaultIsChecked={day?.value}
          onChange={v => {
            handleDayChange(v, day);
          }}
        />
      </View>
    </Box>
  );
};

export default VegNonVegDays;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  subBox: {
    backgroundColor: colors.cover,
    padding: 5,
    marginTop: '5%',
  },
});
