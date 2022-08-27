/**
 * @author Nadir
 * @version 1.0
 */

import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setTab } from '../../../redux/slices/hindu_module_slices/bottomNavSlice'
import { HINDU_PRAYERS } from '../../../navigation/constants'
import colors from '../../../theme/colors'
const Prayers = ({navigation}) => {

  const dispatch=useDispatch()
  //when tab is focused in MuslimBottomTab.js, this will be called 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          dispatch(setTab(HINDU_PRAYERS))    
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>
      <Text>Prayers 2</Text>
    </View>
  )
}

export default Prayers

const styles = StyleSheet.create({})