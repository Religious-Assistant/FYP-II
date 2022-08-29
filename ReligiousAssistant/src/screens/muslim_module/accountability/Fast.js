/**
 * @author Kinza Kiran && Nadir
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, Button, Text} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {
  getFastAccountability,
  selectAccountabilityData,
  selectIsLoadingGetAccountabilityData,
  selectIsLoadingUpdateAccountability,
  updateFastAccountability,
} from '../../../redux/slices/muslim_module_slices/fastAccountability';

//calendar
import CalendarPicker from 'react-native-calendar-picker';

//custom componnet
import Loader from '../../common/Loader';

//moment
import moment from 'moment';

export default function Fast() {
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
        getFastAccountability({
          username: user?.username,
          date: moment(selectedDate).format('YYYY-MM-DD'),
        }),
      );
    }
  }, [dispatch]);

  const [selectedDate, setSelectedDate] = useState(Date('DD-MM-YYYY'));

  function onDateChange(date) {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    dispatch(
      getFastAccountability({
        username: user?.username,
        date: moment(date).format('YYYY-MM-DD'),
      }),
    );
  }

  async function handleSaveFastAccountability(state) {
    if (user) {
      dispatch(
        updateFastAccountability({
          username: user?.username,
          date: moment(selectedDate).format('YYYY-MM-DD'),
          hasFast: state,
        }),
      );
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
        <Loader msg="Updating or Getting Fast performance" />
      ) : (
        <>
          <Box rounded={'lg'} style={styles.mainBox}>
            <View>
              {accountabilityData?.hasFast ? (
                <Text style={styles.fasted}>
                  Masha Allah, you had Fast on{' '}
                  {moment(selectedDate).format('DD-MMMM-YYYY')}
                </Text>
              ) : (
                <Text style={styles.text}>
                  Have you kept fast on{' '}
                  {moment(selectedDate).format('DD-MMMM-YYYY')}
                </Text>
              )}
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 40,
              }}>
              <Button
                title="Yes"
                variant="solid"
                color="white"
                w={{
                  base: '40%',
                }}
                colorScheme="yellow"
                onPress={() => {
                  handleSaveFastAccountability(true);
                }}>
                Yes
              </Button>
              <Button
                title="No"
                variant="solid"
                color="white"
                w={{
                  base: '40%',
                }}
                colorScheme="yellow"
                onPress={() => {
                  handleSaveFastAccountability(false);
                }}>
                No
              </Button>
            </View>
          </Box>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: fonts.Signika.regular,
  },
  fasted: {
    color: colors.success.deep,
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    alignSelf: 'center',
    width: '94%',
    backgroundColor: colors.cover,
    padding: 20,
    marginTop: 30,
    minHeight: '20%',
  },
});
