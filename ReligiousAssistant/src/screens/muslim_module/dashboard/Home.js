/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React from 'react';
import {View} from 'react-native';

//theme
import colors from '../../../theme/colors';

//components
import Header from '../common/Header';
import FeatureContainer from './FeatureContainer';

//redux
import {useDispatch} from 'react-redux';
import {setTab} from '../../../redux/slices/muslim_module_slices/bottomNavSlice';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  //when tab is focused in MuslimBottomTab.js, this will be called
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab('Home'));
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Header />
      <FeatureContainer />
    </View>
  );
}
