/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {
  VStack,
  HStack,
  Text,
  Divider,
  Icon,
  Box,
  Stack,
  AspectRatio,
  Center,
  Heading,
  Switch,
  ScrollView,
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import avatar from '../../../assets/images/avatar.png';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import editIcon from '../../../assets/images/edit_ic.png';

export default function Settings() {
  return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.username}>Kinza</Text>
        <ScrollView keyboardShouldPersistTaps="handled" flex={1} maxHeight={'57%'}>
        <View
          style={{
            flex: 0.7,
            marginTop: 50,
            marginLeft: '5%',
            width: '90%',
            maxWidth: '88%',
            height:'90%',
            maxHeight:'30%',
           
          }}>
          <VStack space={3} divider={<Divider />} w="99%">
            {/* Password */}

            <Box alignItems="center">
              <Box
                maxW="90%"
                w={{
                  base: '90%',
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
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                      Password
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    KinzaShaikh123
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack></HStack>
                    <TouchableHighlight
                      activeOpacity={0.8}
                      underlayColor={colors.cover}
                      onPress={() => {
                        console.log('password');
                      }}>
                      <Image
                        marginLeft="6%"
                        source={editIcon}
                        style={{
                          height: 30,
                          width: 33,
                          tintColor: colors.secondary,
                        }}
                        alt="icon .."
                      />
                    </TouchableHighlight>
                  </HStack>
                </Stack>
              </Box>
            </Box>

            {/* Primary Mosque */}

            <Box alignItems="center">
              <Box
                maxW="90%"
                w={{
                  base: '90%',
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
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                      Primary Mosque
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    Sukkur IBA Mosque
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack></HStack>
                    <TouchableHighlight
                      activeOpacity={0.8}
                      underlayColor={colors.cover}
                      onPress={() => {
                        console.log('password');
                      }}>
                      <Image
                        marginLeft="6%"
                        source={editIcon}
                        style={{
                          height: 30,
                          width: 33,
                          tintColor: colors.secondary,
                        }}
                        alt="icon .."
                      />
                    </TouchableHighlight>
                  </HStack>
                </Stack>
              </Box>
            </Box>

            {/* Namaz Noti */}
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
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading
                      size="md"
                      ml="-1"
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                      Namaz Notifications
                    </Heading>
                    <Text
                      fontSize="xs"
                      fontFamily={fonts.Signika.medium}
                      _light={{
                        color: colors.info,
                      }}
                      ml="-0.5"
                      mt="-1">
                      w.r.t Primary Mosque
                    </Text>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling namaz notifications, you will be able to get
                    notification about each prayer
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack>
                      <Switch
                        offTrackColor="rose.300"
                        onTrackColor="lime.300"
                        size="lg"
                        marginLeft={"80%"}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>

            {/* AutoSilent Mode */}
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
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading
                      size="md"
                      ml="-1"
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                     Auto Silent Mode
                    </Heading>
                    <Text
                      fontSize="xs"
                      fontFamily={fonts.Signika.medium}
                      _light={{
                        color: colors.info,
                      }}
                      ml="-0.5"
                      mt="-1">
                      w.r.t Primary Mosque
                    </Text>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling Auto silent mode, your phone will automatically be silent when you will enter the mosque
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack>
                      <Switch
                        offTrackColor="rose.300"
                        onTrackColor="lime.300"
                        size="lg"
                        marginLeft={"80%"}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>

            
            {/* Accountability Notification */}
            <Box alignItems="center">
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor={colors.cover}
                borderWidth="1"
                marginBottom={"3"}
                _light={{
                  backgroundColor: colors.cover,
                }}>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading
                      size="md"
                      ml="-1"
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                     Accountability Notifications
                    </Heading>
                    
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling Accountability notifications, you will get notification every day at 10 pm to keep track of your Namaz
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack>
                      <Switch
                        offTrackColor="rose.300"
                        onTrackColor="lime.300"
                        size="lg"
                        marginLeft={"80%"}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
         
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
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
    flexWrap: 'wrap',
  },
  username: {
    fontFamily: fonts.Signika.bold,
    fontSize: 30,
    marginTop: '20%',
    marginLeft: '38%',
    padding: 8,
    color: colors.primary,
    //marginLeft:"92%"
  },
});
