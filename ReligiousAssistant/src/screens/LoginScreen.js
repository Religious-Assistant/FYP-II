import { Button, View } from 'native-base';
import React from 'react'
import { ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

  const navigation=useNavigation()

  function gotoRegister(){
    navigation.navigate('RegisteredMuslimDashboard')
  }

  return (
  <SafeAreaView style={{flex:1}}>
     <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/images/login.png')}>
          <View style={{alignItems:'center', top:500}}>
          <Button onPress={gotoRegister} style={{width:150,}}>Register Now</Button>
          </View>
        </ImageBackground>
  </SafeAreaView>
  )
}