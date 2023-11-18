/**
 * @author Nadir Hussain
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Text, View, FlatList} from 'native-base';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Header from '../../../components/Header';

//theme
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

//navigation
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLastReadSurah,
  getLastReadParah,
  getParahs,
  getSurahs,
  selectIsLoadingLastReadParah,
  selectIsLoadingLastReadSurah,
  selectIsLoadingParahs,
  selectIsLoadingSurahs,
  selectLastReadParah,
  selectLastReadSurah,
  selectParahs,
  selectSurahs,
  getRecitationStats,
} from '../../../redux/slices/muslim_module_slices/reciteQuranSlice';

import Loader from '../../common/Loader';
import {
  SURAH_RECITATION_AREA,
  PARAH_RECITATION_AREA,
} from '../../../navigation/constants';

//Redux
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import RecitationStats from './RecitationStats';
import {useIsFocused} from '@react-navigation/native';
import {useRef} from 'react';

//no connection
import NoConnectionScreen from '../../common/NoConnectionScreen';
import {checkConnected} from '../../common/CheckConnection';

const ReciteQuran = () => {
  const [connectStatus, setConnectStatus] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const isLoadingSurahs = useSelector(selectIsLoadingSurahs);
  const isLoadingParahs = useSelector(selectIsLoadingParahs);
  const isFocused = useIsFocused();

  useEffect(() => {
    checkConnected().then(res => {
      setConnectStatus(res);
    });

    dispatch(getSurahs());
    dispatch(getParahs());
    if (userData) {
      dispatch(getRecitationStats({username: userData.username}));
      dispatch(getLastReadSurah({username: userData.username}));
      dispatch(getLastReadParah({username: userData.username}));
    }
  }, [connectStatus, dispatch, userData]);

  return connectStatus ? (
    <View style={{flex: 1}}>
      <Header
        title1="Recite Quran"
        title2="Quran then becomes a witness for one on the Day of Judgment"
        image={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663412625/religious-assistant/static_assets/quran_ic_ugcdls.png'}}
        title1Size={30}
        title2Size={15}
        title1Color={colors.secondary}
        title2Color={colors.white}
        title1Family={fonts.Signika.bold}
        title2Family={fonts.Signika.medium}
        height={0.2}
      />

      <View style={{backgroundColor: colors.white, flex: 0.8}}>
        {isLoadingParahs || isLoadingSurahs ? (
          <Loader msg="Loading Surahs and Parahs ... " />
        ) : (
          <Tab />
        )}
      </View>
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
};

const SurahRoute = () => {
  const surahs = useSelector(selectSurahs);

  const navigator = useNavigation();

  const isLoadingLastReadSurah = useSelector(selectIsLoadingLastReadSurah);
  const lastReadSurah = useSelector(selectLastReadSurah);

  //State
  const [scrollIndexForSurah, setScrollIndexForSurah] = useState(0);

  function renderRecitationScreen(item) {
    navigator.navigate(SURAH_RECITATION_AREA, {surah: item});
  }

  return (
    <>
      <FlatList
        data={surahs}
        initialScrollIndex={scrollIndexForSurah}
        renderItem={({item, index}) => {
          //Get last read verse number and highlish that card

          //Jump to this card with initialSCrollIndex
          if (item.number == lastReadSurah?.surahLastRead?.surahNumber) {
            setScrollIndexForSurah(index);
          }

          return (
            <>
              {isLoadingLastReadSurah ? (
                <Loader msg="Loading Last Read Surah ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    renderRecitationScreen(item);
                  }}>
                  <SurahCard
                    surah={item}
                    key={index}
                    backgroundColor={
                      item.number == lastReadSurah?.surahLastRead?.surahNumber
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.number == lastReadSurah?.surahLastRead?.surahNumber
                        ? colors.white
                        : colors.primary
                    }
                  />
                </TouchableOpacity>
              )}
            </>
          );
        }}></FlatList>
    </>
  );
};

const ParahRoute = () => {
  const navigator = useNavigation();

  const parahs = useSelector(selectParahs);
  const isLoadingLastReadParah = useSelector(selectIsLoadingLastReadParah);
  const lastReadParah = useSelector(selectLastReadParah);

  const refContainer = useRef(null);

  //State
  const [scrollIndexForParah, setScrollIndexForParah] = useState(0);

  function renderRecitationScreen(item) {
    navigator.navigate(PARAH_RECITATION_AREA, {parah: item});
  }

  return (
    <>
      <FlatList
        ref={refContainer}
        data={parahs}
        initialScrollIndex={scrollIndexForParah}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            refContainer.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        renderItem={({item, index}) => {
          // Get last read verse number and highlish that card

          // //Jump to this card with initialSCrollIndex
          if (item.number == lastReadParah?.parahLastRead?.parahNumber) {
            setScrollIndexForParah(index);
          }

          return (
            <>
              {isLoadingLastReadParah ? (
                <Loader msg="Loading Last Read Parah ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    renderRecitationScreen(item);
                  }}>
                  <ParahCard
                    parah={item}
                    key={index}
                    backgroundColor={
                      item.number == lastReadParah?.parahLastRead?.parahNumber
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.number == lastReadParah?.parahLastRead?.parahNumber
                        ? colors.white
                        : colors.primary
                    }
                  />
                </TouchableOpacity>
              )}
            </>
          );
        }}></FlatList>
    </>
  );
};
const StatsRoute = () => {
  return <RecitationStats />;
};

const renderScene = SceneMap({
  first: SurahRoute,
  second: ParahRoute,
  third: StatsRoute,
});

function Tab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BY SURAH'},
    {key: 'second', title: 'BY PARAH'},
    {key: 'third', title: 'My PROGRESS'},
  ]);

  const initialLayout = useWindowDimensions();

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: initialLayout.width}}
      renderTabBar={props => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colors.secondary}}
            style={{
              backgroundColor: colors.white,
            }}
            activeColor={colors.secondary}
            inactiveColor={colors.primary}
            labelStyle={{fontFamily: fonts.Signika.medium}}
          />
        );
      }}
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
}

const SurahCard = props => {
  const {surah, backgroundColor, fontColor} = props;

  return (
    <View
      style={[styles.surahCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={{flex: 0.1}}>
        <Text style={[styles.surahNumber, {color: fontColor}]}>
          {surah.number}.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={styles.surahDetailsContainer}>
          <Text style={[styles.surahNameEnglish, {color: fontColor}]}>
            {surah.englishName}
          </Text>
          <Text style={[styles.numberOfAyahs, {color: fontColor}]}>
            Ayahs: {surah.numberOfAyahs}
          </Text>
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={styles.surahNameArabic}>{surah.name}</Text>
      </View>
    </View>
  );
};

const ParahCard = props => {
  const {parah, backgroundColor, fontColor} = props;

  return (
    <View
      style={[styles.surahCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={{flex: 0.1}}>
        <Text style={[styles.surahNumber, {color: fontColor}]}>
          {parah.number}.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={styles.surahDetailsContainer}>
          <Text style={[styles.surahNameEnglish, {color: fontColor}]}>
            {parah.englishName}
          </Text>
          {/* <Text style={[styles.numberOfAyahs, {color:fontColor}]}>Ayahs: {parah.numberOfAyahs}</Text> */}
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={styles.surahNameArabic}>{parah.name}</Text>
      </View>
    </View>
  );
};
export default ReciteQuran;

const styles = StyleSheet.create({
  surahCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: 8,
    backgroundColor: colors.white,
    elevation: 0.4,
  },
  surahNumber: {
    color: colors.black,
    fontFamily: fonts.Signika.semi_bold,
    fontSize: 15,
  },
  surahDetailsContainer: {},
  surahNameEnglish: {
    fontSize: 16,
    fontFamily: fonts.Signika.bold,
  },
  surahNameArabic: {
    fontSize: 18,
    fontFamily: fonts.Signika.bold,
    color: colors.success.light,
  },
  numberOfAyahs: {
    fontSize: 13,
    fontFamily: fonts.Signika.regular,
  },
});
