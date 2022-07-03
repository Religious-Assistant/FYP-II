/* @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center, Text} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import mosqueICon from '../../../assets/images/rakah_ic.png';
import TextInput from '../../components/TextInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

import Map from '../../components/Map';
import { GOOGLE_MAP } from '../../navigation/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../redux/slices/auth_slices/authSlice';

export default function AddMosque({route,navigation}) {

  const navigator=useNavigation()
  const dispatch=useDispatch()
  
  const userData=useSelector(selectUserData)


  const defaultParams={
    latitude:0,
    longitude:0
  }
  const { latitude, longitude } = route.params?route.params:defaultParams

  const[mosqueName,setMosquename]=useState('')

  useEffect(()=>{
    console.log(latitude,longitude)
  },[])

  function openMap(){
    navigator.navigate(GOOGLE_MAP)
  }

  function changeHandler(text){
    setMosquename(text)
  }

  function addMosque(){

    console.log(userData)
    if(longitude!=0 && latitude!=0 && mosqueName && userData){


    }
    else{
      alert("Location and Name required")
    }

  }

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
              source={mosqueICon}
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
            <TextInput
              textTitle="Enter Mosque Name"
              mt="50%"
              icon={<MaterialCommunityIcons name="mosque"
              />
            }
            onChangeText={changeHandler}
            />
            
            <CustomButton title="Select Location"
                      variant="outline"
                      mt="8%"
                      color={colors.primary}
                      base="99%"
                      colorscheme="lightBlue.900"
                      onPress={()=>{
                        openMap()
                      }}
                />
            {
              longitude!=0?<Text mt={5} fontFamily={fonts.Signika.bold}>Longitude: {longitude}</Text>:<></>
            }
                        {
              latitude!=0?<Text mt={5} fontFamily={fonts.Signika.bold}>Latitude: {latitude}</Text>:<></>
            }
            <CustomButton title="Add Mosque"
                      variant="solid"
                      mt="8%"
                      color="white"
                      base="99%"
                      onPress={addMosque}
                />

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