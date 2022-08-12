/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider, Button, Text, Checkbox} from 'native-base';

import colors from '../theme/colors';
import fonts from '../theme/fonts';
import moment from 'moment';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getNamazAccountability,
  selectAccountabilityData,
  selectIsLoadingGetAccountabilityData,
  selectIsLoadingUpdateAccountability,
  updateNamazAccountability,
} from '../redux/slices/muslim_module_slices/namazAccountabilitySlice';
import {selectUserData} from '../redux/slices/auth_slices/authSlice';
import Loader from '../screens/common/Loader';

export default function Namaz(props) {
  const [namazData, setNamazData] = useState(null);

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
    const getInitialState = async () => {
      console.log(props.selectedDate)
      if (user) {
        await dispatch(
          getNamazAccountability({
            username: user.username,
            date: moment(props.selectedDate).format("YYYY-MM-DD"),
          }),
        );
      }
    };

    getInitialState();
    if (accountabilityData) {
      console.log(accountabilityData)
      setNamazData(accountabilityData[0]?.prayers);
    }
  }, [props.selectedDate, dispatch]);

  async function handleSaveNamazAccountability() {
    if (user) {
      await dispatch(
        updateNamazAccountability({
          username: user.username,
          date: moment(props.selectedDate).format('YYYY-MM-DD'),
          namazInfo: namazData,
        }),
      );
      const data = [...namazData];
      await data.map(namaz => {
        let newObject = namaz;
        newObject.hasPrayed = false;
        return newObject;
      });
      setNamazData(data);
    }
  }

  const update = (state, id) => {
    const data = [...namazData];
    data[id].hasPrayed = state;
    setNamazData(data);
  };

  return (
    <View style={styles.container}>
      {isLoadingUpdateAccountability || isLoadingGetAccountabilityData ? (
        <Loader msg="Updating Namaz performance" />
      ) : (
        <>
          <Box style={styles.mainBox} rounded="lg">
            <VStack space="1.5" divider={<Divider />}>
              {namazData?.map((namaz, index) => {
                return (
                  <NamazTimes
                    time={namaz.time}
                    id={index}
                    update={update}
                    key={index}
                    isSelected={namaz.hasPrayed}
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

function NamazTimes({time, id, update, isSelected}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={styles.time}>{time}</Text>
      <Checkbox
        value={time}
        my={2}
        colorScheme="green"
        accessibilityLabel="Namaz time"
        onChange={state => {
          update(state, id);
        }}
        isChecked={isSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: colors.white,
    marginTop: '31%',
    fontFamily: fonts.Signika.regular,
  },
  time: {
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
