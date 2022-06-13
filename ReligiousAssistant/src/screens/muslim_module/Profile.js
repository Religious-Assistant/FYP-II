/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {VStack, HStack, Text, Divider, Icon, Left, Right} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import avatar from '../../../assets/images/avatar.png';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profile() {
  const userInfo = [
    {
      id: 1,
      label: 'User Name',
      info: 'Kinza Shaikh',
      icon: <EvilIcons name="user" />,
      iconSize: '8',
    },
    {
      id: 2,
      label: 'Password',
      info: 'Kinza123',
      icon: <EvilIcons name="eye" />,
      iconSize: '8',
    },
    {
      id: 3,
      label: 'Phone Number',
      info: '0335339221',
      icon: <AntDesign name="phone" />,
      iconSize: '6',
    },
    {
      id: 4,
      label: 'Location',
      info: 'Sukkur IBA',
      icon: <Ionicons name="location-outline" />,
      iconSize: '6',
    },
    {
      id: 5,
      label: 'Learn Namaz',
      info: 'Level 2',
      icon: <Ionicons name="game-controller-outline" />,
      iconSize: '6',
    },
    {
      id: 6,
      label: 'Primary Mosque',
      info: 'Sukkur IBA Mosque',
      icon: <MaterialCommunityIcons name="mosque" />,
      iconSize: '6',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={avatar} />
      <View
        style={{
          flex: 0.7,
          marginTop: 70,
          marginLeft: '5%',
          width: '90%',
          maxWidth: '88%',
        }}>
        <VStack space={3} divider={<Divider />} w="90%" marginTop={'15%'}>
          {userInfo.map((user, index) => {
            return (
              <HStack justifyContent="space-between" key={user.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Icon
                    as={user.icon}
                    size={user.iconSize}
                    ml="2%"
                    mt="-1"
                    color={colors.primary}
                  />
                  <Text style={styles.label}>{user.label}:</Text>
                </View>
                <Text style={styles.info}>{user.info}</Text>
              </HStack>
            );
          })}
        </VStack>
      </View>
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
    height: 200,
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
    marginTop: 130,
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
  },
});
