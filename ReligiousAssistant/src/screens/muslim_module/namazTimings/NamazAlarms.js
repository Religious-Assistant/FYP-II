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
import moment from 'moment';

export default function NamazAlarms() {
  
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
      setText(fTime);
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

  const fajrTime = useInput(new Date());
  const duhrTime = useInput(new Date());
  const asrTime = useInput(new Date());
  const maghribTime = useInput(new Date());
  const ishaTime = useInput(new Date());

  const data = [
    {
      key: 1,
      label: 'Fajr',
      defaultTime: moment(Date.now()).format("hh:mm:ss a"),
      updatedTime: fajrTime.text,
      showMode: () => fajrTime.showMode('time'),
      show: fajrTime.show,
      mode: fajrTime.mode,
      onChange: fajrTime.onChange,
    },
    {
      key: 2,
      label: 'Duhr',
      defaultTime: moment(Date.now()).format("hh:mm:ss a"),
      updatedTime: duhrTime.text,
      showMode: () => duhrTime.showMode('time'),
      show: duhrTime.show,
      mode: duhrTime.mode,
      onChange: duhrTime.onChange,
    },
    {
      key: 3,
      label: 'Asr',
      defaultTime: moment(Date.now()).format("hh:mm:ss a"),
      updatedTime: asrTime.text,
      showMode: () => asrTime.showMode('time'),
      show: asrTime.show,
      mode: asrTime.mode,
      onChange: asrTime.onChange,
    },
    {
      key: 4,
      label: 'Maghrib',
      defaultTime: moment(Date.now()).format("hh:mm:ss a"),
      updatedTime: maghribTime.text,
      showMode: () => maghribTime.showMode('time'),
      show: maghribTime.show,
      mode: maghribTime.mode,
      onChange: maghribTime.onChange,
    },
    {
      key: 5,
      label: 'Isha',
      defaultTime: moment(Date.now()).format("hh:mm:ss a"),
      updatedTime: ishaTime.text,
      showMode: () => ishaTime.showMode('time'),
      show: ishaTime.show,
      mode: ishaTime.mode,
      onChange: ishaTime.onChange,
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
                  Set Prayer{' '}
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
              marginTop={'26%'}
              marginLeft={'5%'}
              marginBottom={'5%'}>
              <VStack space={3} w="100%" marginTop={'10%'}>
                <Text style={styles.boldHeading}>
                  You can set Prayer Times to get Namaz Notifications
                </Text>
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
                          style={{alignSelf: 'center'}}
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
                    console.log('Fajr: ', fajrTime.text);
                    console.log('Duhr: ', duhrTime.text);
                    console.log('Asr: ', asrTime.text);
                    console.log('Maghrib: ', maghribTime.text);
                    console.log('Isha: ', ishaTime.text);
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
    fontSize: 22,
    marginTop: '2%',
    padding: 5,
    color: colors.tertiary,
  },
  boldHeading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 18,
    padding: 5,
    color: colors.primary,
    alignSelf: 'center',
  },
  secondHeading: {
    fontFamily: fonts.Signika.regular,
    fontSize: 19,
    padding: 5,
    color: colors.info,
    alignSelf: 'center',
  },

  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 13,
    padding: 5,
    marginTop: '-4%',
    marginBottom: '-10%',
    color: colors.primary,
    alignSelf: 'center',
  },
});
