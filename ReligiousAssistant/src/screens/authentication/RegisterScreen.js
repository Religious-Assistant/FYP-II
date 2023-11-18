/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {
  Center,
  VStack,
  FormControl,
  Button,
  Select,
  CheckIcon,
  Link,
  Text,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Formik} from 'formik';
import * as yup from 'yup';

//icons
import Ioicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//theme
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

//custom components
import TextInput from '../../components/TextInput';
import BottomText from '../../components/BottomText';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import ErrorMessage from '../../components/ErrorMessage';

//image
import image from '../../../assets/images/signUp_bg.png';

//navigation
import {
  ENTER_AS_GUEST,
  LOGIN,
  OTP_VERIFICATION,
} from '../../navigation/constants';
import {useNavigation} from '@react-navigation/native';

//geolocation
import Geolocation from '@react-native-community/geolocation';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getOTPCode,
  selectHasErrorGetOTPCode,
  selectIsObtainedOTP,
} from '../../redux/slices/auth_slices/authSlice';

//phone number regex
const phoneRegExp = '^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$';

//yup validation schema
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

export default function RegisterScreen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const hasErrorGetOtpCode = useSelector(selectHasErrorGetOTPCode);
  const isObtainedOTP = useSelector(selectIsObtainedOTP);

  const [registerValues, setRegisterValues] = useState();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
        });
      },
      error => console.log(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, []);

  function signupHandler(values) {
    dispatch(getOTPCode({mobile: values.mobile}));
    setRegisterValues({
      ...values,
      location: {
        longitude: position ? position.longitude : 68.5953277,
        latitude: position ? position.latitude : 27.3027566,
      },
    });
  }

  function enterAsGuest() {
    navigator.navigate(ENTER_AS_GUEST);
  }

  useEffect(() => {
    if (!hasErrorGetOtpCode && isObtainedOTP) {
      navigator.navigate(OTP_VERIFICATION, {values: registerValues});
    }
    if (hasErrorGetOtpCode && !isObtainedOTP) {
      alert(`Number already in use, or error while getting OTP`);
    }
  }, [dispatch, hasErrorGetOtpCode, isObtainedOTP]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665685997/religious-assistant/static_assets/signUp_bg_iur4zb.png'}}>
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
});
