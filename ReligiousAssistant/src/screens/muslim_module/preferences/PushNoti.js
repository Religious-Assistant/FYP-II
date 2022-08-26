/**
 * @author Kinza
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';
import appIcon from '../../../../assets/images/Logo-muslim.png';
import {useDispatch, useSelector} from 'react-redux'
import { getUserData, selectUserData } from '../../../redux/slices/auth_slices/authSlice';


const PushNoti = () => {

//     const dispatch=useDispatch()
//     const user=useSelector(selectUserData)

//     useEffect(()=>{

//         if(!user){
//             dispatch(getUserData())
//         }
//     },[dispatch])

//   function setHours(dt, time) {
//     var splitted = time.split(":");
//     let hours=splitted[0]
//     let mins=splitted[1]
//     let meridium=splitted[2].split(" ")[1]
//     dt.setHours(meridium.toLowerCase() === 'pm' ? 12 + parseInt(hours, 10) : parseInt(hours, 10));
//     dt.setMinutes(parseInt(mins, 10));
    
//   }

//   var d3=new Date();
// //   setHours(d3,`${user?.alarms.fajr}`) ////1:31:03 am
//   setHours(d3,`2:32:30 am`) ////1:31:03 am
//   useEffect(() => {
//     createChannels().then(()=>{
//         createNotification()
//     });
//   }, []);

//   const createChannels = async () => {
//     await PushNotification.createChannel(
//       {
//         channelId: 'namaz_notification',
//         channelName: 'My channel',
//         channelDescription: 'A channel to categorise your notifications',
//         soundName: 'azan2.mp3',
//         importance: 4,
//         vibrate: true,
//       },
//       created => console.log(`createChannel returned '${created}'`),
//     );
//   };

//   const createNotification=()=>{
//     PushNotification.localNotificationSchedule({
//         channelId: 'namaz_notification',
//         title: 'Namaz Notification',
//         message: 'Alarm 1',
//         soundName: 'azan2.mp3',
//         importance: 4,
//         vibrate: true,
//         smallIcon: appIcon,
//         date: d3,
//         allowWhileIdle: true,
//         repeatType: 'day',
//       });
//   }

  function handleNoti() {



    // PushNotification.localNotificationSchedule({
    //   channelId: 'namaz_notification',
    //   title: 'Namaz Notification',
    //   message: 'Alarm 2',
    //   soundName: 'azan2.mp3',
    //   importance: 4,
    //   vibrate: true,
    //   smallIcon: appIcon,
    //   date: d2,
    //   allowWhileIdle: true,
    //   repeatType: 'day',
    // });
  }
  return (
    <View>
      <Button
        title="Handle Notification"
        onPress={() => {
          handleNoti();
        }}></Button>
    </View>
  );
};

export default PushNoti;
