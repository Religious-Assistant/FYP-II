/**
 * @author Kinza
 * @version 1.0
 */

import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import PushNotification, {Importance} from 'react-native-push-notification';
import appIcon from '../../../../assets/images/Logo-muslim.png';
import moment from 'moment';

const PushNoti = () => {
  function setHours(dt, h) {
    var s = /(\d+):(\d+)(.+)/.exec(h);
    dt.setHours(s[3] === 'pm' ? 12 + parseInt(s[1], 10) : parseInt(s[1], 10));
    dt.setMinutes(parseInt(s[2], 10));
  }

  var d1 = new Date();
  setHours(d1, '5:30pm');
  var d2 = new Date();
  setHours(d2, '5:32pm');
  //console.log(d);
  useEffect(() => {
    createChannels();
    console.log('done');
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'checkNotification1', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'azan2.mp3',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  function handleNoti() {
    console.log('pressed');

    PushNotification.localNotificationSchedule({
      channelId: 'checkNotification1',
      title: 'Namaz Notification',
      message: 'Alarm 1',
      soundName: 'azan2.mp3',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: d1,
      allowWhileIdle: true,
      repeatType: 'day',
    });
    PushNotification.localNotificationSchedule({
      channelId: 'checkNotification1',
      title: 'Namaz Notification',
      message: 'Alarm 2',
      soundName: 'azan2.mp3',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: d2,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  }
  return (
    <View>
      <Text>AutoSilent</Text>
      <Button
        title="Handle Notification"
        onPress={() => {
          handleNoti();
        }}></Button>
    </View>
  );
};

export default PushNoti;

const styles = StyleSheet.create({});


// /**
//  * @author Kinza
//  * @version 1.0
//  */

// import React, {useEffect} from 'react';
// import {View, Text, Button} from 'react-native';

// import PushNotification from 'react-native-push-notification';
// import appIcon from '../../../../assets/images/Logo-muslim.png';
// import {useDispatch, useSelector} from 'react-redux'
// import { getUserData, selectUserData } from '../../../redux/slices/auth_slices/authSlice';


// const PushNoti = () => {

// //     const dispatch=useDispatch()
// //     const user=useSelector(selectUserData)

// //     useEffect(()=>{

// //         if(!user){
// //             dispatch(getUserData())
// //         }
// //     },[dispatch])

// //   function setHours(dt, time) {
// //     var splitted = time.split(":");
// //     let hours=splitted[0]
// //     let mins=splitted[1]
// //     let meridium=splitted[2].split(" ")[1]
// //     dt.setHours(meridium.toLowerCase() === 'pm' ? 12 + parseInt(hours, 10) : parseInt(hours, 10));
// //     dt.setMinutes(parseInt(mins, 10));
    
// //   }

// //   var d3=new Date();
// // //   setHours(d3,`${user?.alarms.fajr}`) ////1:31:03 am
// //   setHours(d3,`2:32:30 am`) ////1:31:03 am
// //   useEffect(() => {
// //     createChannels().then(()=>{
// //         createNotification()
// //     });
// //   }, []);

// //   const createChannels = async () => {
// //     await PushNotification.createChannel(
// //       {
// //         channelId: 'namaz_notification',
// //         channelName: 'My channel',
// //         channelDescription: 'A channel to categorise your notifications',
// //         soundName: 'azan2.mp3',
// //         importance: 4,
// //         vibrate: true,
// //       },
// //       created => console.log(`createChannel returned '${created}'`),
// //     );
// //   };

// //   const createNotification=()=>{
// //     PushNotification.localNotificationSchedule({
// //         channelId: 'namaz_notification',
// //         title: 'Namaz Notification',
// //         message: 'Alarm 1',
// //         soundName: 'azan2.mp3',
// //         importance: 4,
// //         vibrate: true,
// //         smallIcon: appIcon,
// //         date: d3,
// //         allowWhileIdle: true,
// //         repeatType: 'day',
// //       });
// //   }

//   function handleNoti() {



//     // PushNotification.localNotificationSchedule({
//     //   channelId: 'namaz_notification',
//     //   title: 'Namaz Notification',
//     //   message: 'Alarm 2',
//     //   soundName: 'azan2.mp3',
//     //   importance: 4,
//     //   vibrate: true,
//     //   smallIcon: appIcon,
//     //   date: d2,
//     //   allowWhileIdle: true,
//     //   repeatType: 'day',
//     // });
//   }
//   return (
//     <View>
//       <Button
//         title="Handle Notification"
//         onPress={() => {
//           handleNoti();
//         }}></Button>
//     </View>
//   );
// };

// export default PushNoti;