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
import {Center, VStack, FormControl, Link, Button, Checkbox} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Formik} from 'formik';
import * as yup from 'yup';

import Ioicons from 'react-native-vector-icons/Ionicons';
import fonts from '../theme/fonts';
import colors from '../theme/colors';

import CustomButton from '../components/CustomButton';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import BottomText from '../components/BottomText';
import ErrorMessage from '../components/ErrorMessage';
import image from '../../assets/images/login_bg.png';

import {useNavigation} from '@react-navigation/native';
import {
  ENTER_AS_GUEST,
  REGISTERED_HINDU_DASHBOARD_STACK,
  REGISTERED_MUSLIM_DASHBOARD_STACK,
  SIGNUP,
} from '../navigation/constants';

//Services
// import { loginUser } from '../services/apis/AuthService';
import {apiPOST} from '../services/apis/AuthService'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../redux/slices/authSlice';

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().min(8).required('Password is required'),
});

export default function LoginScreen({navigation}) {
  
  const navigator = useNavigation();

  const dispatch=useDispatch()
  const token=useSelector(state=>state.user.token)
  console.log('Token is: ', token)

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
    
  }, [navigation, token]);

  function enterAsGuest() {
    navigator.navigate(ENTER_AS_GUEST);
  }

  function loginHandler(values) {

    dispatch(loginUser(values))
    // apiPOST('loginUser',values).then(resp=>{
    //   if(resp.success && resp.data.religion===1){
    //     navigator.navigate(REGISTERED_MUSLIM_DASHBOARD_STACK);        
    //   }
    //   else if(resp.success && resp.data.religion==0){
    //     navigator.navigate(REGISTERED_HINDU_DASHBOARD_STACK);
    //   }
    //   else{
    //     alert("Invalid credentials")
    //   }
    // })

    // loginUser(values).then(resp=>resp.json()).then(resp=>{
    //   if(resp.success && resp.data.religion===1){
    //     navigator.navigate(REGISTERED_MUSLIM_DASHBOARD_STACK);        
    //   }
    //   else if(resp.success && resp.data.religion==0){
    //     navigator.navigate(REGISTERED_HINDU_DASHBOARD_STACK);
    //   }
    //   else{
    //     alert("Invalid credentials")
    //   }
    // }).catch(error=>{
    //   console.log(error)
    // })
  
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={image}>
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
                      />
                      <ErrorMessage
                        error={errors.password}
                        errosTouched={touched.password}
                      />
                      <View style={{flexDirection: 'row', marginTop: '2%'}}>
                        <Checkbox
                          alignSelf="flex-start"
                          _text={styles.link}
                          value="info"
                          colorScheme="info">
                          Remember me
                        </Checkbox>
                        <Link _text={styles.link} alignSelf="flex-end" ml="19%">
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
  errorText: {
    fontSize: 10,
    color: colors.error,
    fontFamily: fonts.Signika.bold,
  },
});
