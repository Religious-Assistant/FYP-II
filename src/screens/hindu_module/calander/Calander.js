/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import {Text, Center, Box} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//calendar
import {Agenda} from 'react-native-calendars';
import { hinduEventsData } from './hinduEvents';

const Calander = () => {
  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.item}>
        <Center flex={1} px="3">
          <Box
            bg={colors.white}
            style={{justifyContent: 'center'}}
            height={150}
            width={300}
            rounded="lg">
            <Text style={styles.text}>{item.name}</Text>
          </Box>
        </Center>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={hinduEventsData}
        //loadItemsForMonth={loadItems}
        selected={new Date()}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        minDate={'2022-01-01'}
        maxDate={'2022-12-31'}
        renderEmptyData={() => {
          return <View />;
        }}
        theme={{
          agendaDayTextColor: colors.success.deep,
          agendaDayNumColor: colors.primary,
          agendaTodayColor: colors.primary,
          agendaKnobColor: colors.red,
        }}
        style={{
          backgroundColor: colors.white,
        }}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    backgroundColor: colors.white,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  text: {
    fontFamily: fonts.Signika.regular,
    color: colors.primary,
    marginTop: '5%',
    fontSize: 20,
    alignSelf: 'center',
  },
});
export default Calander;
