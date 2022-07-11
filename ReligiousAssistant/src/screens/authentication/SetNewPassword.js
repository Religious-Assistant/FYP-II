/**
 * @author Kinza
 * @version 1.0
 *
 */

import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {Center, VStack, FormControl} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ioicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../../components/CustomButton';
import PasswordInput from '../../components/PasswordInput';
import ErrorMessage from '../../components/ErrorMessage';
import TextInput from '../../components/TextInput';
import Loader from '../common/Loader';

import {Formik} from 'formik';
import * as yup from 'yup';

//Navigation
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../navigation/constants';

//theme
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import image from '../../../assets/images/setPassword_bg.png';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPassword,
  selectHasRecoveredForgetPassword,
  selectIsLoadingForgotPassword,

} from '../../redux/slices/auth_slices/authSlice';


const loginValidationSchema = yup.object().shape({
  newPassword: yup.string().min(8).required('Password is required'),
});

export default function SetNewPassword() {
  const navigator = useNavigation();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingForgotPassword);
  const recovered = useSelector(selectHasRecoveredForgetPassword);

  function backToLogin() {
    navigator.navigate(LOGIN);
  }

  function resetPassword(values) {
    dispatch(forgotPassword(values));
    console.log(recovered);
    if (recovered) {
      navigator.navigate(LOGIN);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={image}>
          {isLoading ? (
            <Loader msg="Updating Password" />
          ) : (
            <Center w="100%" h="95%" maxW="100%">
              <VStack space={3} mt="25%">
                <Formik
                  validationSchema={loginValidationSchema}
                  initialValues={{username: '', newPassword: ''}}
                  onSubmit={values => {
                    resetPassword(values);
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
                          textTitle="Username"
                          name="username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          mt={'5%'}
                          icon={<Ioicons name="person-sharp" />}
                          base="78%"
                        />
                        <PasswordInput
                          textTitle="Enter New Password"
                          name="newPassword"
                          onChangeText={handleChange('newPassword')}
                          onBlur={handleBlur('newPassword')}
                          value={values.newPassword}
                          isInValid={errors.newPassword && touched.newPassword}
                          mt={'5%'}
                          base="78%"
                        />
                        <ErrorMessage
                          error={errors.newPassword}
                          errosTouched={touched.newPassword}
                        />
                      </FormControl>
                      <CustomButton
                        title="Rest Password"
                        variant="solid"
                        mt="8%"
                        color="white"
                        onPress={handleSubmit}
                        disabled={!isValid}
                      />
                      <CustomButton
                        title="Back to Login Password"
                        variant="solid"
                        mt="8%"
                        color="white"
                        onPress={backToLogin}
                        disabled={!isValid}
                      />
                    </>
                  )}
                </Formik>
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
  errorText: {
    fontSize: 10,
    color: colors.error,
    fontFamily: fonts.Signika.bold,
  },
});
