
import React from 'react'
import { Center, Container , Text} from 'native-base'

import { ScrollView } from 'react-native-gesture-handler'
import colors from '../../theme/colors'
import {View} from 'react-native'
import Header from './Header'
import FeatureContainer from './FeatureContainer'

export default function Home() {
  return (
    <View style={{flex:1}}>
      <Header />
      <FeatureContainer/>
    </View>
  )
}

