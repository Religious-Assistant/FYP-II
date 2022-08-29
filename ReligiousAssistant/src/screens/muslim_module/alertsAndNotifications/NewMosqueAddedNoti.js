/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {Heading, Image, Text, ScrollView} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//images
import directionIcon from '../../../../assets/images/direction_ic.png';
import mosqueIcon from '../../../../assets/images/closest_mosque_ic.png';

import {useNavigation} from '@react-navigation/native';

//custom component
import CustomButton from '../../../components/CustomButton';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getMosqueById,
  selectIsLoadingGetMosqueById,
  selectMosqueById,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';
import Loader from '../../common/Loader';
import {GOOGLE_MAP_DIRECTIONS} from '../../../navigation/constants';
import {updatePrimaryMosque} from '../../../redux/slices/muslim_module_slices/muslimPreferencesSlice';
import {
  getUpdatedUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';

export default function NewMosqueAddedNoti({route, navigation}) {
  const {mosqueId} = route.params;

  const navigator = useNavigation();

  const dispatch = useDispatch();
  const mosqueById = useSelector(selectMosqueById);
  const isLoadingGetMosqueById = useSelector(selectIsLoadingGetMosqueById);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getMosqueById({mosqueId: mosqueId}));
    console.log(mosqueById);
  }, []);

  const displayLocationOnMap = destinationCoordinates => {
    navigator.navigate(GOOGLE_MAP_DIRECTIONS, {destinationCoordinates});
  };

  const makeMosquePrimary = () => {
    if (user && mosqueById) {
      dispatch(
        updatePrimaryMosque({
          username: user?.username,
          primaryMosque: mosqueById?._id,
        }),
      );
      dispatch(getUpdatedUserData({username: user?.username}));
      alert('Updated Primary Mosque');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        backgroundColor={colors.white}>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          {/* Header */}

          {isLoadingGetMosqueById ? (
            <Loader msg="Getting mosque info ... " />
          ) : (
            <>
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
                    source={mosqueIcon}
                    style={{
                      marginTop: '10%',
                      marginRight: '5%',
                      marginBottom: '5%',
                      height: 80,
                      width: 80,
                    }}
                    alt="icon .."
                  />
                </View>
                <View
                  style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
                  <Heading
                    color={colors.secondary}
                    marginLeft="10%"
                    marginTop={'5%'}>
                    <Text style={{fontFamily: fonts.Signika.bold}}>
                      New Mosque{' '}
                    </Text>
                    <Heading color={colors.white}>
                      <Text style={{fontFamily: fonts.Signika.bold}}>
                        {'\n'}Information
                      </Text>
                    </Heading>
                  </Heading>
                </View>
              </View>

              <View style={styles.detailContainer}>
                <DetailItem
                  heading={'Mosque Name'}
                  data={mosqueById?.mosqueName}
                />
                <DetailItem
                  heading={'Added By'}
                  data={`${mosqueById?.addedBy.toUpperCase()}`}
                />

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 25,
                  }}>
                  <Text style={styles.heading}>Location</Text>

                  <TouchableOpacity
                    onPress={() => {
                      displayLocationOnMap(mosqueById?.location?.coordinates);
                    }}
                    activeOpacity={0.6}>
                    <Image
                      source={directionIcon}
                      style={{
                        height: 40,
                        width: 40,
                        tintColor: colors.primary,
                      }}
                      alt="Direction"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{justifyContent: 'center', marginTop: 40}}>
                  <CustomButton
                    title="Set as Primary Mosque"
                    variant="solid"
                    color="white"
                    onPress={makeMosquePrimary}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const DetailItem = ({heading, data}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 200,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: colors.cover,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  heading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    color: colors.info,
  },
  data: {
    fontFamily: fonts.Signika.medium,
    fontSize: 18,
    color: colors.primary,
  },
});
