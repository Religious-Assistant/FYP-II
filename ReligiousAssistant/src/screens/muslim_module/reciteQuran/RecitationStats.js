import React, { useEffect } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {ProgressChart, StackedBarChart} from 'react-native-chart-kit';
import { Center, Heading } from 'native-base';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../redux/slices/auth_slices/authSlice';
import {getRecitationStats, selectRecitationStats} from '../../redux/slices/muslim_module_slices/reciteQuranSlice';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const RecitationStats = () => {
  const dispatch = useDispatch();
  const recitationStats = useSelector(selectRecitationStats);
  const {username} = useSelector(selectUserData);

  const screenWidth = Dimensions.get('window').width - 10;

  
  const chartConfig = {
    backgroundGradientFrom: colors.primary,
    backgroundGradientTo: colors.primary,
    color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(14, 165, 233, 1)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const recitedParahs=recitationStats[0].recitedParahs
  const recitedSurahs=recitationStats[0].recitedSurahs
  const parahLastRead=recitationStats[0].parahLastRead
  const surahLastRead=recitationStats[0].surahLastRead

  const data = {
    labels: ['Parahs', 'Surahs', 'Ayahs'],
    legend: ['Recited', 'Remaining'],
    data: [
      [recitedParahs.length-1, 30 - recitedParahs.length+1],
      [recitedSurahs.length-1, 114 - recitedSurahs.length+1],
      [parahLastRead.verseNumber/100, (6666 - parahLastRead.verseNumber) / 100],
    ],

    barColors: [colors.success.light, colors.error],
  };

  useEffect(()=>{
    if(username){
        dispatch(getRecitationStats({username}))
    }
  },[dispatch])

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

        <StatsCardForParah screenWidth={screenWidth} parahLastRead={parahLastRead}/>
        <StatsCardForSurah screenWidth={screenWidth} surahLastRead={surahLastRead}/>
    </ScrollView>      
    </>
  );
};

function StatsCardForParah(props) {
    const {screenWidth, parahLastRead}=props

    return(
        <Center style={[styles.card,{width:screenWidth}]}>
            <Heading style={{color:colors.primary}}>Last Recitation: BY PARAH</Heading>
            <Text style={[styles.text,{color:colors.info}]}>Parah #: {parahLastRead.parahNumber}</Text>
            <Text style={[styles.text,{color:colors.info}]}>Surah #: {parahLastRead.surahNumber}</Text>
            <Text style={[styles.text,{color:colors.info}]}>Verse #: {parahLastRead.verseNumber}</Text>
    </Center>
    ) 
  }
  
  function StatsCardForSurah(props) {
    const {screenWidth, surahLastRead}=props

    return(
        <Center style={[styles.card,{width:screenWidth}]}>
            <Heading style={{color:colors.primary}}>Last Recitation: BY SURAH</Heading>
            <Text style={[styles.text,{color:colors.info}]}>Surah #: {surahLastRead.surahNumber}</Text>
            <Text style={[styles.text,{color:colors.info}]}>Verse #: {surahLastRead.verseNumber}</Text>
    </Center>
    ) 
  }
export default RecitationStats;

const styles = StyleSheet.create({
    card: {
        height: 150,
        borderRadius: 10,
        marginTop:10,
        elevation:2,
        shadowOffset: {height: 1, width: 1},
        backgroundColor: colors.white,
        alignSelf:'center'
      },
      text:{
        fontSize:20,
        fontFamily:fonts.Signika.medium,
        marginTop:5,
      }
});
