/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  ScrollView,
  Card,
} from 'native-base';

//custom components
import CustomButton from '../../../components/CustomButton';

//themes
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import DateTimePicker from '@react-native-community/datetimepicker';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getNamazTimesForUser,
  selectIsLoadingNamazTimesForUser,
  selectIsLoadingUpdatedNamazTimes,
  selectNamazTimesForUser,
  updateNamazTimes,
} from '../../../redux/slices/muslim_module_slices/mosqueNamazTimingsSlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import { getMosqueById, selectMosqueById } from '../../../redux/slices/muslim_module_slices/mosqueSlice';

export default function UpdatePrayerTimes() {
  //redux
  const dispatch = useDispatch();
  const isLoadingUpdateNamaTimes = useSelector(
    selectIsLoadingUpdatedNamazTimes,
  );

  const mosqueTimes = useSelector(selectNamazTimesForUser);
  const isLoadingNamazTimes = useSelector(selectIsLoadingNamazTimesForUser);
  const user = useSelector(selectUserData);
  const mosqueById = useSelector(selectMosqueById);

  useEffect(() => {
    if (user) {
      dispatch(
        getNamazTimesForUser({mosqueId: user?.preferences?.primaryMosque}),
      );

      dispatch(getMosqueById({mosqueId: user?.preferences?.primaryMosque}));
    }
  }, [dispatch]);

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

  const fajrStartTime = useInput(new Date());
  const fajrEndTime = useInput(new Date());

  const zuhrStartTime = useInput(new Date());
  const zuhrEndTime = useInput(new Date());

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
      defaultStartTime: mosqueTimes?.fajr?.startTime,
      defaultEndTime: mosqueTimes?.fajr?.endTime,
      updatedStartTime: fajrStartTime?.text,
      updatedEndTime: fajrEndTime?.text,
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
      label: 'Zuhr',
      defaultStartTime: mosqueTimes?.zuhr?.startTime,
      defaultEndTime: mosqueTimes?.zuhr?.endTime,
      updatedStartTime: zuhrStartTime.text,
      updatedEndTime: zuhrEndTime.text,
      startShowMode: () => zuhrStartTime.showMode('time'),
      endShowMode: () => zuhrEndTime.showMode('time'),
      startShow: zuhrStartTime.show,
      endShow: zuhrEndTime.show,
      startMode: zuhrStartTime.mode,
      endMode: zuhrEndTime.mode,
      onChangeStart: zuhrStartTime.onChange,
      onChangeEnd: zuhrEndTime.onChange,
    },
    {
      key: 3,
      label: 'Asr',
      defaultStartTime: mosqueTimes?.asr?.startTime,
      defaultEndTime: mosqueTimes?.asr?.end,
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
      defaultStartTime: mosqueTimes?.maghrib?.startTime,
      defaultEndTime: mosqueTimes?.maghrib?.endTime,
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
      defaultStartTime: mosqueTimes?.isha?.startTime,
      defaultEndTime: mosqueTimes?.isha?.endTime,
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

  const updatePrayerTimes = ({fajr, zuhr, asr, maghrib, isha}) => {

    if (user) {
      dispatch(
        updateNamazTimes({
          mosqueId: user?.preferences?.primaryMosque,
          fajr,
          zuhr,
          asr,
          maghrib,
          isha,
          updatedBy: user?.username,
        }),
      );
    }
  };

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
                source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573340/religious-assistant/static_assets/clock_ic_k3h21w.png'}}
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
                <Text style={styles.boldHeading}>{mosqueById ? mosqueById?.mosqueName : 'Mosque'}</Text>
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
                    updatePrayerTimes({
                      fajr: {
                        startTime: fajrStartTime.text,
                        endTime: fajrEndTime.text,
                      },
                      zuhr: {
                        startTime: zuhrStartTime.text,
                        endTime: zuhrEndTime.text,
                      },
                      asr: {
                        startTime: asrStartTime.text,
                        endTime: asrEndTime.text,
                      },
                      maghrib: {
                        startTime: maghribStartTime.text,
                        endTime: maghribEndTime.text,
                      },
                      isha: {
                        startTime: ishaStartTime.text,
                        endTime: ishaEndTime.text,
                      },
                    });
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
