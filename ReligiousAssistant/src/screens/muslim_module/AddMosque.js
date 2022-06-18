/* @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center, FormControl} from 'native-base';

import {Formik} from 'formik';
import * as yup from 'yup';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import timeICon from '../../../assets/images/rakah_ic.png';
import TextInput from '../../components/TextInput';
import CustomButton from '../../components/CustomButton';

const addMosqueValidationSchema = yup.object().shape({
  mosqueName: yup.string(),
  location: yup.string(),
});

export default function AddMosque() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View
          style={{
            flex: 0.17,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Image
              source={timeICon}
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginBottom: '5%',
                height: 100,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Add </Text>
              <Heading color={colors.white}>
                <Text style={{fontFamily: fonts.Signika.bold}}>Mosque</Text>
              </Heading>
            </Heading>
          </View>
        </View>
        <View style={{flex: 0.83}} width="95%">
          <Center
            width="88%"
            space={2}
            maxW="88%"
            marginTop={'35%'}
            marginLeft={'8%'}
            marginBottom={'5%'}>
            <FormControl mt={'12%'}>
              <TextInput
                textTitle="Enter Mosque Name"
                mt="50%"
                icon={<MaterialCommunityIcons name="mosque" />}
              />
              <TextInput
                textTitle="Location"
                mt="5%"
                icon={<Entypo name="location" />}
              />
              <CustomButton
                title="Add Mosque"
                variant="solid"
                mt="8%"
                color="white"
                base="99%"
              />
            </FormControl>
          </Center>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});
