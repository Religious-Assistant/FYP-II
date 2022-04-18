/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {
  Text,
  ScrollView,
  Center,
  Box,
  VStack,
  FormControl,
  HStack,
  Link,
  Icon,
  Button
} from 'native-base';

import MyIcon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import TextInput from '../components/TextInput';

import fonts from '../theme/fonts';
import PasswordInput from '../components/PasswordInput';
import MyDropdown from '../components/MyDropdown';
import MyButton from '../components/MyButton';

const image = {uri: '../../assets/images/login_bg.png'};

function RegisterScreen() {
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="stretch"
      source={require('../../assets/images/signUp_bg.png')}>
      <Center w="100%" h="80%" mt="12">
        <Box
          safeArea
          p="-2"
          w="95%"
          mb="18"
          mt="12"
          maxW="340"
          maxH="700"
          py="8">
          <VStack space={3} mt="12" _text={styles.text} h="90%">
            <FormControl mt="8">
              <TextInput textTitle="Enter UserName" mt="5" base="99%" />
                <PasswordInput
                  textTitle="Enter Password"
                  alignSelf="flex-start"
                  mr="2"
                  base="99%"
                  mt="5"
                />
              <TextInput textTitle="Enter Phone No" mt="5" base="99%" />
              <MyDropdown mt="3" base="99%" />
            </FormControl>
            <MyButton title="Sign Up" variant="solid" color="white" mt="3" />
            <Button disabled variant={'ghost'} _text={styles.text}>
                  OR
                </Button>
                <MyButton title="Connect as guest" variant="outline" mt="-2" />
            <HStack mt="5" justifyContent="center">
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
                Login
                <Icon
                  as={<MyIcon name="arrow-redo-circle-outline" />}
                  color={colors.secondary}
                  size={25}
                />
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flex: 1,
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
    color: 'white',
  },
  link: {
    color: colors.secondary,
    fontWeight: 'medium',
    fontSize: 'sm',
    fontFamily: fonts.Signika.bold,
  },
});

export default RegisterScreen;
