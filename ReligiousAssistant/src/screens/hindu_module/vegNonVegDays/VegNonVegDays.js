/**
 * @author Kinza
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  Box,
  Checkbox,
  ScrollView,
  FormControl,
} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import vegDays from '../../../../assets/images/vegDays_ic.png';

import CustomButton from '../../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {useEffect} from 'react';
import {
  getVegData,
  selectVegData,
  setVegData,
} from '../../../redux/slices/hindu_module_slices/vegNonVegSlice';

const VegNonVegDays = () => {
  const days = [
    {
      key: 1,
      dayName: 'Monday',
    },
    {
      key: 2,
      dayName: 'Tuesday',
    },
    {
      key: 3,
      dayName: 'Wednesday',
    },
    {
      key: 4,
      dayName: 'Thursday',
    },
    {
      key: 5,
      dayName: 'Friday',
    },
    {
      key: 6,
      dayName: 'Saturday',
    },
    {
      key: 7,
      dayName: 'Sunday',
    },
  ];

  const [vegSubscription, setVegSubscription] = useState({
    monday: vegData ? vegData?.monday : false,
    tuesday: vegData ? vegData?.tuesday : false,
    wednesday: vegData ? vegData?.wednesday : false,
    thursday: vegData ? vegData?.thursday : false,
    friday: vegData ? vegData?.friday : false,
    saturday: vegData ? vegData?.saturday : false,
    sunday: vegData ? vegData?.sunday : false,
  });

  function handlePress() {
    var today = new Date();
    const day = today.toDateString().split(' ')[0];
    console.log(day);
    // console.log(vegSubscription)
    dispatch(setVegData({username: user?.username, vegSubscription}));
  }

  const handleDayChange = (state, day) => {
    setVegSubscription(prevState => ({
      ...prevState,
      [day.dayName.toLowerCase()]: state,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        backgroundColor={colors.white}>
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
                source={vegDays}
                style={{
                  marginTop: '10%',
                  marginBottom: '5%',
                  height: 80,
                  width: 80,
                }}
                alt="icon .."
              />
            </View>
            <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
              <Heading
                color={colors.secondary}
                marginLeft="10%"
                marginTop={'5%'}>
                <Text style={{fontFamily: fonts.Signika.bold}}>Veg </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>Days</Text>
                </Heading>
              </Heading>
            </View>
          </View>

          <View
            style={{flex: 0.8, marginTop: '20%'}}
            width="95%"
            maxW="80%"
            alignItems="center">
            <Center
              width="90%"
              space={2}
              maxW="90%"
              marginLeft={'6%'}
              marginTop="8"
              marginBottom={'5%'}>
              <Heading color={colors.primary}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  {'\n'}Select your Veg Days
                </Text>
              </Heading>
              <View style={{marginTop: '4%', width: '94%'}}>
                <FormControl>
                  {days.map(day => {
                    return (
                      <Item
                        day={day}
                        key={day.id}
                        handleDayChange={handleDayChange}
                      />
                    );
                  })}
                <CustomButton
                    title="Save"
                    color="yellow"
                    mt="5%"
                    onPress={handlePress}
                  />
                </FormControl>
              </View>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>

  );
};

const Item = ({day, handleDayChange}) => {
  return (
    <Box key={day.key} style={styles.subBox} _text={styles.text} px="3">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{day.dayName}</Text>
        <Checkbox
          name="day"
          my={2}
          colorScheme="green"
          accessibilityLabel="Namaz time"
          value={day}
          defaultIsChecked={day?.value}
          onChange={v => {
            handleDayChange(v, day);
          }}
        />
      </View>
    </Box>
  );
};


export default VegNonVegDays;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  subBox: {
    backgroundColor: colors.cover,
    padding: 5,
    marginTop: '5%',
  },
});
