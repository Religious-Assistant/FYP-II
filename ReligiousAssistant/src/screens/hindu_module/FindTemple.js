/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Center, VStack, Input, Icon} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ioicons from 'react-native-vector-icons/Ionicons';
import image from '../../../assets/images/findMosque_bg.png';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import CustomBox from '../../components/CustomBox';

export default function FindTemple() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.Maincontainer}>
        <ImageBackground style={styles.imageBg} source={image}>
          <Center w="110%" mt={'-30%'} ml="-1%" h="95%" maxW="110%">
            <VStack width="80%" space={2} maxW="80%">
              <Input
                placeholder="search"
                _text={styles.text}
                color={colors.white}
                bgColor={colors.tertiary}
                borderRadius="20"
                py="2"
                px="2"
                borderWidth="0"
                InputLeftElement={
                  <Icon
                    as={<Ioicons name="search" />}
                    size={5}
                    ml="2%"
                    color={colors.white}
                  />
                }
              />
              <CustomBox
                mt={'20%'}
                text="Sukkur IBA masjid"
                distance="2.3 km"
                ml="20%"
              />

              <CustomBox
                mt={'2%'}
                text="Allah Wali Masjid"
                distance="2.3 km"
                ml="22%"
              />

              <CustomBox
                mt={'2%'}
                text="Makrani Masjid Sukkur"
                distance="2.3 km"
                ml="6%"
              />
            </VStack>
          </Center>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  image: {width: '90%', flex: 0.5, resizeMode: 'contain', alignSelf: 'center'},
  container: {backgroundColor: colors.cover, flex: 1},
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
});
