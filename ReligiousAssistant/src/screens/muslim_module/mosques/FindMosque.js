/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
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

//icons
import Ioicons from 'react-native-vector-icons/Ionicons';

//images
import mosqueICon from '../../../../assets/images/Logo-muslim.png';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//custom components
import CustomBox from '../../../components/CustomBox';

//maps
import Geolocation from '@react-native-community/geolocation';

import {useIsFocused} from '@react-navigation/native';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  getClosestMosques,
  selectClosestMosques,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';
import {useNavigation} from '@react-navigation/native';
import {GOOGLE_MAP_DIRECTIONS} from '../../../navigation/constants';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

export default function FindMosque() {
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const closesMosques = useSelector(selectClosestMosques);
  const user = useSelector(selectUserData);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }

    if (user) {
      dispatch(
        getClosestMosques({
          longitude: user?.location?.coordinates[0],
          latitude: user?.location?.coordinates[1],
        }),
      );
    }
  }, [dispatch, isFocused]);

  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: "App needs access to your phone's location.",
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(getClosestMosques(position.coords));
            setSourceCoordinates(position.coords);
          },
          error => {
            alert(`Error while seeking Permission. ${error.code}`);
          },
          {enableHighAccuracy: false, timeout: 15000},
        );
      } else {
        console.log('Location permission not granted!');
      }
    } catch (err) {
      console.log('Location permission not granted!', err);
    }
  };

  function getDirections(destinationCoordinates) {
    if (destinationCoordinates) {
      navigator.navigate(GOOGLE_MAP_DIRECTIONS, {
        destinationCoordinates,
      });
    } else {
      alert('Error while fetching current or desination location');
    }
  }

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
                source={mosqueICon}
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
                  <Text style={{fontFamily: fonts.Signika.bold}}>Mosque</Text>
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
                {closesMosques?.length == 0 ? (
                  <View
                    style={{
                      backgroundColor: colors.cover,
                      marginTop: '20%',
                      padding: 15,
                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: colors.info,
                        fontFamily: fonts.Signika.bold,
                        fontSize: 20,
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      No Mosque near you
                    </Text>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontFamily: fonts.Signika.bold,
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      What to do?
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: fonts.Signika.bold,
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      1. Add a mosque{' '}
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: fonts.Signika.bold,
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      2. Wait for consensus{' '}
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: fonts.Signika.bold,
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      3. It will appear in searches{' '}
                    </Text>
                  </View>
                ) : (
                  <>
                    {closesMosques ? (
                      closesMosques.map((mosque, index) => {
                        return (
                          <CustomBox
                            mt={'5%'}
                            mb={
                              index == closesMosques.length - 1 ? '15%' : '0%'
                            }
                            text={mosque.mosqueName}
                            distance={
                              Math.round(
                                (mosque.dist.calculated / 1000 +
                                  Number.EPSILON) *
                                  100,
                              ) /
                                100 +
                              ' KM '
                            }
                            onPress={() => {
                              getDirections(mosque.location.coordinates);
                            }}
                          />
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </VStack>
            </Center>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  image: {width: '90%', flex: 0.5, resizeMode: 'contain', alignSelf: 'center'},
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.white,
  },
});
