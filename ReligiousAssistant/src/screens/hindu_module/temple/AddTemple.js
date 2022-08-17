/* @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import templeICon from '../../../../assets/images/temple2_ic.png';
import TextInput from '../../../components/TextInput';
import CustomButton from '../../../components/CustomButton';

import {useNavigation} from '@react-navigation/native';

import {ADD_TEMPLE, GOOGLE_MAP} from '../../../navigation/constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import Loader from '../../common/Loader';
import { addTemple, selectIsLoadingAddNewTemple, selectNewAddedTemple } from '../../../redux/slices/hindu_module_slices/templeSlice';

export default function AddTemple({route}) {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const isLoadingAddNewTemple = useSelector(selectIsLoadingAddNewTemple);
  const newTemple = useSelector(selectNewAddedTemple);

  const [templeName, setTempleename] = useState('');

  function openMap() {
    navigator.navigate(GOOGLE_MAP, {screen: ADD_TEMPLE});
  }

  function changeHandler(text) {
    setTempleename(text);
  }

  function addNewTemple() {
    if (route && templeName && userData) {
      dispatch(
        addTemple({
          longitude: route.params.longitude,
          latitude: route.params.latitude,
          templeName,
          addedBy: userData.username,
        }),
      );

      if (newTemple) {
        console.log(newTemple);
      }
    } else {
      alert('Location and Name required');
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
              source={templeICon}
              style={{
                marginTop: '10%',
                marginRight: '-5%',
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
                <Text style={{fontFamily: fonts.Signika.bold}}>Temple</Text>
              </Heading>
            </Heading>
          </View>
        </View>
        <View style={{flex: 0.83}} width="95%">
          {!isLoadingAddNewTemple ? (
            <Center
              width="88%"
              space={2}
              maxW="88%"
              marginTop={'35%'}
              marginLeft={'8%'}
              marginBottom={'5%'}>
              <TextInput
                textTitle="Enter Temple Name"
                mt="50%"
                icon={<MaterialCommunityIcons name="mosque" />}
                onChangeText={changeHandler}
              />

              <CustomButton
                title="Select Location"
                variant="solid"
                mt="8%"
                color={colors.white}
                base="99%"
                onPress={() => {
                  openMap();
                }}
              />
              {route?.params ? (
                <Text mt={5} fontFamily={fonts.Signika.bold}>
                  {`Longitude: ${route.params?.longitude}\n Latitude: ${route.params?.latitude}`}
                </Text>
              ) : (
                <></>
              )}
              <CustomButton
                title="Add Temple"
                variant="solid"
                mt="8%"
                color="white"
                base="99%"
                onPress={addNewTemple}
              />
            </Center>
          ) : (
            <Loader msg="Adding New Temple" />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
