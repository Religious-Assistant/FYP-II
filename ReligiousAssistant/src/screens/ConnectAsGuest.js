/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {ImageBackground, Dimensions,View} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  Center,
  Box,
  Select,
  CheckIcon,
  VStack,
  HStack,
  Icon,
  Text,
  Link,
} from 'native-base';

import MyIcon from 'react-native-vector-icons/Ionicons';
import MyButton from '../components/MyButton';

import colors from '../theme/colors';
import fonts from '../theme/fonts';
import MyDropdown from '../components/MyDropdown';

export default function ConnectAsGuest() {
  return (
    <View style={styles.flexRatio}>
    <ImageBackground
      style={styles.image}
      source={require('../../assets/images/connectAsGuest_bg.png')}>
      <Center w="100%" mt={'20%'}>
        <Box safeArea p="1%" w="90%" maxW="82%" py="7%" mt="20%">
          <VStack mt="20%" space={3} _text={styles.text}>
            <MyDropdown mt="10%" />
          </VStack>
          <MyButton title="Connect as guest" variant="solid" mt="5%" color={colors.white} />
          <HStack mt="25%" justifyContent="center">
            <Text
              fontSize="sm"
              color={colors.cover}
              fontFamily={fonts.Signika.bold}
              _dark={{
                color: 'warmGray.200',
              }}>
              Do you want to Register?{' '}
            </Text>
            <Link _text={styles.link} href="#">
              Sign Up
              <Icon
                as={<MyIcon name="arrow-redo-circle-outline" />}
                color={colors.secondary}
                size={25}
              />
            </Link>
          </HStack>
        </Box>
      </Center>
    </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  flexRatio:{
    flex:1
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
    fontSize: 'md',
    fontWeight: '900',
    fontFamily: fonts.Signika.bold,
    color: colors.white,
  },
  link: {
    color: colors.secondary,
    fontWeight: 'medium',
    fontSize: 'sm',
    fontFamily: fonts.Signika.bold,
  },
});
