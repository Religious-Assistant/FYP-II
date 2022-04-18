import { Button, View } from 'native-base';
import React from 'react'
import { ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {

  const navigation=useNavigation()

  function gotoLogin(){
    navigation.navigate('Login')
  }
  
  return (
  <SafeAreaView style={{flex:1}}>
     <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/images/signup.png')}>
          <View style={{alignItems:'center', top:500}}>
          <Button onPress={gotoLogin} style={{width:150,}}>Login Now</Button>
          </View>
        </ImageBackground>
  </SafeAreaView>
  )
}