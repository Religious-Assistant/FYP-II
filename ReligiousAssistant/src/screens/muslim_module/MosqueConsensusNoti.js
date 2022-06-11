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
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import voteIcon from '../../../assets/images/vote_ic.png';

import CustomButton from '../../components/CustomButton';

export default function MosqueConsensusNoti() {
  const mosqueInfo = [
    {
      key: 1,
      label: 'Mosque Name',
      info: 'Sukkur IBA Mosque',
    },
    {
      key: 2,
      label: 'Location',
      info: 'Sukkur IBA Uni',
    },
    {
      key: 3,
      label: 'Added By',
      info: 'Nadir Hussain',
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              source={voteIcon}
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginBottom: '5%',
                height: 80,
                width: 80,
                tintColor: colors.secondary,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Be the Part</Text>
              <Heading color={colors.white}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  {'\n'}Cast Vote
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
            marginTop={'68%'}
            marginLeft={'8%'}
            marginBottom={'5%'}>
            {mosqueInfo.map((mosque, index) => {
              return (
                <VStack
                  space={3}
                  divider={<Divider />}
                  w="90%"
                  marginTop={'10%'}>
                  <HStack justifyContent="space-between">
                    <Text style={styles.label}>{mosque.label}:</Text>
                    <Text style={styles.info}>{mosque.info}</Text>
                  </HStack>
                </VStack>
              );
            })}

            <VStack space={3} divider={<Divider />} w="90%">
              <HStack justifyContent="space-between">
                <Text
                  style={{
                    fontFamily: fonts.Signika.medium,
                    fontSize: 14,
                    color: colors.muted,
                    marginTop: '10%',
                  }}>
                  Do you think the above information is correct? Should we add
                  Sukkur IBA mosque?
                </Text>
              </HStack>
            </VStack>
            <VStack space={3} divider={<Divider />} w="90%" marginTop={'10%'}>
              <HStack justifyContent="space-between">
                <CustomButton
                  title="Yes"
                  variant="solid"
                  color="white"
                  base="40%"
                />
                <CustomButton
                  title="No"
                  variant="solid"
                  color="white"
                  base="40%"
                />
              </HStack>
            </VStack>
          </Center>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
  label: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    padding: 5,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
  },
});
