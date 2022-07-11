import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Center, VStack, FormControl, Button} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Select, CheckIcon} from 'native-base';

import {Formik} from 'formik';
import * as yup from 'yup';

import Ioicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import TextInput from '../../components/TextInput';
import BottomText from '../../components/BottomText';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import ErrorMessage from '../../components/ErrorMessage';
import image from '../../../assets/images/signUp_bg.png';
import {useNavigation} from '@react-navigation/native';
import {ENTER_AS_GUEST, LOGIN, OTP_VERIFICATION} from '../../navigation/constants';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/auth_slices/authSlice';
// import {}

const phoneRegExp = '^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$';

// const registerValidationSchema = yup.object().shape({
//   username: yup.string(),
//   password: yup.string(),
//   mobile: yup.string(),
//   religion: yup.number(),
// });

const registerValidationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().min(8).required('Password is required'),
  mobile: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(11),
    religion: yup.number().required('Religion is Required'),
});

function RegisterScreen() {
  
  const navigator = useNavigation();
  const dispatch=useDispatch()

  function signupHandler(values) {
    
    dispatch(registerUser(values))  
    navigator.navigate(OTP_VERIFICATION);
  }

  function enterAsGuest() {
    navigator.navigate(ENTER_AS_GUEST);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={image}>
          <Center w="100%" h="80%" mt="12%">
            <VStack space={3} mt="12" maxW={'80%'} _text={styles.text} h="90%">
              <Formik
                validationSchema={registerValidationSchema}
                initialValues={{
                  username: '',
                  password: '',
                  mobile: '',
                  religion: 1,
                }}
                onSubmit={values => {
                  signupHandler(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <FormControl mt="30%">
                      <TextInput
                        textTitle="Enter Username"
                        icon={<Ioicons name="person-sharp" />}
                        name="username"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        isInValid={errors.username && touched.username}
                        mt="5%"
                        base="99%"
                      />
                      <ErrorMessage
                        error={errors.username}
                        errosTouched={touched.username}
                      />
                      <PasswordInput
                        textTitle="Enter Password"
                        name="password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        isInValid={errors.password && touched.password}
                        mr="2"
                        base="99%"
                        mt="6%"
                      />
                      <ErrorMessage
                        error={errors.password}
                        errosTouched={touched.password}
                      />
                      <TextInput
                        textTitle="Enter Phone No"
                        name="mobile"
                        icon={<FontAwesome name="phone" />}
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        value={values.mobile}
                        isInValid={errors.mobile && touched.mobile}
                        mt="6%"
                        base="99%"
                      />
                      <ErrorMessage
                        error={errors.mobile}
                        errosTouched={touched.mobile}
                      />

                      <Select
                        _text={styles.text}
                        color={colors.white}
                        mt={'3%'}
                        selectedValue={values.religion}
                        minWidth="50%"
                        accessibilityLabel="Select your Religion"
                        placeholder="Select religion"
                        w={{
                          base: '98%',
                        }}
                        _selectedItem={{
                          bg: colors.secondary,
                          endIcon: <CheckIcon size="5" />,
                        }}
                        _light={{
                          bg: colors.tertiary,
                          _text: {color: colors.white},
                        }}
                        _dark={{
                          bg: colors.white,
                        }}
                        onValueChange={item => setFieldValue('religion', item)}>
                        <Select.Item label="Islam" value={1} color={'white'} />
                        <Select.Item
                          label="Hinduism"
                          value={0}
                          color={'white'}
                        />
                      </Select>
                    </FormControl>
                    <CustomButton
                      title="Sign Up"
                      variant="solid"
                      color="white"
                      onPress={handleSubmit}
                      disabled={!isValid}
                      mt="6%"
                    />
                  </>
                )}
              </Formik>
              <Button disabled variant={'ghost'} _text={styles.text} mt="-4%">
                OR
              </Button>
              <CustomButton
                title="Connect as guest"
                variant="outline"
                mt="-4%"
                onPress={enterAsGuest}
              />
              <BottomText
                text="Already have an account?"
                goTo="Login"
                color={colors.cover}
                destination={LOGIN}
                mt="8%"
              />
            </VStack>
          </Center>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    fontWeight: '900',
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
  link: {
    color: colors.secondary,
    fontSize: 'sm',
    fontFamily: fonts.Signika.medium,
  },
  mainContainer: {
    flex: 1,
  },
});

export default RegisterScreen;
