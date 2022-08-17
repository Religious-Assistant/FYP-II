/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {VStack, HStack, Text, Divider, Icon, ScrollView} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import avatar from '../../../../assets/images/avatar.png';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE');

export default function Profile() {
  const [location, setLocation] = useState(null);
  const user = useSelector(selectUserData);
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    {
      user
        ? Geocoder.from(
            user.location?.coordinates[1],
            user.location?.coordinates[0],
          )
            .then(json => {
              var addressComponent = json.results[0].address_components;
              //setReg({address: addressComponent});
              setLocation(addressComponent[1].long_name);
            })

            .catch(error => console.warn(error))
        : '';
    }
  }, []);


  const userInfo = [
    userData
      ? {
          id: 1,
          label: 'User Name',
          info: userData.username,
          icon: <EvilIcons name="user" />,
          iconSize: '8',
        }
      : undefined,
    userData
      ? {
          id: 2,
          label: 'Password',
          info: 'Password is hashed',
          icon: <EvilIcons name="eye" />,
          iconSize: '8',
        }
      : undefined,
    userData
      ? {
          id: 3,
          label: 'Phone Number',
          info: userData.mobile,
          icon: <AntDesign name="phone" />,
          iconSize: '6',
        }
      : undefined,
    userData
      ? {
          id: 4,
          label: 'Location',
          info: location ? location : 'Location not set',
          icon: <Ionicons name="location-outline" />,
          iconSize: '6',
        }
      : undefined,
    userData
      ? {
          id: 6,
          label: 'Primary Temple',
          info: userData.primaryTemple ? userData.primaryTemple : 'None',
          icon: <MaterialCommunityIcons name="mosque" />,
          iconSize: '6',
        }
      : undefined,
  ];

  return user && userData ? (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri: user?.avatar}} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        marginTop={'15%'}>
        <View
          style={{
            flex: 0.7,
            marginTop: '2%',
            marginLeft: '7%',
            width: '90%',
            maxWidth: '88%',
          }}>
          <VStack space={3} divider={<Divider />} w="90%" marginTop={'15%'}>
            {userInfo.map((user, index) => {
              return (
                <HStack
                  justifyContent="space-between"
                  key={user.id}
                  flexWrap="wrap">
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* Icon */}
                    <Icon
                      as={user.icon}
                      size={user.iconSize}
                      ml="2%"
                      mt="-1"
                      color={colors.primary}
                    />
                    {/* label */}
                    <Text style={styles.label}>{user.label}:</Text>
                  </View>
                  {/* user information */}
                  <Text style={styles.info}>{user.info}</Text>
                </HStack>
              );
            })}
            <HStack justifyContent="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}></View>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
    </View>
  ) : (
    <></>
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
    fontSize: 19,
    padding: 5,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
    padding: 5,
    color: colors.tertiary,
    flexWrap: 'wrap',
  },
});
