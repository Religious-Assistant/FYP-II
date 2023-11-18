/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, Center, Box} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {setTab} from '../../../redux/slices/muslim_module_slices/bottomNavSlice';

//to check connection
import NoConnectionScreen from '../../common/NoConnectionScreen';
import {checkConnected} from '../../common/CheckConnection';
import {
  selectNamazTimesForUser,
  selectIsLoadingNamazTimesForUser,
  getNamazTimesForUser,
} from '../../../redux/slices/muslim_module_slices/mosqueNamazTimingsSlice';
import {getUserData, selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import Loader from '../../common/Loader';
import {useIsFocused} from '@react-navigation/native';
import {
  getMosqueById,
  selectMosqueById,
} from '../../../redux/slices/muslim_module_slices/mosqueSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NamazTimeByMoque({navigation}) {
  const [connectStatus, setConnectStatus] = useState(false);

  const dispatch = useDispatch();
  const mosqueTimes = useSelector(selectNamazTimesForUser);
  const isLoadingNamazTimes = useSelector(selectIsLoadingNamazTimesForUser);
  const user = useSelector(selectUserData);
  const mosqueById = useSelector(selectMosqueById);

  const [namazTimes, setNamazTimes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {

    dispatch(getUserData())
    if (user) {


      const getData=async()=>{
        const data=await AsyncStorage.getItem('user')
        return await JSON.parse(data)
      }

      getData().then(data=>{
        console.log(data)
        dispatch(
          getNamazTimesForUser({mosqueId: data?.preferences?.primaryMosque}),
        );
        dispatch(getMosqueById({mosqueId: data?.preferences?.primaryMosque}));
      })
      
    
    }

    if(user){

      setNamazTimes([
        {
          key: 1,
          title: 'Fajr',
          startTime: mosqueTimes?.fajr?.startTime,
          endTime: mosqueTimes?.fajr?.endTime,
          image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573861/religious-assistant/static_assets/fajr_img_ihd1vm.webp'},
        },
        {
          key: 2,
          title: 'Zuhr',
          startTime: mosqueTimes?.zuhr?.startTime,
          endTime: mosqueTimes?.zuhr?.endTime,
          image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573872/religious-assistant/static_assets/duhr_img_cdbc12.webp'},
        },
        {
          key: 3,
          title: 'Asr',
          startTime: mosqueTimes?.asr?.startTime,
          endTime: mosqueTimes?.asr?.endTime,
          image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573881/religious-assistant/static_assets/asr_img_eyygmx.png'},
        },
        {
          key: 4,
          title: 'Maghrib',
          startTime: mosqueTimes?.maghrib?.startTime,
          endTime: mosqueTimes?.maghrib?.endTime,
          image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573890/religious-assistant/static_assets/maghrib_img_p2uriw.png'},
        },
        {
          key: 5,
          title: 'Isha',
          startTime: mosqueTimes?.isha?.startTime,
          endTime: mosqueTimes?.isha?.endTime,
          image: {uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573897/religious-assistant/static_assets/isha_img_nu5mul.webp'},
        },
      ]);
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    checkConnected().then(res => {
      setConnectStatus(res);
    });

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab('Prayers'));
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [connectStatus, navigation, dispatch]);

  return connectStatus ? (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flex: 0.17,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
          <Heading color={colors.secondary} marginLeft="10%" marginTop={'10%'}>
            <Text style={{fontFamily: fonts.Signika.bold}}>
              The Key of Jannah is{' '}
            </Text>
            <Heading color={colors.white}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Salah</Text>
            </Heading>
          </Heading>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <Image
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663573340/religious-assistant/static_assets/clock_ic_k3h21w.png'}}
            style={{
              marginTop: '12%',
              marginRight: '5%',
              height: 100,
              width: 100,
            }}
            alt="icon .."
          />
        </View>
      </View>
      {isLoadingNamazTimes ? (
        <Loader msg="Loading times ..." />
      ) : (
        <View style={{flex: 0.83}} width="95%">
          <Center
            width="85%"
            space={2}
            maxW="85%"
            marginTop={'5%'}
            marginLeft={'5%'}
            marginBottom={'5%'}>
            {/* Namaz timings of a mosque */}
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: fonts.Signika.bold,
                  color: colors.primary,
                  marginLeft: '8%',
                  fontSize: 16,
                }}>
                Namaz Timings in
              </Text>
              <Text
                style={{
                  color: colors.info,
                  fontFamily: fonts.Signika.bold,
                  marginLeft: '2%',
                  marginTop: '0.5%',
                }}>
                {mosqueById?.mosqueName?.toUpperCase()}
              </Text>
            </View>
          </Center>
          {namazTimes.map((itm, index) => {
            return (
              <Box
                key={itm.key}
                p={-5}
                width="100%"
                bg={colors.cover}
                mt="3%"
                ml="2%"
                borderWidth={4}
                borderRadius={4}
                borderColor={colors.cover}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={itm.image}
                    style={{
                      height: 65,
                      width: 65,
                    }}
                    alt="icon .."
                  />
                  {/* Start time of prayer */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.text}>Start time</Text>
                    <Text style={styles.startTime}>{itm.startTime}</Text>
                  </View>
                  {/* Emd time of prayer */}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.text}>End time</Text>
                    <Text style={styles.endTime}>{itm.endTime}</Text>
                  </View>
                </View>
              </Box>
            );
          })}
        </View>
      )}
    </View>
  ) : (
    <NoConnectionScreen
      onCheck={() => {
        checkConnected().then(res => {
          setConnectStatus(res);
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  startTime: {
    fontFamily: fonts.Signika.medium,
    color: colors.success.deep,
    marginTop: '5%',
    marginLeft: '6%',
    fontSize: 20,
  },
  endTime: {
    fontFamily: fonts.Signika.medium,
    color: colors.error,
    marginTop: '5%',
    marginLeft: '6%',
    fontSize: 20,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});
