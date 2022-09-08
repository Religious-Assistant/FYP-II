/**
 * @author Nadir Hussain && Kinza
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center, Text} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//images
import mosqueICon from '../../../../assets/images/rakah_ic.png';

//custom components
import TextInput from '../../../components/TextInput';
import CustomButton from '../../../components/CustomButton';

//navigation
import {useNavigation} from '@react-navigation/native';
import {ADD_MOSQUE, GOOGLE_MAP} from '../../../navigation/constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {
  addMosque,
  selectIsLoadingAddNewMosque,
  selectNewAddedMosque,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';

import Loader from '../../common/Loader';

export default function AddMosque({route, navigation}) {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const isLoadingAddNewMosque = useSelector(selectIsLoadingAddNewMosque);
  const newMosque = useSelector(selectNewAddedMosque);

  const [mosqueName, setMosquename] = useState('');

  function openMap() {
    navigator.navigate(GOOGLE_MAP, {screen: ADD_MOSQUE});
  }

  function changeHandler(text) {
    setMosquename(text);
  }

  function addNewMosque() {
    if (route && mosqueName && userData) {
      dispatch(
        addMosque({
          longitude: route.params.longitude,
          latitude: route.params.latitude,
          mosqueName,
          addedBy: userData.username,
        }),
      );
      
      if(newMosque){
        console.log(newMosque)
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
          {!isLoadingAddNewMosque ? (
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
                title="Add Mosque"
                variant="solid"
                mt="8%"
                color="white"
                base="99%"
                onPress={addNewMosque}
              />
            </Center>
          ) : (
            <Loader msg="Adding New Mosque" />
          )}
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
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});
