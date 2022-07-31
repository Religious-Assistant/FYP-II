/**
 * @author Nadir
 * @version 1.0
 */

import React, { useState,useEffect } from 'react'
import colors from '../../../theme/colors'
import {View} from 'react-native'
import Header from '../common/Header'
import FeatureContainer from './FeatureContainer'

import {useDispatch, useSelector} from 'react-redux'
import { setTab } from '../../../redux/slices/muslim_module_slices/bottomNavSlice';

export default function Home({navigation}) {
  

  const dispatch=useDispatch()
  //when tab is focused in MuslimBottomTab.js, this will be called 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          dispatch(setTab('Home'))    
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>      
      <Header />
      <FeatureContainer/>
    </View>
  )
}

