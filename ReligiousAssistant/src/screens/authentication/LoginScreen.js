/**
 * @author Kinza
 * @version 1.0
 *
 */

//https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/

import React, {useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Center, VStack, FormControl, Link, Button, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Formik} from 'formik';
import * as yup from 'yup';

//icons
import Ioicons from 'react-native-vector-icons/Ionicons';

//theme
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

//custom components
import CustomButton from '../../components/CustomButton';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import BottomText from '../../components/BottomText';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../common/Loader';

//image
import image from '../../../assets/images/login_bg.png';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  ENTER_AS_GUEST,
  SET_NEW_PASSWORD,
  SIGNUP,
} from '../../navigation/constants';

//Redux
import {useDispatch} from 'react-redux';
import {
  loginUser,
  selectIsLoadingLogin,
} from '../../redux/slices/auth_slices/authSlice';
import {useSelector} from 'react-redux';

//device token
import getDeviceToken from '../../../getDeviceToken';

// const loginValidationSchema = yup.object().shape({
//   username: yup.string().required('username is required'),
//   password: yup.string().min(8).required('Password is required'),
// });

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

export default function LoginScreen({navigation}) {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const isLoadingLogin = useSelector(selectIsLoadingLogin);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  function enterAsGuest() {
    navigator.navigate(ENTER_AS_GUEST);
  }

  function loginHandler(values) {
    async function registerDevice() {
      const deviceToken = await getDeviceToken();
      dispatch(loginUser({...values, deviceToken}));
    }
    registerDevice();
  }

  function gotoSetNewPasswordScreen() {
    navigator.navigate(SET_NEW_PASSWORD);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={image}>
          {isLoadingLogin ? (
            <Loader msg="Verifying Login Details..." />
          ) : (
            <Center w="100%" mt={'10%'} h="95%" maxW="100%">
              <VStack space={3} mt="50%">
                <Formik
                  validationSchema={loginValidationSchema}
                  initialValues={{username: '', password: ''}}
                  onSubmit={values => {
                    loginHandler(values);
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched,
                  }) => (
                    <>
                      <FormControl mt="5%">
                        <TextInput
                          textTitle="Enter Username"
                          icon={<Ioicons name="person-sharp" />}
                          name="username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          isInValid={errors.username && touched.username}
                          base="78%"
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
                          mt={'5%'}
                          base="78%"
                        />
                        <ErrorMessage
                          error={errors.password}
                          errosTouched={touched.password}
                        />
                        <View style={{marginTop: '2%'}}>
                          <Link
                            _text={styles.link}
                            alignSelf="flex-end"
                            ml="19%"
                            onPress={gotoSetNewPasswordScreen}>
                            Forgot Password?
                          </Link>
                        </View>
                      </FormControl>
                      <CustomButton
                        title="Login"
                        variant="solid"
                        mt="8%"
                        color="white"
                        onPress={handleSubmit}
                        disabled={!isValid}
                      />
                    </>
                  )}
                </Formik>
                <Button disabled variant={'ghost'} _text={styles.text} mt="-4%">
                  OR
                </Button>
                <CustomButton
                  title="Connect as Guest"
                  variant="outline"
                  mt="-4%"
                  onPress={enterAsGuest}
                />
                <BottomText
                  text="Don't have an account?"
                  goTo="Sign up"
                  destination={SIGNUP}
                  color={colors.cover}
                  mt="8%"
                />
              </VStack>
            </Center>
          )}
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
  link: {
    color: colors.secondary,
    fontSize: 'sm',
    fontFamily: fonts.Signika.medium,
  },
});
