/**
 * @author Nadir Hussain
 * @version 1.0
 */

 import 'react-native-gesture-handler';
 import React, {useEffect} from 'react';
 import {StatusBar} from 'react-native';
 
 import {NativeBaseProvider} from 'native-base';
 import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
 import RootNavigator from './src/navigation/RootNavigator';
 import store from './src/redux/store';
 import {Provider} from 'react-redux';
 
 //Notifee
 import notifee, {EventType } from '@notifee/react-native';
 import messaging from '@react-native-firebase/messaging';

 import UpdatePrayerTimes from './src/screens/muslim_module/imam/UpdatePrayerTimes'
import AutoSilent from './src/screens/muslim_module/preferences/AutoSilent';
import PushNoti from './src/screens/muslim_module/preferences/PushNoti';

 async function onMessageReceived(message) {
   const data = await JSON.parse(message.data.notification);
 
   const channelId = await notifee.createChannel({
     id: data["channelId"],
     name: 'Default Channel',
   });
 
   notifee.displayNotification({
     body: data['body'],
     title: data['title'],
     android: {
       channelId,
       smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher',
       largeIcon:data['largeIcon'],
       autoCancel:false,
       // color:colors.secondary,
       actions:[
         {
           title:"Mark as Read",
           pressAction:{
             id:'mark-as-read'
           },
         },
         {
           title:"Open Up",
           pressAction:{
             id:"open",
             launchActivity:"default",
           } 
         }
       ]
     },
   });
 }
 
 messaging().onMessage(onMessageReceived);
 messaging().setBackgroundMessageHandler(onMessageReceived);
 
 const EntryPoint = () => {
 
   useEffect(()=>{
   
     //For Ios Ask permisson for notification
     const askPermission=async ()=>await messaging().requestPermission()
     askPermission()
 
     return notifee.onForegroundEvent(async ({ type, detail }) => {
       const {notification, pressAction}=detail
 
       if(pressAction.id==='mark-as-read'){
         await notifee.cancelNotification(notification.id);
       }
       
       if(pressAction.id==='open'){
         await notifee.cancelNotification(notification.id);
       }
       
       switch (type) {
         case EventType.DISMISSED:
           break;
         case EventType.PRESS:
           await notifee.cancelNotification(notification.id);
           break;
       }
     });
 
   },[])
   return <RootNavigator />;
 };
 
 const preloadedState = window.__PRELOADED_STATE__;
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <Provider store={store} serverState={preloadedState}>
       <NativeBaseProvider>
         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
         <PushNoti/>
       </NativeBaseProvider>
     </Provider>
   );
 };
 
 export default App;