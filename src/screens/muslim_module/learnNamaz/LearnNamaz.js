/**
 * @author Kinza Kiran
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
import CircularProgress from 'react-native-circular-progress-indicator';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//to check connection
import NoConnectionScreen from '../../common/NoConnectionScreen';
import {checkConnected} from '../../common/CheckConnection';

//component
import Loader from '../../common/Loader';

//redux
import {
  getUserData,
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {NAMAZ_PLAY_AREA} from '../../../navigation/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLearnNamazProgress,
  selectIsLoadingGetNamazProgress,
  selectLearnNamazProgress,
} from '../../../redux/slices/muslim_module_slices/learnNamazSlice';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export default function LearnNamaz() {
  const [connectStatus, setConnectStatus] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const namazProgress = useSelector(selectLearnNamazProgress);

  const isLoadingGetNamazProgress = useSelector(
    selectIsLoadingGetNamazProgress,
  );

  useEffect(() => {
    checkConnected().then(res => {
      console.log(res);
      setConnectStatus(res);
    });

    dispatch(getUserData());

    if (user) {
      dispatch(getLearnNamazProgress({username: user?.username}));
    }
  }, [connectStatus, dispatch]);

  const NAMAZ_TIMES = [
    {
      id: 1,
      name: 'EmptyLeft',
      disabled: false,
    },
    {
      id: 2,
      name: 'Fajr',
      poster:
        'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413223/religious-assistant/static_assets/fajr_game_mcrwni.jpg',
      level: 'Level 1',
      rakahs: [
        {key: 1, rakatName: 'Sunnat', rakats: '2'},
        {key: 2, rakatName: 'Farz', rakats: '2'},
      ],
      disabled: false,
    },
    {
      id: 3,
      name: 'Duhr',
      poster:
        'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413442/religious-assistant/static_assets/duhr_game_hzfzun.jpg',
      level: 'Level 2',
      rakahs: [
        {key: 3, rakatName: 'Sunnat', rakats: '4'},
        {key: 4, rakatName: 'Farz', rakats: '4'},
        {key: 5, rakatName: 'Sunnat', rakats: '2'},
        {key: 6, rakatName: 'Nafl', rakats: '2'},
      ],
      disabled:
        namazProgress?.fajr?.hasLearned2Sunnah &&
        namazProgress?.fajr?.hasLearned2Farz &&
        namazProgress.score >= 20
          ? false
          : true,
    },
    {
      id: 4,
      name: 'Asr',
      poster:
        'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413452/religious-assistant/static_assets/asr_game_v93qvb.jpg',
      level: 'Level 3',
      rakahs: [
        {key: 7, rakatName: 'Sunnat', rakats: '4'},
        {key: 8, rakatName: 'Farz', rakats: '4'},
      ],
      disabled:
        namazProgress?.zuhr?.hasLearned2Sunnah &&
        namazProgress?.zuhr?.hasLearned4Sunnah &&
        namazProgress?.zuhr?.hasLearned4Farz &&
        namazProgress?.zuhr?.hasLearned2Nafl &&
        namazProgress?.score >= 60
          ? false
          : true,
    },
    {
      id: 5,
      name: 'Maghrib',
      poster:
        'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413457/religious-assistant/static_assets/maghrib_game_lluwmd.jpg',
      level: 'Level 4',
      rakahs: [
        {key: 9, rakatName: 'Farz', rakats: '3'},
        {key: 10, rakatName: 'Sunnat', rakats: '2'},
        {key: 11, rakatName: 'Nafl', rakats: '2'},
      ],
      disabled:
        namazProgress?.asr?.hasLearned4Sunnah &&
        namazProgress?.asr?.hasLearned4Farz &&
        namazProgress.score >= 80
          ? false
          : true,
    },
    {
      id: 6,
      name: 'Isha',
      poster:
        'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413465/religious-assistant/static_assets/isha_game_ydhxhf.jpg',
      level: 'Level 5',
      rakahs: [
        {key: 12, rakatName: 'Sunnat', rakats: '4'},
        {key: 13, rakatName: 'Farz', rakats: '4'},
        {key: 14, rakatName: 'Sunnat', rakats: '2'},
        {key: 15, rakatName: 'Nafl', rakats: '2'},
        {key: 16, rakatName: 'Witr', rakats: '3'},
        {key: 17, rakatName: 'Nafl', rakats: '2'},
      ],
      disabled:
        namazProgress?.maghrib?.hasLearned2Sunnah &&
        namazProgress?.maghrib?.hasLearned3Farz &&
        namazProgress?.maghrib?.hasLearned2Nafl &&
        namazProgress.score >= 110
          ? false
          : true,
    },
    {
      id: 7,
      name: 'EmptyRight',
      disabled: false,
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

  return connectStatus ? (
    <SafeAreaView style={styles.MainContainer}>
      {isLoadingGetNamazProgress ? (
        <Loader msg="Getting progress..." />
      ) : (
        <>
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
              <View style={{flex: 0.5, left: 5}}>
                <Image
                  source={{
                    uri: user?.avatar,
                  }}
                  style={{
                    marginTop: '10%',
                    marginBottom: '5%',
                    height: 80,
                    width: 80,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                  alt="icon .."
                />
              </View>
              <View style={{flex: 0.9, marginLeft: '10%'}}>
                <Heading color={colors.secondary} marginTop={'5%'}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    {user?.username?.toUpperCase()}{' '}
                  </Text>
                </Heading>
                <Heading color={colors.white}>
                  <Text style={{fontFamily: fonts.Signika.bold}}>
                    Level {namazProgress?.level}
                  </Text>
                </Heading>
              </View>

              <View style={{flexDirection: 'row', right: 5}}>
                <Text
                  style={{
                    textAlignVertical: 'center',
                    fontFamily: fonts.Signika.bold,
                    color: colors.white,
                    padding: 10,
                  }}>
                  Progress %
                </Text>
                <CircularProgress
                  value={(namazProgress?.score * 100) / 110}
                  radius={40}
                  inActiveStrokeOpacity={0.5}
                  activeStrokeWidth={15}
                  inActiveStrokeWidth={20}
                  progressValueStyle={{fontWeight: '100', color: 'white'}}
                  activeStrokeSecondaryColor={colors.secondary}
                  inActiveStrokeColor={colors.cover}
                  duration={1000}
                  dashedStrokeConfig={{
                    count: 50,
                    width: 4,
                  }}
                />
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
                    }}
                    disabled={item.disabled}>
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
                        <Image
                          source={{
                            uri: item.disabled
                              ? 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413551/religious-assistant/static_assets/level_lock_ic_k1gtr5.gif'
                              : item.poster,
                          }}
                          style={styles.posterImage}
                        />
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
        </>
      )}
    </SafeAreaView>
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

const RakahList = props => {
  const {rakahs, namazName} = props;
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
        extraData={rakahs}
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
});
