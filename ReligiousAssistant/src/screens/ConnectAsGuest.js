/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {ImageBackground, Dimensions, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Center, Box, VStack} from 'native-base';

import CustomButton from '../components/CustomButton';
import BottomText from '../components/BottomText';
import CustomDropdown from '../components/CustomDropdown';

import colors from '../theme/colors';
import fonts from '../theme/fonts';
import {SIGNUP} from '../navigation/constants';

export default function ConnectAsGuest() {
  const items = ["Islam", "Hinduism"];
  return (
    <View style={styles.flexRatio}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/connectAsGuest_bg.png')}>
        <Center w="100%" mt={'20%'}>
          <Box safeArea p="1%" w="90%" maxW="82%" py="7%" mt="20%">
            <VStack mt="20%" space={3} _text={styles.text}>
              <CustomDropdown 
              mt="10%" />
            </VStack>
            <CustomButton
              title="Connect as guest"
              variant="solid"
              mt="5%"
              color={colors.white}
            />
            <BottomText
              text="Do you want to register?"
              goTo="Sign up"
              color={colors.cover}
              destination={SIGNUP}
              mt="25%"
            />
          </Box>
        </Center>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  flexRatio: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
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
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
  link: {
    color: colors.secondary,
    fontSize: 'sm',
    fontFamily: fonts.Signika.medium,
  },
});
