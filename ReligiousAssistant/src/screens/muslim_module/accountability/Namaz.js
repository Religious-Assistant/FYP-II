/**
 * @author Kinza Kiran && Nadir
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider, Button, Text, Checkbox} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//moment
import moment from 'moment';

//calendar
import CalendarPicker from 'react-native-calendar-picker';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getNamazAccountability,
  selectAccountabilityData,
  selectIsLoadingGetAccountabilityData,
  selectIsLoadingUpdateAccountability,
  updateNamazAccountability,
} from '../../../redux/slices/muslim_module_slices/namazAccountabilitySlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';

//custom component
import Loader from '../../common/Loader';

export default function Namaz() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const accountabilityData = useSelector(selectAccountabilityData);
  const isLoadingUpdateAccountability = useSelector(
    selectIsLoadingUpdateAccountability,
  );

  const isLoadingGetAccountabilityData = useSelector(
    selectIsLoadingGetAccountabilityData,
  );

  useEffect(() => {
    if (user) {
      dispatch(
        getNamazAccountability({
          username: user?.username,
          date: moment(selectedDate).format('YYYY-MM-DD'),
        }),
      );
    }
  }, [dispatch]);

  const namazData = [
    {
      key: 1,
      namazName: 'Fajr',
      value: accountabilityData?accountabilityData?.fajr:false,
    },
    {
      key: 2,
      namazName: 'Zuhr',
      value: accountabilityData?accountabilityData?.zuhr:false,
    },
    {
      key: 3,
      namazName: 'Asr',
      value: accountabilityData?accountabilityData?.asr:false,
    },
    {
      key: 4,
      namazName: 'Maghrib',
      value: accountabilityData?accountabilityData?.maghrib:false,
    },
    {
      key: 5,
      namazName: 'Isha',
      value: accountabilityData?accountabilityData?.isha:false,
    },
  ];

  console.log(accountabilityData)
  const [dayNamazTimes, setDayNamazTimes] = useState({
    fajr: accountabilityData?accountabilityData?.fajr:false,
    zuhr: accountabilityData?accountabilityData?.zuhr:false,
    asr: accountabilityData?accountabilityData?.asr:false,
    maghrib: accountabilityData?accountabilityData?.maghrib:false,
    isha: accountabilityData?accountabilityData?.isha:false,
  });

  const [selectedDate, setSelectedDate] = useState(Date('DD-MM-YYYY'));

  function onDateChange(date) {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    dispatch(
      getNamazAccountability({
        username: user?.username,
        date: moment(date).format('YYYY-MM-DD'),
      }),
    );
  }

  const handleChange = (value, time) => {
    console.log("     ------",value, "  ",time)
    if (time) {
      console.log(dayNamazTimes)
      setDayNamazTimes(prev =>({...prev, [time.toLowerCase()]: value}));
    }
  };

  async function handleSaveNamazAccountability() {


    if (user) {
      dispatch(
        updateNamazAccountability({
          username: user?.username,
          date: moment(selectedDate).format('YYYY-MM-DD'),
          namazInfo: dayNamazTimes,
        }),
      );
        setDayNamazTimes({
          fajr: false,
          zuhr: false,
          asr: false,
          maghrib: false,
          isha: false,
        })
    }
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        previousTitle="Previous"
        nextTitle="Next"
        previousTitleStyle={{
          fontFamily: fonts.Signika.medium,
        }}
        nextTitleStyle={{
          fontFamily: fonts.Signika.medium,
        }}
        dayShape="circle" //circle
        onDateChange={onDateChange}
        selectedDayColor={colors.secondary}
        todayBackgroundColor={colors.primary}
        todayTextStyle={{color: 'white'}}
      />
      {isLoadingUpdateAccountability || isLoadingGetAccountabilityData ? (
        <Loader msg="Updating or Getting Namaz performance" />
      ) : (
        <>
          <Box style={styles.mainBox} rounded="lg">
            <VStack space="1.5" divider={<Divider />}>
              {namazData?.map((namaz, index) => {
                return (
                  <NamazTimes
                    time={namaz.namazName}
                    value={namaz.value}
                    key={index}
                    selectedDate={selectedDate}
                    handleChange={handleChange}
                  />
                );
              })}
            </VStack>
          </Box>
          <Button
            w={{
              base: '29%',
            }}
            _text={{
              fontSize: 'md',
              fontFamily: fonts.Signika.medium,
              color: colors.white,
            }}
            style={{alignSelf: 'flex-end', right: 10, top: 4}}
            colorScheme="yellow"
            variant="solid"
            onPress={handleSaveNamazAccountability}>
            Save
          </Button>
        </>
      )}
    </View>
  );
}

function NamazTimes({time, value, handleChange, selectedDate}) {
  console.log(selectedDate,value)
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.date}>
        {moment(selectedDate).format('DD-MM-YYYY')}
      </Text>
      <Checkbox
        name="time"
        value={time}
        my={2}
        colorScheme="green"
        accessibilityLabel="Namaz time"
        defaultIsChecked={value}
        onChange={state => {
          handleChange(state, time);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  time: {
    fontSize: 18,
    fontFamily: fonts.Signika.regular,
  },
  date: {
    fontSize: 18,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    alignSelf: 'center',
    width: '94%',
    backgroundColor: colors.cover,
    padding: 8,
    marginTop: 15,
  },
});
