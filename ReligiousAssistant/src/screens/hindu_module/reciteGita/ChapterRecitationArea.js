/**
 * @author Nadir
 * @version 1.0
 */

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Loader from '../../common/Loader';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

import {FlatList, Image} from 'native-base';
import last_read_ic from '../../../../assets/images/last_read_ic.png';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {useState} from 'react';
import {
  checkChapterIsRead,
  getChapterByNumber,
  getLastReadChapter,
  getRecitationStats,
  markChapterAsRead,
  selectChapterByNumber,
  selectChapterRecitationStatus,
  selectIsLoadingChapterByNumber,
  selectIsLoadingChapterRecitationStatus,
  selectIsLoadingMarkChapterAsRead,
  selectIsLoadingMarkChapterAsUnRead,
  selectIsLoadingUpdateLastReadChapter,
  selectLastReadChapter,
  updateLastReadChapter,
} from '../../../redux/slices/hindu_module_slices/reciteGitaSlice';

const ChapterRecitationArea = ({route, navigation}) => {
  const {chapter} = route.params;
  const dispatch = useDispatch();

  const chapterByNumber = useSelector(selectChapterByNumber);
  const isLoadingChapterByNumber = useSelector(selectIsLoadingChapterByNumber);

  const isLoadingMarkChapterAsRead = useSelector(
    selectIsLoadingMarkChapterAsRead,
  );
  const isLoadingMarkChapterAsUnRead = useSelector(
    selectIsLoadingMarkChapterAsUnRead,
  );
  const isLoadingChapterRecitationStatus = useSelector(
    selectIsLoadingChapterRecitationStatus,
  );

  const chapterRecitationStatus = useSelector(selectChapterRecitationStatus);
  const {username} = useSelector(selectUserData);
  const lastReadChapter = useSelector(selectLastReadChapter);

  //State
  const [scrollIndexForVerse, setScrollIndexForVerse] = useState(0);

  useEffect(() => {
    dispatch(getChapterByNumber(chapter.chapter_number));
    if (username) {
      dispatch(
        checkChapterIsRead({
          username: username,
          chapterName: chapter.meaning.en,
        }),
      );
    }
  }, [dispatch, username]);

  function markChapterAsComplete(chapterNumber, chapterName) {
    if (username) {
      dispatch(markChapterAsRead({username, chapterNumber, chapterName}));
      dispatch(checkChapterIsRead({username, chapterName}));
      dispatch(getRecitationStats({username}));
    }
  }

  function markChapterAsInComplete(chapterNumber, chapterName) {
    if (username) {
      dispatch(markSurahAsUnRead({username, chapterNumber, chapterName}));
      dispatch(checkSurahIsRead({username, chapterName}));
      dispatch(getRecitationStats({username}));
    }
  }

  return (
    <View style={{backgroundColor: colors.white}}>
      {isLoadingChapterByNumber ||
      isLoadingMarkChapterAsRead ||
      isLoadingMarkChapterAsUnRead ? (
        <Loader msg={`Getting Chapter ${chapter.name} for you ...`} />
      ) : (
        <>
          <View style={[styles.chapterActionContainer]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 10,
                marginRight: 10,
                top: 35,
              }}>
              {isLoadingChapterRecitationStatus ? (
                <Loader msg="Loading recitation status ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    chapterRecitationStatus
                      ? markChapterAsInComplete(chapter.chapter_number, chapter.meaning.en)
                      : markChapterAsComplete(chapter.chapter_number, chapter.meaning.en);
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Signika.medium,
                      color: chapterRecitationStatus
                        ? colors.info
                        : colors.white,
                      fontSize: 16,
                    }}>
                    {chapterRecitationStatus
                      ? 'Mark as Unread'
                      : 'Mark as Read'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontFamily: fonts.Signika.bold,
                  color: colors.secondary,
                  fontSize: 20,
                }}>
                {chapter.name}
              </Text>
            </View>
          </View>
          <FlatList
            data={chapterByNumber}
            initialScrollIndex={scrollIndexForVerse}
            mb={'25%'}
            renderItem={({item, index}) => {
              // Get last read verse number and highlish that card
              const {verseNumber, chapterNumber} = lastReadChapter.chapterLastRead;

              //Jump to this card with initialSCrollIndex
              if (item.verse_number == verseNumber && chapterNumber==chapter.chapter_number) {
                setScrollIndexForVerse(index);
              }

              return (
                <>
                  <VerseCard
                    verse={item}
                    chapterNumber={chapter.chapter_number}
                    key={index}
                    username={username}
                    backgroundColor={
                      item.verse_number == verseNumber && chapterNumber==chapter.chapter_number
                        ? colors.tertiary
                        : colors.cover
                    }
                    fontColor={
                      item.verse_number == verseNumber && chapterNumber==chapter.chapter_number
                        ? colors.white
                        : colors.success.deep
                    }
                    tintColor={colors.info}
                  />
                </>
              );
            }}></FlatList>
        </>
      )}
    </View>
  );
};

const VerseCard = props => {
  const {
    verse,
    chapterNumber,
    username,
    backgroundColor,
    fontColor,
    tintColor,
  } = props;

  const dispatch = useDispatch();

  function saveLastRead(chapterNumber, verseNumber) {
    dispatch(updateLastReadChapter({username, chapterNumber, verseNumber}));
    // dispatch(getLastReadChapter({username}));
    // dispatch(getRecitationStats({username}));
  }

  return (
    <View style={[styles.verseContainer, {backgroundColor: backgroundColor}]}>
      <View style={styles.meta}>
        <Text style={[styles.metaText, {color: tintColor}]}>
          Verse {verse.verse_number}
        </Text>
        <View style={styles.actions}>
          <Pressable
            onPress={() => {
              saveLastRead(chapterNumber, verse.verse_number);
            }}>
            <Image
              source={last_read_ic}
              style={{height: 25, width: 25, tintColor: tintColor}}
              alt="Icon"
            />
          </Pressable>
        </View>
      </View>

      <Text style={[styles.verseText, {color: fontColor}]}>{verse.text}</Text>
    </View>
  );
};
export default ChapterRecitationArea;

const styles = StyleSheet.create({
  verseContainer: {
    padding: 10,
    marginTop: 5,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 2,
    flex: 1,
  },
  chapterActionContainer: {
    backgroundColor: colors.primary,
    height: 100,
  },
  verseText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 18,
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  meta: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  metaText: {
    fontFamily: fonts.Signika.bold,
  },
});
