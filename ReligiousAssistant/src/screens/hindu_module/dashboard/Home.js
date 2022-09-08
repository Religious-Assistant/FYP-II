/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react';

import colors from '../../../theme/colors';
import {View} from 'react-native';

//components
import Header from '../common/Header';
import FeatureContainer from './FeatureContainer';

//redux
import {useDispatch} from 'react-redux';
import {setTab} from '../../../redux/slices/hindu_module_slices/bottomNavSlice';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  //when tab is focused in MuslimBottomTab.js, this will be called
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab('Home'));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Header />
      <FeatureContainer />
    </View>
  );
}
