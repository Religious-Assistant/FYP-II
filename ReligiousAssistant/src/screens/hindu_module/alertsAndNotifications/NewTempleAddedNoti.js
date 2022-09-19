/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useEffect} from 'react';
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

//navigation
import {useNavigation} from '@react-navigation/native';
import {GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS} from '../../../navigation/constants';

//custom components
import CustomButton from '../../../components/CustomButton';
import Loader from '../../common/Loader';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUpdatedUserData,
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {
  getTempleById,
  selectIsLoadingGetTempleById,
  selectTempleById,
} from '../../../redux/slices/hindu_module_slices/templeSlice';
import {updatePrimaryTemple} from '../../../redux/slices/hindu_module_slices/hinduPreferencesSlice';

export default function NewTempleAddedNoti({route, navigation}) {
  const {templeId} = route.params;

  const navigator = useNavigation();

  const dispatch = useDispatch();
  const templeById = useSelector(selectTempleById);
  const isLoadingGetTempleById = useSelector(selectIsLoadingGetTempleById);
  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getTempleById({templeId: templeId}));
  }, []);

  const displayLocationOnMap = destinationCoordinates => {
    navigator.navigate(GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS, {
      destinationCoordinates,
    });
  };

  const makeTemplePrimary = () => {
    if (user && templeById) {
      dispatch(
        updatePrimaryTemple({
          username: user?.username,
          primaryTemple: templeById?._id,
        }),
      );
      dispatch(getUpdatedUserData({username: user?.username}));
      alert('Updated Primary Temple');
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

          {isLoadingGetTempleById ? (
            <Loader msg="Getting Temple info ... " />
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
                    source={{
                      uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663584199/religious-assistant/static_assets/temple_ic_hvumga.png',
                    }}
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
                      New Temple{' '}
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
                  data={templeById?.templeName}
                />
                <DetailItem
                  heading={'Added By'}
                  data={`${templeById?.addedBy.toUpperCase()}`}
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
                      displayLocationOnMap(templeById?.location?.coordinates);
                    }}
                    activeOpacity={0.6}>
                    <Image
                      source={{
                        uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413045/religious-assistant/static_assets/direction_ic_cantmg.png',
                      }}
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
                    title="Set as Primary Temple"
                    variant="solid"
                    color="white"
                    onPress={makeTemplePrimary}
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
