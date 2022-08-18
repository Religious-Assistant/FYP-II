/**
 * @author Nadir
 * @version 1.0
 *
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {Heading} from 'native-base';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {
  getRecitationStats,
  selectRecitationStats,
} from '../../../redux/slices/hindu_module_slices/reciteGitaSlice';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

const RecitationStats = () => {
  const dispatch = useDispatch();
  
  const recitationStats = useSelector(selectRecitationStats);
  const user = useSelector(selectUserData);
  const screenWidth = Dimensions.get('window').width - 10;

  useEffect(() => {
    if (user) {
      dispatch(getRecitationStats({username: user?.username}));
    }
  }, [dispatch]);

  const chartConfig = {
    backgroundGradientFrom: colors.primary,
    backgroundGradientTo: colors.primary,
    color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(14, 165, 233, 1)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  recitationStats[0]?.chapterLastRead;

  const data = {
    labels: ['Summaries', 'Chapters'],
    legend: ['Recited', 'Remaining'],
    data: [
      [recitationStats[0]?.recitedSummaries?.length - 1, 18],
      [recitationStats[0]?.recitedChapters?.length - 1, 18],
    ],

    barColors: [colors.success.light, colors.error],
  };

  return (
    <>
      <ScrollView>
        <StackedBarChart
          style={{marginTop: 20, borderRadius: 16, alignSelf: 'center'}}
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          withHorizontalLabels={false}
        />

        <StatsCardForChapter
          screenWidth={screenWidth}
          summaryLastRead={recitationStats[0]?.summaryLastRead}
          chapterLastRead={recitationStats[0]?.chapterLastRead}
        />
      </ScrollView>
    </>
  );
};

function StatsCardForChapter(props) {
  const {screenWidth, chapterLastRead, summaryLastRead} = props;

  return (
    <View style={[styles.card, {width: screenWidth}]}>
      <Heading style={styles.heading}>Last Recitation Stats</Heading>
      <View style={styles.dataContainer}>
        <Text style={[styles.text]}>Chapter </Text>
        <Text style={[styles.text]}>{chapterLastRead.chapterNumber}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={[styles.text]}>Verse</Text>
        <Text style={[styles.text]}>{chapterLastRead.verseNumber}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={[styles.text]}>Summary</Text>
        <Text style={[styles.text]}>{summaryLastRead}</Text>
      </View>
    </View>
  );
}
export default RecitationStats;

const styles = StyleSheet.create({
  heading: {
    color: colors.primary,
    fontFamily: fonts.Signika.bold,
  },
  dataContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  card: {
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
    padding: 10,
    shadowOffset: {height: 1, width: 1},
    backgroundColor: colors.cover,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.medium,
    marginTop: 5,
    color: colors.red,
  },
});
