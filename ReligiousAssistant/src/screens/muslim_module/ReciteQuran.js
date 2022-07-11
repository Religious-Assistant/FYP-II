import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Text, View, Center, FlatList} from 'native-base';

//Theme
import Header from '../../components/Header';
import img from '../../../assets/images/quran_ic.png';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

//Navigation
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
} from '../../redux/slices/muslim_module_slices/reciteQuranSlice';
import Loader from '../common/Loader';
import {
  SURAH_RECITATION_AREA,
  PARAH_RECITATION_AREA,
} from '../../navigation/constants';
import {selectUserData} from '../../redux/slices/auth_slices/authSlice';

//Redux

const ReciteQuran = () => {
  const dispatch = useDispatch();
  const {username} = useSelector(selectUserData);
  const isLoadingSurahs = useSelector(selectIsLoadingSurahs);
  const isLoadingParahs = useSelector(selectIsLoadingParahs);

  useEffect(() => {
    dispatch(getSurahs());
    dispatch(getParahs());

    if (username) {
      dispatch(getLastReadSurah({username}));
      dispatch(getLastReadParah({username}));
    }
  }, [dispatch, username]);

  return (
    <View style={{flex: 1}}>
      <Header
        title1="Recite Quran"
        title2="Quran then becomes a witness for one on the Day of Judgment"
        image={img}
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
          const {surahNumber} = lastReadSurah.surahLastRead;

          //Jump to this card with initialSCrollIndex
          if (item.number == surahNumber) {
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
                      item.number == surahNumber
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.number == surahNumber ? colors.white : colors.primary
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

  //State
  const [scrollIndexForParah, setScrollIndexForParah] = useState(0);

  function renderRecitationScreen(item) {
    navigator.navigate(PARAH_RECITATION_AREA, {parah: item});
  }

  return (
    <>
      <FlatList
        data={parahs}
        initialScrollIndex={scrollIndexForParah}
        renderItem={({item, index}) => {
          // Get last read verse number and highlish that card
          const {parahNumber} = lastReadParah.parahLastRead;

          // //Jump to this card with initialSCrollIndex
          if (item.number == parahNumber) {
            setScrollIndexForParah(index)
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
                      item.number == parahNumber
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.number == parahNumber ? colors.white : colors.primary
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
  return (
    <Center flex={1} my="4">
      This is Tab 3
    </Center>
  );
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
