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
    dt.setHours(s[3] === "pm" ? 
      12 + parseInt(s[1], 10) : 
      parseInt(s[1], 10));
    dt.setMinutes(parseInt(s[2],10));
  }
  
  var d = new Date();
  setHours(d, "5:09pm");
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
      message: 'Fajr Namaz Time 10 se',
      soundName: 'azan2.mp3',
      importance: 4,
      vibrate: true,
      smallIcon: appIcon,
      date: d,
      allowWhileIdle: true,
      repeatType:'day'
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
