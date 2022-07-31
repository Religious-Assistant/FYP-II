/**
 * @author Kinza Kiran
 * @version 1.0
*/

import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Center} from 'native-base';

//Redux
import {useSelector, useDispatch} from 'react-redux'
import { selectTasbih, updateCount, updateTasbih } from '../../redux/slices/muslim_module_slices/tasbihSlice';
import { selectUserData } from '../../redux/slices/auth_slices/authSlice';

import tasbihIcon from '../../../assets/images/tasbih_ic.png';
import tasbihImg from '../../../assets/images/tasbih_img.png';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';

//Theme
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default function TasbihCounter() {
  
  const dispatch=useDispatch()
 // const navigator=useNavigation()

  const tasbih=useSelector(selectTasbih)
  const userData= useSelector(selectUserData)

  
  // const [count, setCount] = useState(0);
  const onPress = () => dispatch(updateCount(tasbih+1));
  const handleReset = () => dispatch(updateCount(0));


  const saveTasbih = ()=> dispatch(updateTasbih({username: userData.username,count: tasbih}));

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
            {tasbih}
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
