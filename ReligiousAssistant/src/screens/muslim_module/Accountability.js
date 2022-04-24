/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Heading} from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';

import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

import NamazAndFast from '../../components/NamazAndFast';

export default class Accountability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.headerContainer}>
          <Heading ml={'25%'} color={colors.white}>
            Self <Heading color={colors.secondary}>Accountability</Heading>
          </Heading>
        </View>
        <View style={styles.container}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            selectedDayColor={colors.secondary}
            todayBackgroundColor={colors.primary}
            todayTextStyle={{color: 'white'}}
          />
        </View>
        <NamazAndFast currDate={startDate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
});
