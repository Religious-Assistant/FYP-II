/**
 * @author Nadir
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { setTab } from '../../redux/slices/bottomNavSlice';

export default function Settings({navigation}) {

  const dispatch=useDispatch()

  //when tab is focused in MuslimBottomTab.js, this will be called 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          dispatch(setTab('Settings'))    
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);


  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}
