/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Box, Text, Heading, HStack, Center, Pressable} from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';

import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

import Namaz from '../../../components/Namaz';
import Fast from '../../../components/Fast';

export default function Accountability(props) {
  const [state, setState] = useState({
    selectedStartDate: null,
    selected: 0,
  });

  function onDateChange(date) {
    setState({...state, selectedStartDate: date});
  }

  //This is used in footer, when the value 0 is used for Pryaer while 1 is used for fast
  function setSelectedFeature(selectedFeature) {
    setState({selected: selectedFeature});
  }

  const {selectedStartDate} = state;
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const date = moment(selectedStartDate).format('DD-MM-YYYY');

  return (
    // main view
    <View style={{flex: 1, backgroundColor: colors.white}}>

      <View style={styles.headerContainer}>
        <Heading color={colors.white}>
          Self <Heading color={colors.secondary}>Accountability</Heading>
        </Heading>
      </View>

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
          onDateChange={onDateChange}
          selectedDayColor={colors.secondary}
          todayBackgroundColor={colors.primary}
          todayTextStyle={{color: 'white'}}
        />
      </View>

      {state.selected == 0 ? (

        <Namaz selectedDate={date} />
      ) : (
        <Fast selectedDate={date} />
      )}
      <FooterOptions
        setSelectedFeature={setSelectedFeature}
        selected={state.selected}
      />
    </View>
  );
}

function FooterOptions(props) {
  function setSelected(value) {
    props.setSelectedFeature(value);
  }
  return (
    //Main Box
    <Box
      flex={1}
      bg="white"
      safeAreaTop
      width="100%"
      maxW="100%"
      maxHeight={'10%'}
      maxH={'7%'}
      backgroundColor={colors.black}
      marginTop={'50%'}
      alignSelf="center">
      <Center flex={1}></Center>
      <HStack bg={colors.primary} alignItems="center" safeAreaBottom shadow={5}>
        {/* Prayer Option */}
        <Pressable
          cursor="pointer"
          opacity={props.selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            <Text color="white" fontSize="18" fontFamily={fonts.Signika.bold}>
              Prayer
            </Text>
          </Center>
        </Pressable>
        {/* Fast Option */}
        <Pressable
          cursor="pointer"
          opacity={props.selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            <Text color="white" fontSize="18" fontFamily={fonts.Signika.bold}>
              Fast
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    fontFamily: fonts.Signika.regular,
    marginTop:10,
    width:"90%",
    alignSelf:'center'    
  },
  headerContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex:0.2,
    backgroundColor: colors.primary,
  },
});
