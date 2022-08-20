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
  Input,
} from 'native-base';

// import {Formik} from 'formik';
// import * as yup from 'yup';
import vegDays from '../../../../assets/images/vegDays_ic.png';
import CustomButton from '../../../components/CustomButton';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

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
          <View style={{flex: 0.8}} width="95%" maxW="80%" alignItems="center">
            <Center
              width="90%"
              space={2}
              maxW="90%"
              marginTop={'35%'}
              marginLeft={'6%'}
              marginBottom={'5%'}>
              <Heading color={colors.primary}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  {'\n'}Select your Veg Days
                </Text>
              </Heading>
              <View style={{marginTop: '15%', width: '94%'}}>
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

const Example = () => {
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <Checkbox.Group
      onChange={setGroupValues}
      value={groupValues}
      accessibilityLabel="choose numbers">
      <Checkbox value="one" my={2}>
        UX Research
      </Checkbox>
      <Checkbox value="two">Software Development</Checkbox>
      <Text>{groupValues}</Text>
    </Checkbox.Group>
  );
};

export default VegNonVegDays;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: colors.white,
    marginTop: '31%',
    fontFamily: fonts.Signika.regular,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    border: 1,
    borderWidth: 4,
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  subBox: {
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginTop: '5%',
  },
  buttonStyle: {
    w: {
      base: '20%',
    },
    _text: {
      fontSize: 'md',
      fontFamily: fonts.Signika.medium,
      color: colors.white,
    },
    colorScheme: 'yellow',
    variant: 'solid',
  },
});
