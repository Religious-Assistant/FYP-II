import React, {useEffect} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity
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
  getSurahs,
  selectIsLoadingSurahs,
  selectSurahs,
} from '../../redux/slices/muslim_module_slices/reciteQuranSlice';
import Loader from '../common/Loader';
import { QURAN_RECITATION_AREA } from '../../navigation/constants';

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
  const navigator=useNavigation()
  useEffect(() => {
    if (!surahs) {
      dispatch(getSurahs());
    } 
  }, [dispatch]);

  function renderRecitationScreen(item){
    navigator.navigate(QURAN_RECITATION_AREA, {surah: item});
  }
  return (
    <>
      {isLoadingSurahs ? (
        <Loader msg="Loading Surahs .." />
      ) : (
        <FlatList
          data={surahs}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={()=>{
                renderRecitationScreen(item)
              }}>
                <SurahCard surah={item} key={index}/>
              </TouchableOpacity>
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
const TranslationsRoute = () => {
  return (
    <Center flex={1} my="4">
      This is Tab 3
    </Center>
  );
};

const renderScene = SceneMap({
  first: SurahRoute,
  second: ParahRoute,
  third: TranslationsRoute,
});

function Tab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BY SURAH'},
    {key: 'second', title: 'BY PARAH'},
    {key: 'third', title: 'TRANSLATION'},
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

const SurahCard = ({surah}) => {
  return (
    <View style={styles.surahCardContainer}>
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
