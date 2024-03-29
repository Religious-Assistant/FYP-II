/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Heading, VStack, Center} from 'native-base';

//theme
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

//custom components
import CustomButton from '../../components/CustomButton';
import Separator from '../../components/Separator';
import Loader from '../common/Loader';

//navigation
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../navigation/constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  registerUser,
  selectHasErrorVerifyOTP,
  selectIsLoadingVerifyOTPCode,
  selectIsOTPVerified,
  selectOtpId,
  verifyOTPCode,
} from '../../redux/slices/auth_slices/authSlice';

//utils
import {Display} from '../../utils';

const VerificationScreen = ({route, navigation}) => {
  const {values} = route.params;

  const dispatch = useDispatch();
  const isLoadingVerifyOTP = useSelector(selectIsLoadingVerifyOTPCode);
  const isOTPVerified = useSelector(selectIsOTPVerified);
  const otpVerifyError = useSelector(selectHasErrorVerifyOTP);
  const otpId = useSelector(selectOtpId);

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});

  const navigator = useNavigation();

  function verifyOTP() {

    if(otpId){

      let values=Object.values(otp)
      dispatch(verifyOTPCode({otpCode:values.toString().replaceAll(',',''), otpId:otpId}))
    }
    else{
      alert('Could not get OTP Id, Try again')
    }
  }

  useEffect(()=>{

    if(isOTPVerified){

      dispatch(registerUser(values))
      navigator.navigate(LOGIN)
    }
    if(isOTPVerified==false){
      alert(`Verification failed. Try again`)
    }

  },[dispatch, isOTPVerified])

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
        {isLoadingVerifyOTP ? (
          <Loader msg="Verifying OTP Code" />
        ) : (
          <Center w="100%" h="95%" maxW="100%">
            <VStack space={3} mt={'-30%'}>
              <Text style={styles.content}>
                Enter the OTP number just sent you
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
                      setOtp({...otp, 5: text});
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
                      setOtp({...otp, 6: text});
                      !text && fifthInput.current.focus();
                    }}
                  />
                </View>
              </View>
              <CustomButton
                title="Verify"
                variant="solid"
                color="white"
                onPress={verifyOTP}
              />
            </VStack>
          </Center>
        )}
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
    marginTop: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: colors.white,
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
    margin: 2,
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
