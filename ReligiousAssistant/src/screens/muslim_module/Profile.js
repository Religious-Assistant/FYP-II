/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {VStack, HStack, Text, Divider, Icon, Left, Right} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import avatar from '../../../assets/images/avatar.png';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Profile extends Component {
  
  render() {
    
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
            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<EvilIcons name="user" />}
                  size={8}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>User Name:</Text>
              </View>
              <Text style={styles.info}>Kinza Shaikh</Text>
            </HStack>
          
            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<EvilIcons name="eye" />}
                  size={8}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>Password:</Text>
              </View>
              <Text style={styles.info}>Kinza123</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<AntDesign name="phone" />}
                  size={6}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>Phone Number:</Text>
              </View>
              <Text style={styles.info}>033539886</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<Ionicons name="location-outline" />}
                  size={6}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>Location:</Text>
              </View>
              <Text style={styles.info}>Sukkur IBA</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<Ionicons name="game-controller-outline" />}
                  size={6}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>Learn Namaz:</Text>
              </View>
              <Text style={styles.info}>Level 2</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  as={<MaterialCommunityIcons name="mosque" />}
                  size={6}
                  ml="2%"
                  color={colors.primary}
                />
                <Text style={styles.label}>Primary Mosque:</Text>
              </View>
              <Text style={styles.info}>Sukkur IBA Mosque</Text>
            </HStack>

          </VStack>
        </View>
      </View>
    );
  }
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
