/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View} from 'react-native';
import React, {useEffect} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  Heading,
  Image,
  Text,
  Center,
  VStack,
  Box,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import voteIcon from '../../../../assets/images/vote_ic.png';

import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoadingAddNewMosque,
  selectNewAddedMosque,
  selectMosqueById,
  getMosqueById,
  selectIsLoadingGetMosqueById,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';
import Loader from '../../common/Loader';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAP_DIRECTIONS } from '../../../navigation/constants';

export default function MosqueConsensusNoti({route, navigation}) {
  const {mosqueId} = route.params;

  const dispatch = useDispatch();
  const navigator=useNavigation()

  const isLoadingGetMosqueById = useSelector(selectIsLoadingGetMosqueById);
  const mosqueById=useSelector(selectMosqueById)

  useEffect(() => {
    if (mosqueId) {
      dispatch(getMosqueById({mosqueId: mosqueId}));
      console.log(mosqueById)
    }
  }, [dispatch]);

  const displayLocationOnMap=(destinationCoordinates)=>{

    navigator.navigate(GOOGLE_MAP_DIRECTIONS,{destinationCoordinates})

  }

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

        {isLoadingGetMosqueById ? (
          <Loader msg="Loading Mosque Data ... " />
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

              <DetailItem heading={"Mosque Name"} data={mosqueById?.mosqueName} />
              <DetailItem heading={"Added By"} data={mosqueById?.addedBy} />
              <DetailItem heading={`Total Upvotes out of ${mosqueById?.totalReceivers}`} data={mosqueById?.upVotes} />
              <DetailItem heading={"Total Down Votes"} data={mosqueById?.downVotes} />

              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  _light={{
                    color: colors.info,
                  }}
                  _text={{fontFamily: fonts.Signika.bold}}>
                  Location
                </Text>

                <Text
                  color={colors.muted}
                  style={{fontFamily: fonts.Signika.regular}}
                  fontWeight="400"
                  onPress={()=>{displayLocationOnMap(mosqueById.location.coordinates)}}
                  >
                    See Here
                </Text>
                
              </View>
              

              <Text style={styles.statement}>
                Do you think the above information is correct? Should we add
                Sukkur IBA mosque?
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
                    console.log('Yes');
                  }}
                />
                <CustomButton
                  title="No"
                  variant="solid"
                  color="white"
                  base="40%"
                  onPress={() => {
                    console.log('No');
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

const DetailItem=({heading, data})=>{

  return(
    <View style={styles.itemContainer}>
    <Text
    style={styles.heading}
>
{heading}
    </Text>

    <Text style={styles.data}>
      {data}
    </Text>
    
  </View>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  itemContainer:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop:10,  
  },
  heading:{
    fontFamily:fonts.Signika.medium,
    fontSize:18,
    color:colors.info
  },
  data:{
    fontFamily:fonts.Signika.medium,
    fontSize:15,
    color:colors.primary
  }
});
