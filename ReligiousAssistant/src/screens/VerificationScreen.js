import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Heading} from 'native-base';
import Separator from '../components/Separator';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
import {Display} from '../utils';
import CustomButton from '../components/CustomButton';
import {VStack, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../navigation/constants';

const VerificationScreen = () => {

  const phoneNumber = '03313456766';
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const fifthInput = useRef();
  const sixthInput = useRef();
  
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '',5:'',6:''});

  const navigator = useNavigation();

  // function verifyOTP() {
  //   navigator.navigate(LOGIN);
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.white}
          translucent
        />
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <Heading ml={'25%'} color={colors.white}>
            OTP <Heading color={colors.secondary}>Verification</Heading>
          </Heading>
        </View>
        <Center w="100%" h="95%" maxW="100%">
          <VStack space={3} mt={'-30%'}>
            <Text style={styles.content}>
              Enter the OTP number just sent you at{' '}
              <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
            </Text>
            <View style={styles.otpContainer}>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={firstInput}
                  onChangeText={text => {
                    setOtp({...otp, 1: text});
                    text && secondInput.current.focus();
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={text => {
                    setOtp({...otp, 2: text});
                    text
                      ? thirdInput.current.focus()
                      : firstInput.current.focus();
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={text => {
                    setOtp({...otp, 3: text});
                    text
                      ? fourthInput.current.focus()
                      : secondInput.current.focus();
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourthInput}
                  onChangeText={text => {
                    setOtp({...otp, 4: text});
                    !text && thirdInput.current.focus();
                  }}
                />
              </View>
            </View>
{/* <<<<<<< HEAD
            <CustomButton
              title="Verify"
              variant="solid"
              color="white"
              onPress={verifyOTP}
            />
          </VStack>
        </Center>
      </View>
======= */}
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={text => {
                  setOtp({...otp, 3: text});
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={text => {
                  setOtp({...otp, 3: text});
                  text
                    ? fifthInput.current.focus()
                    : thirdInput.current.focus();
                }}
              />
            </View>
            
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fifthInput}
                onChangeText={text => {
                  setOtp({...otp, 3: text});
                  text
                    ? sixthInput.current.focus()
                    : fourthInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={text => {
                  setOtp({...otp, 4: text});
                  !text && fifthInput.current.focus();
                }}
              />
            </View>
          <CustomButton title="Verify" variant="solid" color="white" onPress={verifyOTP} />
        </VStack>
      </Center>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: colors.white,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: fonts.Signika.regular,
    lineHeight: 18 * 1.4,
    color: colors.secondary,
  },
  otpContainer: {
    marginHorizontal: 5,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: colors.cover,
    backgroundColor: colors.tertiary,
    borderWidth: 0.4,
    margin:2,
  },
  otpText: {
    fontSize: 25,
    color: colors.white,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});

export default VerificationScreen;
