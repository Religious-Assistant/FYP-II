/**
 * @author Nadir 
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Text, View, FlatList} from 'native-base';
//Theme
import Header from '../../../components/Header';
import img from '../../../../assets/images/gita2_ic.png';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

//Navigation
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import Loader from '../../common/Loader';
import {
  GITA_CHAPTER_RECITATION_AREA,
  GITA_SUMMARY_RECITATION_AREA,
} from '../../../navigation/constants';

//Redux
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import RecitationStats from './RecitationStats';
import { useIsFocused } from '@react-navigation/native'
import { getChapters, getLastReadChapter, getLastReadSummary, getRecitationStats, selectChapters, selectIsLoadingChapters, selectIsLoadingLastReadChapter, selectIsLoadingLastReadSummary, selectIsLoadingSummaries, selectLastReadChapter, selectLastReadSummary, selectSummaries } from '../../../redux/slices/hindu_module_slices/reciteGitaSlice';

const ReciteGita = () => {

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const isLoadingChapters = useSelector(selectIsLoadingChapters);
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(getChapters());
    if (userData) {

      dispatch(getRecitationStats({username:userData.username}))
      dispatch(getLastReadChapter({username:userData.username}));
      dispatch(getLastReadSummary({username:userData.username}));
    }
  }, [dispatch, userData]);

  return (
    <View style={{flex: 1}}>
      <Header
        title1="Recite Gita"
        title2="Gita then becomes a witness for one on the Day of Judgment"
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
        {isLoadingChapters ? (
          <Loader msg="Loading Chapters and Verses ... " />
        ) : (
          <Tab />
        )}
      </View>
    </View>
  );
};

const ChaptersRoute = () => {

  const chapters = useSelector(selectChapters);
  const navigator = useNavigation();

  const isLoadingLastReadChapter = useSelector(selectIsLoadingLastReadChapter);
  const lastReadChapter = useSelector(selectLastReadChapter);

  //State
  const [scrollIndexForChapter, setScrollIndexForChapter] = useState(0);

  function renderRecitationScreen(item) {
    navigator.navigate(GITA_CHAPTER_RECITATION_AREA, {chapter: item});
  }

  return (
    <>
      <FlatList
        data={chapters}
        initialScrollIndex={scrollIndexForChapter}
        renderItem={({item, index}) => {
          //Get last read verse number and highlish that card

          console.log(lastReadChapter)
          //Jump to this card with initialSCrollIndex
          if (item.chapter_number == lastReadChapter?.chapterLastRead?.chapterNumber) {
            setScrollIndexForChapter(index);
          }

          return (
            <>
              {isLoadingLastReadChapter ? (
                <Loader msg="Loading Last Read Chapter ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    renderRecitationScreen(item);
                  }}>
                  <ChapterCard
                    chapter={item}
                    key={index}
                    backgroundColor={
                      item.chapter_number == lastReadChapter?.chapterLastRead?.chapterNumber
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.chapter_number == lastReadChapter?.chapterLastRead?.chapterNumber ? colors.white : colors.primary
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

const SummaryRoute = () => {
  const navigator = useNavigation();

  const summaries = useSelector(selectChapters);
  const isLoadingLastReadSummary = useSelector(selectIsLoadingLastReadSummary);
  const lastReadSummary = useSelector(selectLastReadSummary);

  //State
  const [scrollIndexForSummary, setScrollIndexForSummary] = useState(0);

  function renderRecitationScreen(item) {
    navigator.navigate(GITA_SUMMARY_RECITATION_AREA, {summary: item});
  }

  return (
    <>
      <FlatList
        data={summaries}
        initialScrollIndex={scrollIndexForSummary}
        renderItem={({item, index}) => {
          // Get last read verse number and highlish that card

          // //Jump to this card with initialSCrollIndex
          if (item.chapter_number == lastReadSummary?.summaryLastRead) {
            setScrollIndexForSummary(index);
          }

          return (
            <>
              {isLoadingLastReadSummary ? (
                <Loader msg="Loading Last Read Summary ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    renderRecitationScreen(item);
                  }}>
                  <SummaryCard
                    summary={item}
                    key={index}
                    backgroundColor={
                      item.chapter_number == lastReadSummary?.summaryLastRead
                        ? colors.tertiary
                        : colors.white
                    }
                    fontColor={
                      item.chapter_number == lastReadSummary?.summaryLastRead ? colors.white : colors.primary
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
    <RecitationStats />
  );
};

const renderScene = SceneMap({
  first: ChaptersRoute,
  second: SummaryRoute,
  third: StatsRoute,
});

function Tab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'FULL CHAPTER'},
    {key: 'second', title: 'SUMMARY'},
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

const ChapterCard = props => {
  const {chapter, backgroundColor, fontColor} = props;

  return (
    <View
      style={[styles.chapterCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={{flex: 0.1}}>
        <Text style={[styles.chapterNumber, {color: fontColor}]}>
          {chapter.chapter_number}.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={styles.chapterDetailsContainer}>
          <Text style={[styles.chapterNameEnglish, {color: fontColor}]}>
            {chapter.meaning.en}
          </Text>
          <Text style={[styles.numberOfAyahs, {color: fontColor}]}>
            Verses: {chapter.verses_count}
          </Text>
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={styles.chapterNameArabic}>{chapter.name}</Text>
      </View>
    </View>
  );
};

const SummaryCard = props => {
  const {summary, backgroundColor, fontColor} = props;

  return (
    <View
      style={[styles.chapterCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={{flex: 0.1}}>
        <Text style={[styles.chapterNumber, {color: fontColor}]}>
          {summary.chapter_number}.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={styles.chapterDetailsContainer}>
          <Text style={[styles.chapterNameEnglish, {color: fontColor}]}>
            {summary.meaning.en}
          </Text>
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <Text style={styles.chapterNameArabic}>{summary.name}</Text>
      </View>
    </View>
  );
};
export default ReciteGita;

const styles = StyleSheet.create({
  chapterCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: 8,
    backgroundColor: colors.white,
    elevation: 0.4,
  },
  chapterNumber: {
    color: colors.black,
    fontFamily: fonts.Signika.semi_bold,
    fontSize: 15,
  },
  chapterDetailsContainer: {},
  chapterNameEnglish: {
    fontSize: 16,
    fontFamily: fonts.Signika.bold,
  },
  chapterNameArabic: {
    fontSize: 18,
    fontFamily: fonts.Signika.bold,
    color: colors.success.light,
  },
  numberOfAyahs: {
    fontSize: 13,
    fontFamily: fonts.Signika.regular,
  },
});
