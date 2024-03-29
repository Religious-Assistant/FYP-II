/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {ImageBackground, Dimensions, View, StyleSheet} from 'react-native';
import {Center, Box, VStack, FormControl, Select, CheckIcon} from 'native-base';

import {Formik} from 'formik';

//theme
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

//custom components
import CustomButton from '../../components/CustomButton';
import BottomText from '../../components/BottomText';

//navigation
import {
  LOGIN,
  REGISTERED_HINDU_DASHBOARD_STACK,
  REGISTERED_MUSLIM_DASHBOARD_STACK,
  SIGNUP,
} from '../../navigation/constants';

import {useNavigation} from '@react-navigation/native';

export default function ConnectAsGuest() {
  const navigator = useNavigation();

  function connectAsGuestHandler(values) {
    const {religion} = values;

    if (religion == 1) {
      navigator.navigate(REGISTERED_MUSLIM_DASHBOARD_STACK);
    } else {
      navigator.navigate(REGISTERED_HINDU_DASHBOARD_STACK);
    }
  }

  return (
    <View style={styles.flexRatio}>
      <ImageBackground
        style={styles.image}
        source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665685997/religious-assistant/static_assets/connectAsGuest_bg_elvqc7.png'}}>
        <Center w="100%" mt={'20%'}>
          <Box safeArea p="1%" w="90%" maxW="82%" py="7%" mt="20%">
            <Formik
              initialValues={{
                religion: 1,
              }}
              onSubmit={values => {
                connectAsGuestHandler(values);
              }}>
              {({handleSubmit, values, setFieldValue}) => (
                <>
                  <VStack mt="20%" space={3} _text={styles.text}>
                    <FormControl>
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
                  </VStack>
                  <CustomButton
                    title="Connect as guest"
                    variant="solid"
                    mt="5%"
                    onPress={handleSubmit}
                    color={colors.white}
                  />
                </>
              )}
            </Formik>
            <BottomText
              text="Do you want to register?"
              goTo="Sign up"
              color={colors.white}
              destination={SIGNUP}
              mt="25%"
            />
            <BottomText
              text="Already have an account?"
              goTo="Login"
              color={colors.white}
              destination={LOGIN}
              mt="10%"
            />
          </Box>
        </Center>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  flexRatio: {
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
});
