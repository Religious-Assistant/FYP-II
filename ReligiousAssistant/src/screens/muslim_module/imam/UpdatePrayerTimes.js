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
      //console.log(fTime);
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
  const fajrStartTime = useInput(new Date());
  const fajrEndTime = useInput(new Date());
  
  const duhrStartTime = useInput(new Date());
  const duhrEndTime = useInput(new Date());

  const asrStartTime = useInput(new Date());
  const asrEndTime = useInput(new Date());

  const maghribStartTime = useInput(new Date());
  const maghribEndTime = useInput(new Date());

  const ishaStartTime = useInput(new Date());
  const ishaEndTime = useInput(new Date());

  const data = [
    {
      key: 1,
      label: 'Fajr',
      defaultStartTime: '4:30:00 am',
      defaultEndTime: '5:30:00 am',
      updatedStartTime: fajrStartTime.text,
      updatedEndTime: fajrEndTime.text,
      startShowMode: () => fajrStartTime.showMode('time'),
      endShowMode: () => fajrEndTime.showMode('time'),
      startShow: fajrStartTime.show,
      endShow: fajrEndTime.show,
      startMode: fajrStartTime.mode,
      endMode: fajrEndTime.mode,
      onChangeStart: fajrStartTime.onChange,
      onChangeEnd: fajrEndTime.onChange,
    },
    {
      key: 2,
      label: 'Duhr',
      defaultStartTime: '2:00:00 pm',
      defaultEndTime: '3:00:00 pm',
      updatedStartTime: duhrStartTime.text,
      updatedEndTime: duhrEndTime.text,
      startShowMode: () => duhrStartTime.showMode('time'),
      endShowMode: () => duhrEndTime.showMode('time'),
      startShow: duhrStartTime.show,
      endShow: duhrEndTime.show,
      startMode: duhrStartTime.mode,
      endMode: duhrEndTime.mode,
      onChangeStart: duhrStartTime.onChange,
      onChangeEnd: duhrEndTime.onChange,
    },
    {
      key: 3,
      label: 'Asr',
      defaultStartTime: '5:00:00 pm',
      defaultEndTime: '5:45:00 pm',
      updatedStartTime: asrStartTime.text,
      updatedEndTime: asrEndTime.text,
      startShowMode: () => asrStartTime.showMode('time'),
      endShowMode: () => asrEndTime.showMode('time'),
      startShow: asrStartTime.show,
      endShow: asrEndTime.show,
      startMode: asrStartTime.mode,
      endMode: asrEndTime.mode,
      onChangeStart: asrStartTime.onChange,
      onChangeEnd: asrEndTime.onChange,
    },
    
    {
      key: 4,
      label: 'Maghrib',
      defaultStartTime: '7:00:00 pm',
      defaultEndTime: '8:45:00 pm',
      updatedStartTime: maghribStartTime.text,
      updatedEndTime: maghribEndTime.text,
      startShowMode: () => maghribStartTime.showMode('time'),
      endShowMode: () => maghribEndTime.showMode('time'),
      startShow: maghribStartTime.show,
      endShow: maghribEndTime.show,
      startMode: maghribStartTime.mode,
      endMode: maghribEndTime.mode,
      onChangeStart: maghribStartTime.onChange,
      onChangeEnd: maghribEndTime.onChange,
    },
    
    {
      key: 5,
      label: 'Isha',
      defaultStartTime: '9:00:00 pm',
      defaultEndTime: '12:00:00 pm',
      updatedStartTime: ishaStartTime.text,
      updatedEndTime: ishaEndTime.text,
      startShowMode: () => ishaStartTime.showMode('time'),
      endShowMode: () => ishaEndTime.showMode('time'),
      startShow: ishaStartTime.show,
      endShow: ishaEndTime.show,
      startMode: ishaStartTime.mode,
      endMode: ishaEndTime.mode,
      onChangeStart: ishaStartTime.onChange,
      onChangeEnd: ishaEndTime.onChange,
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
                        <View>
                          <MaterialCommunityIcons
                            name="clock-edit"
                            size={36}
                            color={colors.primary}
                            onPress={itm.startShowMode}
                            style={{alignSelf: 'center'}}
                          />
                          <Text style={styles.info}>Start Time</Text>

                          <Text style={styles.secondHeading}>
                            {itm.updatedStartTime
                              ? itm.updatedStartTime
                              : itm.defaultStartTime}
                          </Text>
                        </View>
                        {itm.startShow && (
                          <DateTimePicker
                            value={new Date()}
                            mode={itm.startMode}
                            is24Hour={false}
                            display="default"
                            onChange={itm.onChangeStart}
                          />
                        )}
                        <View style={{justifyContent: 'center'}}>
                          <MaterialCommunityIcons
                            name="clock-edit"
                            size={36}
                            color={colors.primary}
                            onPress={itm.endShowMode}
                            style={{alignSelf: 'center'}}
                          />
                          <Text style={styles.info}>End Time</Text>

                          <Text style={styles.secondHeading}>
                            {itm.updatedEndTime
                              ? itm.updatedEndTime
                              : itm.defaultEndTime}
                          </Text>
                        </View>
                        {itm.endShow && (
                          <DateTimePicker
                            value={new Date()}
                            mode={itm.endMode}
                            is24Hour={false}
                            display="default"
                            onChange={itm.onChangeEnd}
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
                    console.log("Fajr: ",fajrStartTime.text," ",fajrEndTime.text );
                    
                    console.log("Duhr: ",duhrStartTime.text," ",duhrEndTime.text );
                    console.log("Asr: ",asrStartTime.text," ",asrEndTime.text );
                    console.log("Maghrib: ",maghribStartTime.text," ",maghribEndTime.text );
                    console.log("Isha: ",ishaStartTime.text," ",ishaEndTime.text );
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
    fontSize: 23,
    marginTop: '10%',
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
