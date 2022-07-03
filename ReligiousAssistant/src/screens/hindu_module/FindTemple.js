/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Center,
  VStack,
  Input,
  Icon,
  View,
  Image,
  Heading,
  ScrollView,
  Text,
} from 'native-base';

import Ioicons from 'react-native-vector-icons/Ionicons';
import templeICon from '../../../assets/images/temple2_ic.png';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import CustomBox from '../../components/CustomBox';

export default function FindTemple() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        backgroundColor={colors.white}
        flex={1}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
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
                source={templeICon}
                style={{
                  marginTop: '10%',
                  marginRight: '-5%',
                  marginBottom: '5%',
                  height: 100,
                  width: 100,
                }}
                alt="icon .."
              />
            </View>
            <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
              <Heading
                color={colors.secondary}
                marginLeft="10%"
                marginTop={'5%'}>
                <Text style={{fontFamily: fonts.Signika.bold}}>Find </Text>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>Temple</Text>
                </Heading>
              </Heading>
            </View>
          </View>
          <View style={{flex: 0.83}} width="95%" marginTop={'90%'}>
            <Center w="110%" mt={'-30%'} ml="-3%" h="95%" maxW="110%">
              <VStack width="80%" space={2} maxW="80%">
                <Input
                  placeholder="search"
                  _text={styles.text}
                  color={colors.white}
                  bgColor={colors.tertiary}
                  borderRadius="20"
                  py="2"
                  px="2"
                  borderWidth="0"
                  InputLeftElement={
                    <Icon
                      as={<Ioicons name="search" />}
                      size={5}
                      ml="2%"
                      color={colors.white}
                    />
                  }
                />

                <CustomBox
                  mt={'20%'}
                  text="Temple 1
                  "
                  distance="2.3 km"
                  ml="20%"
                />

                <CustomBox
                  mt={'2%'}
                  text="Temple 2"
                  distance="2.3 km"
                  ml="20%"
                />

                <CustomBox
                  mt={'2%'}
                  text="Temple 3"
                  distance="2.3 km"
                  ml="20%"
                />
              </VStack>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  image: {width: '90%', flex: 0.5, resizeMode: 'contain', alignSelf: 'center'},
  container: {backgroundColor: colors.cover, flex: 1},
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
});