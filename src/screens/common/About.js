/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';

//theme
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default function About() {
  const developersInfo = [
    {
      key: 1,
      name: 'Nadir Hussain',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574619/religious-assistant/static_assets/nadir_vrr5jz.jpg'},
      email: 'nadirhussain.bcsf18@iba-suk.edu.pk',
    },
    {
      key: 2,
      name: 'Kinza Kiran',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574614/religious-assistant/static_assets/kinza_img_qov03o.jpg'},
      email: 'kinzakiran.bsef18@iba-suk.edu.pk',
    },
    {
      key: 3,
      name: 'Akash Kumar',
      image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574626/religious-assistant/static_assets/akash_img_hu6qxw.png'},
      email: 'akashkumar.bcsf18@iba-suk.edu.pk',
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        backgroundColor={colors.white}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          {/* Header */}
          <View
            style={{
              flex: 0.17,
              backgroundColor: colors.primary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <Image
                source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574772/religious-assistant/static_assets/Logo-combined_ehsavt.png'}}
                style={{
                  marginTop: '10%',
                  marginRight: '5%',
                  marginBottom: '5%',
                  height: 90,
                  width: 90,
                }}
                alt="icon .."
              />
            </View>
            <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
              <Heading
                color={colors.secondary}
                marginLeft="10%"
                marginTop={'5%'}>
                <Text style={{fontFamily: fonts.Signika.bold}}>About </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    {'\n'}Developers
                  </Text>
                </Heading>
              </Heading>
            </View>
          </View>
          <View style={{flex: 0.83}} width="95%" alignItems="center">
            <Center
              width="90%"
              space={2}
              maxW="90%"
              marginTop={'50%'}
              marginLeft={'3%'}
              marginBottom={'5%'}>
              <Heading ml={'-44%'}>
                <Text
                  _text={{
                    fontFamily: fonts.Signika.bold,
                    color: colors.primary,
                  }}>
                  Organization:
                </Text>
              </Heading>
              <VStack space={3} divider={<Divider />} w="90%" marginTop={'8%'}>
                <HStack justifyContent="space-between">
                  <Image
                    mt={'-5%'}
                    source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574726/religious-assistant/static_assets/iba_logo_s5qxgb.jpg'}}
                    style={styles.avatar}
                    alt="icon .."
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text style={styles.info}>Sukkur IBA University</Text>
                    <Text style={styles.subText}>Airport Road, Sukkur</Text>
                  </View>
                </HStack>
              </VStack>

              <Heading ml={'-48%'} mt={'8%'}>
                <Text
                  _text={{
                    fontFamily: fonts.Signika.bold,
                    color: colors.primary,
                  }}>
                  Developers:
                </Text>
              </Heading>
              <VStack space={3} divider={<Divider />} w="90%" marginTop={'8%'}>
                {developersInfo.map((developer, index) => {
                  return (
                    <HStack
                      justifyContent="space-between"
                      mt={'3%'}
                      key={developer.key}>
                      <Image
                        mt={'-5%'}
                        source={developer.image}
                        style={styles.avatar}
                        alt="icon .."
                      />

                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text style={styles.info}>{developer.name}</Text>
                        <Text style={styles.subText}>{developer.email}</Text>
                      </View>
                    </HStack>
                  );
                })}
              </VStack>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
  subText: {
    fontFamily: fonts.Signika.medium,
    fontSize: 15,
    padding: 5,
    color: colors.tertiary,
  },
  info: {
    fontFamily: fonts.Signika.bold,
    fontSize: 23,
    padding: 5,
    color: colors.primary,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
});
