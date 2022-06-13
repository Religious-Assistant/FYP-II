/**
 * @author Nadir
 * @version 1.0
 */

import React from 'react'

import colors from '../../theme/colors'
import {View} from 'react-native'
import Header from './Header'
import FeatureContainer from './FeatureContainer'

export default function Home() {
  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>
      <Header />
      <FeatureContainer/>
    </View>
  )
}

