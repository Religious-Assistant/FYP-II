/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider, Button, Text, Checkbox} from 'native-base';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function Namaz(props) {
  //const namaz = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
  return (
    <View style={styles.container}>
      <Box
        style={styles.mainBox}
        rounded="lg"
        >
        <VStack space="1.5" divider={<Divider />}>
          <NamazTimes text="Fajr" mt="2%" />
          <NamazTimes text="Zuhr" />
          <NamazTimes text="Asr" />
          <NamazTimes text="Maghrib" />
          <NamazTimes text="Isha" mb="2%" />
        </VStack>
      </Box>
      <Button
        w={{
          base:"29%"
        }}
        _text={{
          fontSize: 'md',
          fontFamily: fonts.Signika.medium,
          color: colors.white,
        }}
        style={{alignSelf:'flex-end', right:10, top:4}}
        colorScheme="yellow"
        variant="solid">
        Save
      </Button>
    </View>
  );
}

function NamazTimes(props) {
  
  return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>{props.text}</Text>
          <Checkbox
            value={props.text}
            my={2}
            colorScheme="green"
            accessibilityLabel="Namaz time"
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
  text: {
    fontSize: 18,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    alignSelf:'center',
    width:"94%",
    backgroundColor: colors.cover,
    padding:8,
    marginTop:15,
  },
});
