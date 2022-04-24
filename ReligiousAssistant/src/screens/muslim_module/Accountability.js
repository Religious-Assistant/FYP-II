import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Center, Heading, VStack } from 'native-base' 

import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import CalendarPickerr from '../../components/CalendarPicker'

export default function Accountability() {
  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Heading ml={'25%'} color={colors.white}>
        Self <Heading color={colors.secondary}>Accountability</Heading>
      </Heading>
    </View>
    <Center w="100%" h="95%" maxW="100%">
      <VStack space={3} mt={'80%'}>
        <CalendarPickerr/>
 </VStack>
 </Center>
 </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
})