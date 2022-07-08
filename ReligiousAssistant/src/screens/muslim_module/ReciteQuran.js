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
  getSurahs,
  selectIsLoadingLastReadSurah,
  selectIsLoadingSurahs,
  selectLastReadSurah,
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
        <Tab />
      </View>
    </View>
  );
};

const SurahRoute = () => {
  const surahs = useSelector(selectSurahs);
  const isLoadingSurahs = useSelector(selectIsLoadingSurahs);
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const isLoadingLastReadSurah = useSelector(selectIsLoadingLastReadSurah);
  const lastReadSurah = useSelector(selectLastReadSurah);
  const {username} = useSelector(selectUserData);

  //State
  const [scrollIndexForSurah, setScrollIndexForSurah] = useState(0);

  useEffect(() => {
    if (!surahs) {
      dispatch(getSurahs());
    }

    if (username) {
      dispatch(getLastReadSurah({username}));
    }
  }, [dispatch, username]);

  function renderRecitationScreen(item) {
    navigator.navigate(SURAH_RECITATION_AREA, {surah: item});
  }

  return (
    <>
      {isLoadingSurahs ? (
        <Loader msg="Loading Surahs ..." />
      ) : (
        <FlatList
          data={surahs}
          initialScrollIndex={scrollIndexForSurah}
          renderItem={({item, index}) => {
            //Get last read verse number and highlish that card
            const {surahNumber} = lastReadSurah.surahLastRead;

            //Jump to this card with initialSCrollIndex
            if (item.number == surahNumber) {
              setScrollIndexForSurah(index)
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
                    />
                  </TouchableOpacity>
                )}
              </>
            );
          }}></FlatList>
      )}
    </>
  );
};

const ParahRoute = () => {
  return (
    <Center flex={1} my="4">
      This is Tab 2
    </Center>
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
  const {surah, backgroundColor} = props;

  return (
    <View
      style={[styles.surahCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={{flex: 0.1}}>
        <Text style={styles.surahNumber}>{surah.number}.</Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={styles.surahDetailsContainer}>
          <Text style={styles.surahNameEnglish}>{surah.englishName}</Text>
          <Text style={styles.numberOfAyahs}>Ayahs: {surah.numberOfAyahs}</Text>
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={styles.surahNameArabic}>{surah.name}</Text>
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
    fontSize: 16,
    fontFamily: fonts.Signika.bold,
    color: colors.success.light,
  },
  numberOfAyahs: {
    fontSize: 13,
    fontFamily: fonts.Signika.regular,
  },
});
