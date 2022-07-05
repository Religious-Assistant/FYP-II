/**

 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Center} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import tasbihIcon from '../../../assets/images/tasbih_ic.png';
import tasbihImg from '../../../assets/images/tasbih_img.png';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';


export default function TasbihCounter() {
  
  const [tasbihCount, setTasbihCount] = useState(0);
  const onPress = () => setTasbihCount(prevTasbihCount => prevTasbihCount + 1);
  const handleReset = () => setTasbihCount(0);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <Header
          image={tasbihIcon}
          title1="Remember your Lord and"
          title2="He will remember you"
          height={0.2}
          title1Size={20}
          title1Color={colors.secondary}
          title2Color={colors.white}
          title2Size={20}
          title1Family={fonts.Signika.bold}
          title2Family={fonts.Signika.medium}
        />
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
            {tasbihCount}
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
          <CustomButton base="45%" title="Save" />
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
