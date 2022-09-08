/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {Heading, Image, Text, VStack, Box, HStack, Divider} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//images
import voteIcon from '../../../../assets/images/vote_ic.png';
import directionIcon from '../../../../assets/images/direction_ic.png';

//custom components
import CustomButton from '../../../components/CustomButton';
import Loader from '../../common/Loader';

//navigation
import {useNavigation} from '@react-navigation/native';
import {GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS} from '../../../navigation/constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {
  castDownvote,
  castUpvote,
  getTempleById,
  selectIsLoadingGetTempleById,
  selectTempleById,
} from '../../../redux/slices/hindu_module_slices/templeSlice';

export default function TempleConsensusNoti({route, navigation}) {
  const {templeId} = route.params;

  const dispatch = useDispatch();
  const navigator = useNavigation();
  const [isAlreadyCasted, setIsAlreadyCasted] = useState(false);

  const isLoadingGetTempleById = useSelector(selectIsLoadingGetTempleById);
  const templeById = useSelector(selectTempleById);
  const user = useSelector(selectUserData);

  useEffect(() => {
    if (templeId) {
      dispatch(getTempleById({templeId: templeId}));
      dispatch(getUserData());
    }
  }, [dispatch]);

  const displayLocationOnMap = destinationCoordinates => {
    navigator.navigate(GOOGLE_MAP_DIRECTIONS_FOR_HINDU_USERS, {
      destinationCoordinates,
    });
  };

  const cast_upVote = () => {
    const index = templeById?.receivers.findIndex(
      candidate => candidate.username === user?.username,
    );

    if (
      templeId &&
      !isAlreadyCasted &&
      user &&
      !templeById?.receivers[index].hasVoted
    ) {
      dispatch(castUpvote({templeId: templeId, username: user?.username}));
      setIsAlreadyCasted(true);
    } else {
      alert(`Vote already casted or error occured`);
    }
  };

  const cast_downVote = () => {
    const index = templeById?.receivers.findIndex(
      candidate => candidate.username === user?.username,
    );

    if (
      templeId &&
      !isAlreadyCasted &&
      user &&
      !templeById?.receivers[index].hasVoted
    ) {
      dispatch(castDownvote({templeId: templeId, username: user?.username}));
      setIsAlreadyCasted(true);
    } else {
      alert(`Vote already casted or error occured`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.maincontainer}>
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

        {isLoadingGetTempleById ? (
          <Loader msg="Loading Temple Data ... " />
        ) : (
          <Box
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mt="50%">
            <Box
              rounded="lg"
              overflow="hidden"
              style={styles.boxContainer}
              padding="10"
              borderColor={colors.cover}
              borderWidth="1"
              _light={{
                backgroundColor: colors.cover,
              }}>
              <DetailItem
                heading={'Temple Name'}
                data={templeById?.templeName}
              />
              <DetailItem
                heading={'Added By'}
                data={templeById?.addedBy.toUpperCase()}
              />
              <DetailItem
                heading={`Total Upvotes`}
                data={`${templeById?.upVotes}/${templeById?.receivers?.length}`}
              />
              <DetailItem
                heading={'Total Down Votes'}
                data={templeById?.downVotes}
              />

              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <Text style={styles.heading}>Location</Text>

                <TouchableOpacity
                  style={{
                    right: -10,
                  }}
                  onPress={() => {
                    displayLocationOnMap(templeById.location.coordinates);
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

              <Text style={styles.statement}>
                Do you think the above information is correct? Should we add
                {templeById?.templeName.toUpperCase()}?
              </Text>
            </Box>

            <VStack space={3} divider={<Divider />} w="90%" marginTop={'10%'}>
              <HStack justifyContent="space-between">
                {/* Yes or No button */}
                <CustomButton
                  title="Yes"
                  variant="solid"
                  color="white"
                  base="40%"
                  onPress={() => {
                    cast_upVote();
                  }}
                />
                <CustomButton
                  title="No"
                  variant="solid"
                  color="white"
                  base="40%"
                  onPress={() => {
                    cast_downVote();
                  }}
                />
              </HStack>
            </VStack>
          </Box>
        )}
      </View>
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
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  heading: {
    fontFamily: fonts.Signika.medium,
    fontSize: 18,
    color: colors.info,
  },
  data: {
    fontFamily: fonts.Signika.medium,
    fontSize: 15,
    color: colors.primary,
  },
  statement: {
    marginTop: 10,
    fontFamily: fonts.Signika.medium,
    fontSize: 18,
  },
});
