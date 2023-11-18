//Notifee
import messaging from '@react-native-firebase/messaging';

export default async function getDeviceToken() {
  await messaging()
    .registerDeviceForRemoteMessages()
    .catch(err => {
      console.log('err ' + err);
    });

    return await messaging().getToken();

    //
}