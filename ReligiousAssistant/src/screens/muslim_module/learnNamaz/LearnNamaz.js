/* @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Animated,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {
  Heading,
  Box,
  FlatList,
  VStack,
  HStack,
  Spacer,
  Modal,
} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import fajrImg from '../../../../assets/images/fajr_game.jpg';
import duhrImg from '../../../../assets/images/duhr_game.png';
import asrImg from '../../../../assets/images/asr_game.png';
import maghribImg from '../../../../assets/images/maghrib_game.png';
import ishaImg from '../../../../assets/images/isha_game.png';

import Loader from '../../common/Loader';
import { selectUserData } from '../../../redux/slices/auth_slices/authSlice';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

import {useNavigation} from '@react-navigation/native';
import {NAMAZ_PLAY_AREA} from '../../../navigation/constants';
import { useDispatch, useSelector } from 'react-redux';


export default function LearnNamaz() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const username=user.username;
  const avatar = user.avatar;
  //console.log(avatar)

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getAnnouncements({username: user.username}));
  //   }
  // }, []);
  
  const NAMAZ_TIMES = [
    {
      id: 1,
      name: 'EmptyLeft',
    },
    {
      id: 2,
      name: 'Fajr',
      poster: fajrImg,
      level: 'Level 1',
      rakahs: [
        {key: 1, rakatName: 'Sunnat', rakats: '2'},
        {key: 2, rakatName: 'Farz', rakats: '2'},
      ],
    },
    {
      id: 3,
      name: 'Duhr',
      poster: duhrImg,
      level: 'Level 2',
      rakahs: [
        {key: 3, rakatName: 'Sunnat', rakats: '4'},
        {key: 4, rakatName: 'Farz', rakats: '4'},
        {key: 5, rakatName: 'Sunnat', rakats: '2'},
        {key: 6, rakatName: 'Nafl', rakats: '2'},
      ],
    },
    {
      id: 4,
      name: 'Asr',
      poster: asrImg,
      level: 'Level 3',
      rakahs: [
        {key: 7, rakatName: 'Sunnat', rakats: '4'},
        {key: 8, rakatName: 'Farz', rakats: '4'},
      ],
    },
    {
      id: 5,
      name: 'Maghrib',
      poster: maghribImg,
      level: 'Level 4',
      rakahs: [
        {key: 9, rakatName: 'Farz', rakats: '3'},
        {key: 10, rakatName: 'Sunnat', rakats: '2'},
        {key: 11, rakatName: 'Nafl', rakats: '2'},
      ],
    },
    {
      id: 6,
      name: 'Isha',
      poster: ishaImg,
      level: 'Level 5',
      rakahs: [
        {key: 12, rakatName: 'Sunnat', rakats: '4'},
        {key: 13, rakatName: 'Farz', rakats: '4'},
        {key: 14, rakatName: 'Sunnat', rakats: '2'},
        {key: 15, rakatName: 'Nafl', rakats: '2'},
        {key: 16, rakatName: 'Witr', rakats: '3'},
        {key: 17, rakatName: 'Nafl', rakats: '2'},
      ],
    },
    {
      id: 7,
      name: 'EmptyRight',
    },
  ];

  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 1,
          backgroundColor: 'white',
        }}
      />
    );
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [state, setState] = useState({
    showModal: false,
    rakahs: [],
    namazName: '',
  });

  function setModal(modalState) {
    setState({...state, showModal: modalState});
  }

  function detectPress(modalState, rakats, name) {
    setState({showModal: modalState, rakahs: rakats, namazName: name});
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
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
              source={{
                uri: avatar,
              }}
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginBottom: '5%',
                height: 80,
                width: 80,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>{username} </Text>
            </Heading>
            <Heading color={colors.white}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Level 1</Text>
            </Heading>
          </View>
        </View>
      </View>
      <Animated.FlatList
        data={NAMAZ_TIMES}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{alignItems: 'center'}}
        snapToAlignment="start"
        snapToInterval={ITEM_SIZE}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.85}
        renderToHardwareTextureAndroid
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
          });
          // console.log(item.rakahs)
          return (
            <>
              <Pressable
                onPress={() => {
                  detectPress(true, item.rakahs, item.name);
                }}>
                <View style={{width: ITEM_SIZE}}>
                  <Animated.View
                    style={{
                      marginHorizontal: SPACING,
                      padding: SPACING * 2,
                      alignItems: 'center',
                      transform: [{translateY}],
                      backgroundColor: colors.cover,
                      borderRadius: 34,
                    }}>
                    <Image source={item.poster} style={styles.posterImage} />
                    <Text
                      style={{
                        fontSize: 26,
                        color: colors.primary,
                        fontFamily: fonts.Signika.bold,
                      }}
                      numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.secondary,
                        fontFamily: fonts.Signika.bold,
                      }}
                      numberOfLines={3}>
                      {item.level}
                    </Text>
                  </Animated.View>
                </View>
              </Pressable>

              <Modal
                isOpen={state.showModal}
                onClose={() => setState({...state, showModal: false})}>
                <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>Select Rakah to Learn</Modal.Header>
                  <Modal.Body>
                    <RakahList
                      setModal={setModal}
                      rakahs={state.rakahs}
                      namazName={state.namazName}></RakahList>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const RakahList = props => {
  const {rakahs, namazName} = props;
  console.log('Namaz NAME', namazName);
  const navigator = useNavigation();
  function navigateToGame(item) {
    props.setModal(false);
    navigator.navigate(NAMAZ_PLAY_AREA, {
      namazInfo: item,
      namazName: namazName,
    });
  }

  //Should come from prop

  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      <FlatList
        data={rakahs}
        keyboardDismissMode
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            key={item.id}
            onPress={() => {
              navigateToGame(item);
            }}>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2">
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text style={styles.modalText}>{item.rakatName}</Text>
                </VStack>
                <Spacer />
                <Text
                  style={styles.modalText}
                  fontSize="xs"
                  alignSelf="flex-start">
                  {item.rakats}
                </Text>
              </HStack>
            </Box>
          </Pressable>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 24,
    fontFamily: fonts.Signika.bold,
    marginRight: '45%',
    color: colors.white,
  },
  modalText: {
    color: colors.black,
    fontFamily: fonts.Signika.bold,
  },

  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 0,
    margin: 0,
    marginBottom: 10,
  },
  headerImg: {
    width: '20%',
    height: '75%',
    resizeMode: 'cover',
    borderRadius: 50,
    marginTop: '3%',
    marginLeft: '3%',
  },
});
