/**
 * @author Nadir
 * @version 1.0
 */

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ScrollView} from 'native-base';

import Loader from '../../common/Loader';

//theme
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

//redux

import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {
  checkSummaryIsRead,
  getRecitationStats,
  markSummaryAsRead,
  markSummaryAsUnRead,
  selectIsLoadingMarkSummaryAsRead,
  selectIsLoadingMarkSummaryAsUnRead,
  selectIsLoadingSummaryRecitationStatus,
  selectSummaryRecitationStatus,
  updateLastReadSummary,
} from '../../../redux/slices/hindu_module_slices/reciteGitaSlice';

const SummaryRecitationArea = ({route, navigation}) => {
  const {summary} = route.params;
  const dispatch = useDispatch();

  const isLoadingMarkSummaryAsRead = useSelector(
    selectIsLoadingMarkSummaryAsRead,
  );
  const isLoadingMarkSummaryAsUnRead = useSelector(
    selectIsLoadingMarkSummaryAsUnRead,
  );
  const isLoadingSummaryRecitationStatus = useSelector(
    selectIsLoadingSummaryRecitationStatus,
  );

  const summaryRecitationStatus = useSelector(selectSummaryRecitationStatus);

  const {username} = useSelector(selectUserData);

  useEffect(() => {
    if (username) {
      dispatch(
        checkSummaryIsRead({
          username: username,
          summaryName: summary.meaning.en,
        }),
      );
    }
  }, [dispatch, username]);

  function markSummaryAsComplete(summaryNumber, summaryName) {
    if (username) {
      dispatch(markSummaryAsRead({username, summaryNumber, summaryName}));
      dispatch(checkSummaryIsRead({username, summaryName}));
      dispatch(getRecitationStats({username}));
      dispatch(updateLastReadSummary({username, summaryNumber}));
    }
  }

  function markSummaryAsInComplete(summaryNumber, summaryName) {
    if (username) {
      dispatch(markSummaryAsUnRead({username, summaryNumber, summaryName}));
      dispatch(checkSummaryIsRead({username, summaryName}));
      dispatch(getRecitationStats({username}));
    }
  }

  return (
    <View style={{backgroundColor: colors.white}}>
      {isLoadingMarkSummaryAsRead || isLoadingMarkSummaryAsUnRead ? (
        <Loader msg={`Getting Parah ${summary.meaning.en} for you ...`} />
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
              {isLoadingSummaryRecitationStatus ? (
                <Loader msg="Loading recitation status ..." />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    summaryRecitationStatus
                      ? markSummaryAsInComplete(
                          summary.chapter_number,
                          summary.meaning.en,
                        )
                      : markSummaryAsComplete(
                          summary.chapter_number,
                          summary.meaning.en,
                        );
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.Signika.medium,
                      color: summaryRecitationStatus
                        ? colors.info
                        : colors.white,
                      fontSize: 16,
                    }}>
                    {summaryRecitationStatus
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
                {summary ? summary.name : ''}
              </Text>
            </View>
          </View>

          <SummaryCard chapterSummary={summary} />
        </>
      )}
    </View>
  );
};

const SummaryCard = props => {
  const {chapterSummary} = props;

  return (
    <ScrollView style={styles.scrollContainer}>
      <>
        <View style={styles.summaryContainer}>
          <Text style={[styles.summaryText]}>
            {chapterSummary?.summary?.en}
          </Text>
        </View>

        <View style={[styles.summaryContainer, {marginTop: 10}]}>
          <Text style={[styles.summaryText, {color: colors.info}]}>
            {chapterSummary?.summary?.hi}
          </Text>
        </View>
      </>
    </ScrollView>
  );
};

export default SummaryRecitationArea;

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get('window').height - 160,
  },
  summaryContainer: {
    backgroundColor: colors.cover,
    borderRadius: 5,
    marginTop: 10,
    width: '96%',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 8,
  },
  summaryMeta: {
    padding: 5,
  },
  metaText: {
    fontSize: 15,
    fontFamily: fonts.Signika.bold,
    color: colors.red,
  },
  chapterActionContainer: {
    backgroundColor: colors.primary,
    height: 100,
  },
  summaryText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 18,
    lineHeight: 30,
    margin: 5,
    color: colors.success.deep,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  meta: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});
