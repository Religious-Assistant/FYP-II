/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  ScrollView,
  Card,
} from 'native-base';

import clockIcon from '../../../../assets/images/clock_ic.png';
import CustomButton from '../../../components/CustomButton';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {useState} from 'react';
import {Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UpdatePrayerTimes() {
  function useInput() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const onChange = (event, selectedDate) => {
      const currDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currDate);

      let tempDate = new Date(currDate);
      let fTime = tempDate.toLocaleTimeString();
      //let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
      setText(fTime);
      console.log(fTime);
    };
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
    return {
      showMode,
      onChange,
      date,
      text,
      show,
      mode,
    };
  }
  const fajr = useInput(new Date());
  const duhr = useInput(new Date());
  const asr = useInput(new Date());
  const maghrib = useInput(new Date());
  const isha = useInput(new Date());

  const data = [
    {
      key: 1,
      label: 'Fajr',
      defaultTime: '5:00 am',
      updatedTime: fajr.text,
      showMode: () => fajr.showMode('time'),
      show: fajr.show,
      mode: fajr.mode,
      onChange: fajr.onChange,
    },
    {
      key: 2,
      label: 'Duhr',
      defaultTime: '2:00 pm',
      updatedTime: duhr.text,
      showMode: () => duhr.showMode('time'),
      show: duhr.show,
      mode: duhr.mode,
      onChange: duhr.onChange,
    },
    {
      key: 3,
      label: 'Asr',
      defaultTime: '5:00 pm',
      updatedTime: asr.text,
      showMode: () => asr.showMode('time'),
      show: asr.show,
      mode: asr.mode,
      onChange: asr.onChange,
    },
    {
      key: 4,
      label: 'Maghrib',
      defaultTime: '7:00 pm',
      updatedTime: maghrib.text,
      showMode: () => maghrib.showMode('time'),
      show: maghrib.show,
      mode: maghrib.mode,
      onChange: maghrib.onChange,
    },
    {
      key: 5,
      label: 'Isha',
      defaultTime: '9:00 pm',
      updatedTime: isha.text,
      showMode: () => isha.showMode('time'),
      show: isha.show,
      mode: isha.mode,
      onChange: isha.onChange,
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        backgroundColor={colors.white}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          {/* Header */}
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
                source={clockIcon}
                style={{
                  marginTop: '10%',
                  marginRight: '5%',
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
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  Update Namaz{' '}
                </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    {'\n'}Times
                  </Text>
                </Heading>
              </Heading>
            </View>
          </View>
          <View style={{flex: 0.83}} width="95%" alignItems="center">
            <Center
              width="95%"
              space={2}
              maxW="95%"
              marginTop={'33%'}
              marginLeft={'5%'}
              marginBottom={'5%'}>
              <VStack space={3} w="100%" marginTop={'10%'}>
                <Text style={styles.boldHeading}>Mosque Name</Text>
                {data ? (
                  data.map(itm => {
                    return (
                      <Card
                        key={itm.key}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '3%',
                          backgroundColor: colors.cover,
                          elevation: 0.0,
                        }}>
                        <Text style={styles.label}>{itm.label}</Text>
                        <Text style={styles.secondHeading}>
                          {itm.updatedTime ? itm.updatedTime : itm.defaultTime}
                        </Text>
                        <MaterialCommunityIcons
                          name="clock-edit"
                          size={36}
                          color={colors.primary}
                          onPress={itm.showMode}
                        />
                        {itm.show && (
                          <DateTimePicker
                            value={new Date()}
                            mode={itm.mode}
                            is24Hour={false}
                            display="default"
                            onChange={itm.onChange}
                          />
                        )}
                      </Card>
                    );
                  })
                ) : (
                  <></>
                )}

                <CustomButton
                  title={'Update Namaz Times'}
                  mt="5%"
                  onPress={() => {
                    console.log(
                      'Fajr:',
                      fajr.text,
                      ' Duhr:',
                      duhr.text,
                      ' Asr:',
                      asr.text,
                      ' Maghrib:',
                      maghrib.text,
                      ' Isha:',
                      isha.text,
                    );
                  }}
                />
              </VStack>
            </Center>
          </View>
        </View>
      </ScrollView>
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
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    marginTop: '3%',
    padding: 5,
    color: colors.tertiary,
  },
  boldHeading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 23,
    padding: 5,
    color: colors.primary,
    alignSelf: 'center',
  },
  secondHeading: {
    fontFamily: fonts.Signika.regular,
    fontSize: 19,
    padding: 5,
    marginTop: '3%',
    color: colors.info,
  },

  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 15,
    padding: 5,
    marginTop: '-4%',
    color: colors.primary,
  },
});
