/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider, Button, Text, HStack, Center} from 'native-base';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function Fast(props) {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  const currDate = date + '-' + month + '-' + year;

  const [keepFast, setKeepFast] = useState(0);
  return (
    <View style={styles.container}>
      <Box
        style={styles.mainBox}
        marginTop={'5%'}
        marginLeft={'2%'}
        maxW="96%"
       
        maxH={'100%'}>
        <VStack space="1.5" divider={<Divider />}>
          <View>
            <Box
              style={styles.subBox}
              _text={styles.text}
              shadow={5}
              p="5"
              px="3"
              pb="7"
              mb={props.mb}
              mt={props.mt}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Center
                  width="90%"
                  space={2}
                  maxW="90%"
                  marginLeft={'8%'}
                  marginBottom={'5%'}>
                  <VStack
                    space={3}
                    divider={<Divider />}
                    w="90%"
                    marginTop={'12%'}>
                    <HStack justifyContent="space-between">
                      <Text style={styles.text}>
                        Have you kept fast on{' '}
                        {props.selectedDate == 'Invalid date'
                          ? currDate
                          : props.selectedDate}{' '}
                        ?
                      </Text>
                    </HStack>
                  </VStack>
                  <VStack
                    space={3}
                    divider={<Divider />}
                    w="90%"
                    marginTop={'10%'}>
                    <HStack justifyContent="space-between">
                      <Button
                        title="Yes"
                        variant="solid"
                        color="white"
                        w={{
                          base: '40%',
                        }}
                        colorScheme="yellow"
                        onPress={() => {
                          setKeepFast(1);
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
                          setKeepFast(0);
                        }}>
                        No
                      </Button>
                    </HStack>
                  </VStack>
                </Center>
              </View>
            </Box>
          </View>
        </VStack>
      </Box>
      <Button
        w={{
          base: '29%',
        }}
        marginLeft="68%"
        marginTop={'22%'}
        marginBottom={'-5%'}
        _text={{
          fontSize: 'md',
          fontFamily: fonts.Signika.medium,

          color: colors.white,
        }}
        colorScheme="yellow"
        variant="solid"
        onPress={() => {
          keepFast == 0 ? console.log('No') : console.log('Yes');
        }}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
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
