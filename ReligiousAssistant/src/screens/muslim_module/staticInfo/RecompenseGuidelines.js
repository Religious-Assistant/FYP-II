/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {VStack, Divider, Box, Stack, Heading, ScrollView} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//images
import guidelinesIcon from '../../../../assets/images/file-info.png';

export default function RecompenseGuidelines({navigation}) {
  const guidelines = [
    {
      key: 1,
      heading: 'What to do if a Prayer is missed?',
      info: 'Qadaa Namaz',
      statement:
        'Make it up as soon as it is remembered or as soon as you are able to do so',
    },
    {
      key: 2,
      heading: 'What to do if fast is missed due to temporary reasons?',
      info: 'reasons such as: travel, sickness and pregnancy',
      statement:
        'Must fast days after Ramadan in place of the ones they missed during Ramadan',
    },
    {
      key: 3,
      heading: 'What to do if fast is missed due to permanent reasons?',
      info: 'reasons such as: old age and chronic illness',
      statement:
        'Pay a redemption fee (fidyah) but do not have to make up the fast.',
    },
    {
      key: 4,
      heading: 'How much is fidyah for the missed fast?',
      info: 'fidyah is paid for valid reasons',
      statement:
        '$10 is the fidya for each missed fast. This should provide one person with two meals or two people with one meal.',
    },
    {
      key: 5,
      heading: 'What to do if someone breaks fast intentionally?',
      info: 'Breaking a fast is major sin in Islam',
      statement: 'Pay a atonement or expiation fee (kaffarah)',
    },
    {
      key: 6,
      heading: 'How much Kaffarah for the missed fast?',
      info: 'Kafarrah is paid for invalid reasons',
      statement:
        'Should either fast for 60 consecutive days or feed 60 poor people',
    },
    {
      key: 7,
      heading: 'What to do if zakat is missed?',
      info: 'Who does not pay zakat, will be punished',
      statement:
        'Make a calculated estimate of the Zakat missed for each year and discharge it accordingly',
    },
    {
      key: 8,
      heading:
        'What to do if you forget to say "Bismillah Al-Rahman Al-Raheem" before eating?',
      info: '"In the name of Allah from the beginning to the End"',
      statement:
        'Say Bismillah even in the middle of eating (better to say Bismillahi a walahu wa Akheerahu)',
    },
    {
      key: 9,
      heading:
        'What can you do if you can not do hajj?',
      info: 'If this is not an obligatory Hajj',
      statement:
        'He/she may leave the state of Ihram. Later they should sacrifice a sheep, a cow, or a camel (Hady)',
    },
    {
      key: 10,
      heading:
        'What can you do if you can not do hajj?',
      info: 'If this is an obligatory Hajj',
      statement:
        'He/she must repeat the Hajj another time in the following year',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          marginTop="4%"
          marginLeft="16%"
          source={guidelinesIcon}
          style={{
            height: 75,
            width: 75,
          }}
          alt="icon .."
        />
        <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
          <Heading color={colors.secondary}  marginTop={'8%'}>
            <Text style={{fontFamily: fonts.Signika.bold}}>Recompense </Text>
            <Heading color={colors.white}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Guidelines</Text>
            </Heading>
          </Heading>
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        maxHeight={'90%'}>
        <View
          style={{
            flex: 0.7,
            marginTop: 35,
            marginLeft: '2%',
            width: '97%',
            maxWidth: '97%',
            height: '90%',
            maxHeight: '30%',
          }}>
          <VStack space={3} divider={<Divider />} w="99%">
            {guidelines.map((item, index) => {
              return (
                <Box key={item.key} alignItems="center">
                  <Box
                    maxW="95%"
                    w={{
                      base: '95%',
                    }}
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={styles.label}
                          color={colors.primary}>
                          {item.key}
                          {'.  '}
                          {item.heading}
                        </Heading>
                      </Stack>
                      <Text fontWeight="400" style={styles.info}>
                        {item.info}
                      </Text>
                      <Text fontWeight="400" style={styles.statement}>
                        {item.statement}
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </VStack>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statement: {
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
    padding: 5,
    color: colors.primary,
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
    padding: 5,
    color: colors.info,
    flexWrap: 'wrap',
  },
  heading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 40,
    marginTop: '7%',
    marginLeft: '-18%',
    padding: 8,
    color: colors.white,
  },
});
