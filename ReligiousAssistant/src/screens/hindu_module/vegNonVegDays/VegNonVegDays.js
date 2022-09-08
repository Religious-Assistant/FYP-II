/**
 * @author Kinza
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  Input,
} from 'native-base';

//images
import vegDays from '../../../../assets/images/vegDays_ic.png';

//custom components
import CustomButton from '../../../components/CustomButton';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//reducer
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {
  getVegData,
  selectVegData,
  setVegData,
} from '../../../redux/slices/hindu_module_slices/vegNonVegSlice';

const VegNonVegDays = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const vegData = useSelector(selectVegData);

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
    dispatch(getVegData({username: user?.username}));
  }, [dispatch]);

  const days = [
    {
      key: 1,
      dayName: 'Monday',
      value: vegData?.monday,
    },
    {
      key: 2,
      dayName: 'Tuesday',
      value: vegData?.tuesday,
    },
    {
      key: 3,
      dayName: 'Wednesday',
      value: vegData?.wednesday,
    },
    {
      key: 4,
      dayName: 'Thursday',
      value: vegData?.thursday,
    },
    {
      key: 5,
      dayName: 'Friday',
      value: vegData?.friday,
    },
    {
      key: 6,
      dayName: 'Saturday',
      value: vegData?.saturday,
    },
    {
      key: 7,
      dayName: 'Sunday',
      value: vegData?.sunday,
    },
  ];
  const [daysData, setDaysData] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  function handlePress() {
    var today = new Date();
    const day = today.toDateString().split(' ')[0];
    //console.log(day)
    const data = JSON.stringify(daysData);
    console.log(data);
  }
  const update = (state, day) => {
    //console.log(state, day);
    setDaysData(prevState => ({
      ...prevState,
      [day]: state,
    }));

    let vegSubscription = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };

    function handlePress() {
      dispatch(setVegData({username: user?.username, vegSubscription}));
    }

    const handleDayChange = (value, day) => {
      let targetDat = day.dayName.toLowerCase();
      vegSubscription[targetDat] = value;
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
                    {days.map((day, index) => {
                      return (
                        <Box
                          key={day.key}
                          style={styles.subBox}
                          _text={styles.text}
                          shadow={3}
                          px="3">
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.text}>{day.dayName}</Text>
                            <Checkbox
                              value={day.dayName}
                              name="day"
                              my={2}
                              colorScheme="green"
                              accessibilityLabel="Namaz time"
                              onChange={state => {
                                update(state, day.dayName);
                              }}></Checkbox>
                          </View>
                        </Box>
                        //   <Item
                        //   day={day}
                        //   key={day.id}
                        //   handleDayChange={handleDayChange}
                        // />
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
