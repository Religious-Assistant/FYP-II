import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkSurahIsRead,
  getLastReadSurah,
  getRecitationStats,
  getSurahByNumber,
  markSurahAsRead,
  markSurahAsUnRead,
  selectIsLoadingLastReadSurah,
  selectIsLoadingMarkParahAsUnRead,
  selectIsLoadingMarkSurahAsRead,
  selectIsLoadingSurahByNumber,
  selectIsLoadingSurahRecitationStatus,
  selectIsLoadingUpdateLastReadSurah,
  selectLastReadSurah,
  selectRecitedSurahs,
  selectSurahByNumber,
  selectSurahRecitationStatus,
  updateLastReadSurah,
} from '../../redux/slices/muslim_module_slices/reciteQuranSlice';
import Loader from '../common/Loader';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

import {FlatList, Image} from 'native-base';
import last_read_ic from '../../../assets/images/last_read_ic.png';
import {
  selectUserData,
} from '../../redux/slices/auth_slices/authSlice';
import {useState} from 'react';

const SurahRecitationArea = ({route, navigation}) => {
  const {surah} = route.params;
  const dispatch = useDispatch();

  const surahByNumber = useSelector(selectSurahByNumber);
  const isLoadingSurahByNumber = useSelector(selectIsLoadingSurahByNumber);
  const isLoadingMarkSurahAsRead = useSelector(selectIsLoadingMarkSurahAsRead);
  const isLoadingMarkSurahAsUnRead = useSelector(
    selectIsLoadingMarkParahAsUnRead,
  );
  const isLoadingSurahRecitationStatus = useSelector(
    selectIsLoadingSurahRecitationStatus,
  );

  const surahRecitationStatus = useSelector(selectSurahRecitationStatus);
  const {username} = useSelector(selectUserData);
  const isLoadingLastReadSurah = useSelector(selectIsLoadingLastReadSurah);
  const lastReadSurah = useSelector(selectLastReadSurah);

  //State
  const [scrollIndexForAyah, setScrollIndexForAyah] = useState(0);

  useEffect(() => {
    dispatch(getSurahByNumber(surah.number));
    if (username) {
      dispatch(
        checkSurahIsRead({username: username, surahName: surah.englishName}),
      );
    }
  }, [dispatch, username]);

  function markSurahAsComplete(surahNumber, surahName) {
    if (username) {
      dispatch(markSurahAsRead({username, surahNumber, surahName}));
      dispatch(checkSurahIsRead({username, surahName}));
      dispatch(getRecitationStats({username}))
    }
  }

  function markSurahAsInComplete(surahNumber, surahName) {
    if (username) {
      dispatch(markSurahAsUnRead({username, surahNumber, surahName}));
      dispatch(checkSurahIsRead({username, surahName}));
      dispatch(getRecitationStats({username}))
    }
  }

  return (
    <View style={{backgroundColor: colors.white}}>
      {isLoadingSurahByNumber ||
      isLoadingMarkSurahAsRead ||
      isLoadingMarkSurahAsUnRead ? (
        <Loader msg={`Getting Surah ${surah.englishName} for you ...`} />
      ) : (
        <>
          <View style={[styles.surahActionContainer]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 10,
                marginRight: 10,
                top: 35,
              }}>
              {isLoadingSurahRecitationStatus ? (
                <Loader msg="Loading recitation status ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    surahRecitationStatus
                      ? markSurahAsInComplete(surah.number, surah.englishName)
                      : markSurahAsComplete(surah.number, surah.englishName);
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Signika.medium,
                      color: surahRecitationStatus ? colors.info : colors.white,
                      fontSize: 16,
                    }}>
                    {surahRecitationStatus ? 'Mark as Unread' : 'Mark as Read'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontFamily: fonts.Signika.bold,
                  color: colors.secondary,
                  fontSize: 20,
                }}>
                {surah.name}
              </Text>
            </View>
          </View>
          <FlatList
            data={surahByNumber.ayahs}
            initialScrollIndex={scrollIndexForAyah}
            mb={'25%'}
            renderItem={({item, index}) => {
              //Get last read verse number and highlish that card
              const {verseNumber} = lastReadSurah.surahLastRead;

              //Jump to this card with initialSCrollIndex
              if (item.number == verseNumber) {
                setScrollIndexForAyah(index);
              }

              return (
                <>
                  {isLoadingLastReadSurah ? (
                    <Loader msg="Loading Last Read ... " />
                  ) : (
                    <AyahCard
                      ayah={item}
                      surahNumber={surah.number}
                      key={item.number}
                      username={username}
                      backgroundColor={
                        item.number == verseNumber
                          ? colors.tertiary
                          : colors.cover
                      }
                      fontColor={
                        item.number == verseNumber
                          ? colors.white
                          : colors.success.deep
                      }
                      tintColor={colors.info}
                    />
                  )}
                </>
              );
            }}></FlatList>
        </>
      )}
    </View>
  );
};

const AyahCard = props => {
  const {ayah, surahNumber, username, backgroundColor, fontColor, tintColor} = props;

  const dispatch = useDispatch();
  let isLoadingUpdateLastReadSurah = useSelector(
    selectIsLoadingUpdateLastReadSurah,
  );

  function saveLastRead(surahNumber, verseNumber) {
    dispatch(updateLastReadSurah({username, surahNumber, verseNumber}));
    dispatch(getLastReadSurah({username}))
    dispatch(getRecitationStats({username}))
  }

  return (
    <View
      style={[styles.ayahCardContainer, {backgroundColor: backgroundColor}]}>
      <View style={styles.meta}>
        <Text style={[styles.metaText, {color: tintColor}]}>
          Ayah {ayah.number}
        </Text>
      </View>

      <Text style={[styles.ayahText, {color: fontColor}]}>{ayah.text}</Text>

      {isLoadingUpdateLastReadSurah ? (
        <Loader msg="Updating Last Read ... " />
      ) : (
        <View style={styles.actions}>
          <Pressable
            onPress={() => {
              saveLastRead(surahNumber, ayah.number);
            }}>
            <Image
              source={last_read_ic}
              style={{height: 25, width: 25, tintColor: tintColor}}
              alt="Icon"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default SurahRecitationArea;

const styles = StyleSheet.create({
  ayahCardContainer: {
    padding: 10,
    marginTop: 5,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 2,
    flex: 1,
  },
  surahActionContainer: {
    backgroundColor: colors.primary,
    height: 100,
  },
  ayahText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 22,
    margin: 5,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  meta: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  metaText: {
    fontFamily: fonts.Signika.bold,
  },
});
