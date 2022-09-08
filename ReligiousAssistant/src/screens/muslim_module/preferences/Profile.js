/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {VStack, HStack, Text, Divider, Icon, ScrollView} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//redux
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
  getLearnNamazProgress,
  selectLearnNamazProgress,
} from '../../../redux/slices/muslim_module_slices/learnNamazSlice';

//maps
import Geocoder from 'react-native-geocoding';

//constants
import {GOOGLE_MAPS_APIKEY} from '../../../components/componentsConstants';

Geocoder.init(GOOGLE_MAPS_APIKEY);

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const namazProgress = useSelector(selectLearnNamazProgress);

  const [userInfo, setUserInfo] = useState();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getLearnNamazProgress({username: user?.username}));
    user
      ? Geocoder.from(
          user.location?.coordinates[1],
          user.location?.coordinates[0],
        )
          .then(json => {
            var addressComponent = json.results[0].address_components;
            setLocation(addressComponent[1].long_name);
          })

          .catch(error => console.warn(error))
      : '';

    if (user) {
      setUserInfo([
        {
          id: 1,
          label: 'User Name',
          info: user?.username?.toUpperCase(),
          icon: <EvilIcons name="user" />,
          iconSize: '8',
        },
        {
          id: 2,
          label: 'Password',
          info: 'Password is hashed',
          icon: <EvilIcons name="eye" />,
          iconSize: '8',
        },
        {
          id: 3,
          label: 'Phone Number',
          info: user?.mobile,
          icon: <AntDesign name="phone" />,
          iconSize: '6',
        },
        {
          id: 4,
          label: 'Location',
          info: location ? location : 'Location not set',
          icon: <Ionicons name="location-outline" />,
          iconSize: '6',
        },
        {
          id: 5,
          label: 'Learn Namaz',
          info: `Level ${namazProgress?.level}`,
          icon: <Ionicons name="game-controller-outline" />,
          iconSize: '6',
        },
        {
          id: 6,
          label: 'Primary Mosque',
          info: user?.primaryMosque ? user?.primaryMosque : 'None',
          icon: <MaterialCommunityIcons name="mosque" />,
          iconSize: '6',
        },
      ]);
    }
  }, [dispatch, location]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.secondary,
            fontSize: 26,
            fontFamily: fonts.Signika.bold,
            top: '30%',
            padding: 10,
          }}>
          MY PROFILE
        </Text>
      </View>
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
            {userInfo ? (
              userInfo.map((user, index) => {
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
              })
            ) : (
              <></>
            )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    flex: 0.4,
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
