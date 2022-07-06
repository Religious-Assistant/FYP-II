/**

 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Heading, Image, Center} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import tasbihIcon from '../../../assets/images/tasbih_ic.png';
import tasbihImg from '../../../assets/images/tasbih_img.png';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux'

import { selectTasbih, updateTasbih } from '../../redux/slices/muslim_module_slices/tasbihSlice';

export default function TasbihCounter() {
  
  const dispatch=useDispatch()
 // const navigator=useNavigation()

  const tasbih=useSelector(selectTasbih)

  
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);
  const handleReset = () => setCount(0);


  const saveTasbih = ()=> dispatch(updateTasbih(count));

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <View
        style={{
          flex: 0.17,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <Image
            source={tasbihIcon}
            style={{
              marginTop: '12%',
              marginRight: '5%',
              height: 100,
              width: 100,
            }}
            alt="icon .."
          />
        </View>
        <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
          <Heading color={colors.secondary} marginLeft="10%" marginTop={'7%'}>
            <Text style={{fontFamily: fonts.Signika.bold}}>
              Remember your Lord and{' '}
            </Text>
            <Heading color={colors.white}>
              <Text style={{fontFamily: fonts.Signika.bold}}>
                He will remember you
              </Text>
            </Heading>
          </Heading>
        </View>
      </View>
      <View style={{flex: 0.83}} width="95%">
        <Center
          width="85%"
          space={2}
          maxW="85%"
          marginTop={'15%'}
          marginLeft={'5%'}
          marginBottom={'5%'}>
          {/* Counter For Tasbih */}
          <Text
            style={{
              fontFamily: fonts.Signika.bold,
              color: colors.primary,
              marginLeft: '8%',
              fontSize: 70,
            }}>
            {count}
          </Text>
        </Center>
        {/* Center Image */}
      <TouchableOpacity onPress={onPress}>
          <Center>
            <Image
              size={230}
              resizeMode={'contain'}
              borderRadius={210}
              source={tasbihImg}
              alt="Alternate Text"
            />
          </Center>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: '3%',
            marginTop: '8%',
          }}>
          {/* Reset Button */}
          <CustomButton onPress={handleReset} base="45%" title="Reset" />
          {/* Save Button */}
          <CustomButton base="45%" title="Save" onPress={saveTasbih}/>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
});
