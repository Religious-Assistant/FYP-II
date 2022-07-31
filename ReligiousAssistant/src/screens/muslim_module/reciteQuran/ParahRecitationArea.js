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
  checkParahIsRead,
  getParahByNumber,
  getRecitationStats,
  markParahAsRead,
  markParahAsUnRead,
  selectIsLoadingLastReadParah,
  selectIsLoadingMarkParahAsRead,
  selectIsLoadingMarkParahAsUnRead,
  selectIsLoadingParahByNumber,
  selectIsLoadingParahRecitationStatus,
  selectIsLoadingUpdateLastReadParah,
  selectLastReadParah,
  selectParahByNumber,
  selectParahRecitationStatus,
  updateLastReadParah,
} from '../../../redux/slices/muslim_module_slices/reciteQuranSlice';

import Loader from '../../common/Loader';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

import {FlatList, Image} from 'native-base';
import last_read_ic from '../../../../assets/images/last_read_ic.png';
import {
  selectUserData,
} from '../../../redux/slices/auth_slices/authSlice';
import {useState} from 'react';

const ParahRecitationArea = ({route, navigation}) => {

  const {parah} = route.params;
  const dispatch = useDispatch();

  const parahByNumber = useSelector(selectParahByNumber);
  const isLoadingParahByNumber = useSelector(selectIsLoadingParahByNumber);
  const isLoadingMarkParahAsRead = useSelector(selectIsLoadingMarkParahAsRead);
  const isLoadingMarkParahAsUnRead = useSelector(
    selectIsLoadingMarkParahAsUnRead,
  );
  const isLoadingParahRecitationStatus = useSelector(
    selectIsLoadingParahRecitationStatus,
  );

  const parahRecitationStatus = useSelector(selectParahRecitationStatus);

  const {username} = useSelector(selectUserData);
  const isLoadingLastReadParah = useSelector(selectIsLoadingLastReadParah);
  const lastReadParah = useSelector(selectLastReadParah);

  // State
  const [scrollIndexForAyah, setScrollIndexForAyah] = useState(0);

  useEffect(() => {
    dispatch(getParahByNumber(parah.number));
        
    if (username) {
      dispatch(
        checkParahIsRead({username: username, parahName: parah.englishName}),
      );
    }
  }, [dispatch, username]);

  function markParahAsComplete(parahNumber, parahName) {
    if (username) {
        dispatch(markParahAsRead({username, parahNumber, parahName}));
        dispatch(checkParahIsRead({username, parahName}));
        dispatch(getRecitationStats({username}))
    }
  }

  function markParahAsInComplete(parahNumber, parahName) {
    if (username) {
      dispatch(markParahAsUnRead({username, parahNumber, parahName}));
      dispatch(checkParahIsRead({username, parahName}));
      dispatch(getRecitationStats({username}))
    }
  }

  return (
    <View style={{backgroundColor: colors.white}}>
      {
      isLoadingParahByNumber ||
      isLoadingMarkParahAsRead ||
      isLoadingMarkParahAsUnRead ? (
        <Loader msg={`Getting Parah ${parah.englishName} for you ...`} />
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
              {isLoadingParahRecitationStatus ? (
                <Loader msg="Loading recitation status ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    parahRecitationStatus
                      ? markParahAsInComplete(parah.number, parah.englishName)
                      : markParahAsComplete(parah.number, parah.englishName);
                  }}
                  >
                  <Text
                    style={{
                      fontFamily: fonts.Signika.medium,
                      color: parahRecitationStatus ? colors.info : colors.white,
                      fontSize: 16,
                    }}>
                    {parahRecitationStatus ? 'Mark as Unread' : 'Mark as Read'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontFamily: fonts.Signika.bold,
                  color: colors.secondary,
                  fontSize: 20,
                }}>
                {parah?parah.name:''}
              </Text>
            </View>
          </View>
          <FlatList
            data={parahByNumber.ayahs}
            initialScrollIndex={scrollIndexForAyah}
            mb={'25%'}
            renderItem={({item, index}) => {
              // Get last read verse number and highlish that card
              const {verseNumber} = lastReadParah.parahLastRead;
              //Jump to this card with initialSCrollIndex
              if (item.number == verseNumber) {
                setScrollIndexForAyah(index);
              }

              return (
                <>
                  {isLoadingLastReadParah ? (
                    <Loader msg="Loading Last Read ... " />
                  ) : (
                    <AyahCard
                      ayah={item}
                      parahNumber={parah.number}
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
const {ayah, parahNumber, username, backgroundColor, fontColor, tintColor} = props;

  const dispatch = useDispatch();
  let isLoadingUpdateLastReadParah = useSelector(
    selectIsLoadingUpdateLastReadParah,
  );

  function saveLastRead(parahNumber, surahNumber, verseNumber) {
    dispatch(updateLastReadParah({username, parahNumber, surahNumber , verseNumber}));
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

      {isLoadingUpdateLastReadParah ? (
        <Loader msg="Updating Last Read ... " />
      ) : (
        <View style={styles.actions}>
          <Pressable
            onPress={() => {
              saveLastRead(parahNumber, ayah.surah.number, ayah.number, );
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

export default ParahRecitationArea;

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
