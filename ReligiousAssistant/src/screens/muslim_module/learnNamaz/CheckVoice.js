import { Button, View } from 'native-base'
import React from 'react'
import Tts from 'react-native-tts';

export default function CheckVoice() {

    Tts.setDefaultLanguage('ar-SA')
  return (
    <View>
        <Button onPress={()=>{console.log("urdghf")
    Tts.speak( 'سُبْـحانَكَ اللّهُـمَّ وَبِحَمْـدِكَ وَتَبارَكَ اسْمُـكَ وَتَعـالى جَـدُّكَ وَلا إِلهَ غَيْرُك')}}>
            Click Me
        </Button>
    </View>
  )
}
