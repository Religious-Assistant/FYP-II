/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {
  Text,
  Box,
  Center,
  VStack,
  FormControl,
  Input,
  Icon,
  Link,
  HStack,
  Button,
  ScrollView,
  Checkbox,
  View,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';

import fonts from '../theme/fonts';
import colors from '../theme/colors';

import MyButton from '../components/MyButton';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="stretch"
        source={require('../../assets/images/login_bg.png')}>
        <Center w="100%" mt={'20'}>
          <Box safeArea p="3" w="90%" maxW="310" py="8">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <VStack space={3} mt="20">
                <FormControl>
                  <TextInput textTitle="Enter Username" />
                  <PasswordInput textTitle="Enter Password" />
                  <View style={{flexDirection: 'row'}} mt="2">
                    <Checkbox
                      bgColor={colors.tertiary}
                      alignSelf="flex-start"
                      _text={styles.link}
                      value="info"
                      colorScheme="info"
                      defaultIsChecked>
                      Remember me
                    </Checkbox>

                    <Link
                      _text={styles.link}
                      alignSelf="flex-end"
                      ml="9"
                      mt="1">
                      Forget Password?
                    </Link>
                  </View>
                </FormControl>
                <MyButton title="Login" variant="solid" mt="2" color="white" />
                <Button disabled variant={'ghost'} _text={styles.text}>
                  OR
                </Button>
                <MyButton title="Connect as guest" variant="outline" mt="-2" />

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    fontFamily={fonts.Signika.bold}
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I'm a new user.{' '}
                  </Text>
                  <Link _text={styles.link} href="#">
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </ScrollView>
          </Box>
        </Center>
      </ImageBackground>
    </SafeAreaView>
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
