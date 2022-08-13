/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Heading, Image} from 'native-base';
import timeICon from '../../../../assets/images/applyAsImam_ic.png';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import CustomButton from '../../../components/CustomButton';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getClosestMosques,
  selectClosestMosques,
  selectIsLoadingClosestMosques,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../common/Loader';

export default function ApplyAsImam() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigator = useNavigation();

  const user = useSelector(selectUserData);
  const closesMosques = useSelector(selectClosestMosques);
  const isLoadingClosestMosque = useSelector(selectIsLoadingClosestMosques);
  const [mosqueData, setMosqueData]=useState([])
  const [selectedMosque, setSelectedMosque]=useState(null)

  useEffect(() => {
    if (user) {
      dispatch(
        getClosestMosques({
          longitude: user?.location?.coordinates[0],
          latitude: user?.location?.coordinates[1],
        }),
      );
    }

    if(closesMosques){
      const mosques=[]
      closesMosques.map(mosque=>{
        mosques.push({id:mosque._id, name:mosque.mosqueName})
      })

      setMosqueData(mosques)
    }
  }, [dispatch, isFocused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        {/* header */}
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
              source={timeICon}
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginBottom: '5%',
                height: 100,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Apply as </Text>
            </Heading>
            <Heading color={colors.white} marginLeft="10%">
              <Text style={{fontFamily: fonts.Signika.bold}}>Imaam</Text>
            </Heading>
          </View>
        </View>
        {isLoadingClosestMosque ? (
          <Loader msg="Loading closest mosque ..." />
        ) : (
          <View
            style={{flex: 0.83, marginTop: '70%', marginLeft: '5%'}}
            width="90%">
            {/* dropdown to select mosque */}
            {mosqueData?.length > 0 ?
                <SearchableDropdown
                  maxW="90%"
                  width="100"
                  onTextChange={text => console.log(text)}
                  onItemSelect={item => {
                    setSelectedMosque(item)
                    alert(JSON.stringify(`You selected ${item?.name?.toUpperCase()}`))}
                  }
                  containerStyle={{padding: 5}}
                  textInputStyle={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: colors.white,
                    backgroundColor: colors.tertiary,
                    fontFamily: fonts.Signika.medium,
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: colors.cover,
                    borderColor: '#bbb',
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    color: colors.black,
                    fontFamily: fonts.Signika.medium,
                  }}
                  itemsContainerStyle={{
                    maxHeight: '50%',
                  }}
                  items={mosqueData}
                  defaultIndex={0}
                  placeholder="Select Mosque"
                  placeholderTextColor={colors.white}
                  resetValue={false}
                  underlineColorAndroid="transparent"
                />: (
              <></>
            )}

            <CustomButton
              title="Apply As Imaam"
              variant="solid"
              mt="8%"
              color="white"
              base="99%"
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
