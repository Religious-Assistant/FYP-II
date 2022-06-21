import React from 'react';
import {View} from 'native-base';
import {
  Box,
  Heading,
  Text,
  Center,
  HStack,
  Stack,
  ScrollView,
} from 'native-base';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
export default function AnnouncementNoti() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      flex={1}
      backgroundColor={colors.white}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Center
          width="90%"
          space={2}
          maxW="90%"
          height={'70%'}
          maxH={'65%'}
          marginTop={'45%'}
          marginLeft={'5%'}
          marginBottom={'5%'}>
          <Box alignItems="center">
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor={colors.cover}
              borderWidth="1"
              _light={{
                backgroundColor: colors.cover,
              }}>
              <Stack p="10" space={3}>
                <Stack space={2}>
                  <Heading
                    size="md"
                    ml="-1"
                    _text={{fontFamily: fonts.Signika.bold}}>
                    Suresh Kumar
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: 'violet.500',
                    }}
                    _text={{fontFamily: fonts.Signika.medium}}
                    ml="-0.5"
                    mt="-1">
                    Funeral Activity
                  </Text>
                </Stack>
                <Text style={{fontFamily: fonts.Signika.medium}}>
                  Bengaluru (also called Bangalore) is the center of India's
                  high-tech industry. The city is also known for its parks and
                  nightlife.Bengaluru (also called Bangalore) is the center of
                  India's high-tech industry. The city is also known for its
                  parks and nightlife.
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text
                      color={colors.muted}
                      style={{fontFamily: fonts.Signika.regular}}
                      fontWeight="400">
                      6 mins ago
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </Center>
      </View>
    </ScrollView>
  );
}
