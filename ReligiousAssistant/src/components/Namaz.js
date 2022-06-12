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
  const namaz = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
  return (
    <View style={styles.container}>
      <Box
        style={styles.mainBox}
        marginTop={'1%'}
        marginLeft={'2%'}
        maxW="96%"
        maxH={'100%'}>
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
          base: '29%',
        }}
        marginLeft="68%"
        marginTop={'36%'}
        marginBottom={'-5%'}
        _text={{
          fontSize: 'md',
          fontFamily: fonts.Signika.medium,

          color: colors.white,
        }}
        colorScheme="yellow"
        variant="solid">
        Save
      </Button>
    </View>
  );
}
function NamazTimes(props) {
  return (
    <View>
      <Box
        style={styles.subBox}
        _text={styles.text}
        shadow={2}
        p="1"
        px="3"
        pb="-1"
        mb={props.mb}
        mt={props.mt}>
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
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: colors.white,
    marginTop: '48%',
    fontFamily: fonts.Signika.regular,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    border: 1,
    borderWidth: 4,
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  subBox: {
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  buttonStyle: {
    w: {
      base: '20%',
    },
    _text: {
      fontSize: 'md',
      fontFamily: fonts.Signika.medium,
      color: colors.white,
    },
    colorScheme: 'yellow',
    variant: 'solid',
  },
});
