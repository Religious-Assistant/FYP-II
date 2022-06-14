/**
 * @author Nadir
 * @version 1.0
 */

import React, { useState,useEffect } from 'react'
import colors from '../../theme/colors'
import {View} from 'react-native'
import Header from './Header'
import FeatureContainer from './FeatureContainer'

import {useDispatch, useSelector} from 'react-redux'
import { switchTab } from '../../redux/slices/bottomNavSlice';

export default function Home() {
  
  const dispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(switchTab())    
  },[])

  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>
      <Header />
      <FeatureContainer/>
    </View>
  )
}

