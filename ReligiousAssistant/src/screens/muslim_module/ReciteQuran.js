/**
 * @author Nadir Hussain
 * @version 1.0
 *
 * Resources: https://github.com/satya164/react-native-tab-view#readme
 * API: https://alquran.cloud/api
 * USe this API for translated Quran: https://github.com/risan/quran-json
 */

import {StyleSheet, useWindowDimensions} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Image} from 'native-base';
import colors from '../../theme/colors';
import Animated from 'react-native-reanimated';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import fonts from '../../theme/fonts';
import {getSurahs} from '../../services/apis/ReciteQuranService';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReciteQuran = () => {
  const animatedHeaderValue = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 150;
  const HEADER_MIN_HEIGHT = 50;

  const IMAGE_MAX_HEIGHT = 100;
  const IMAGE_MIN_HEIGHT = 33;

  const IMAGE_MAX_MT = 20;
  const IMAGE_MIN_MT = 3;

  const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const animatedHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const animatedImageHeight = animatedHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [IMAGE_MAX_HEIGHT, IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const animatedImageMarginTop = animatedHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [IMAGE_MAX_MT, IMAGE_MIN_MT],
    extrapolate: 'clamp',
  });

  const navigator=useNavigation()

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          height: animatedHeaderHeight,
          width: '100%',
          zIndex: 999,
          backgroundColor: colors.primary,
          padding: 10,
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>{
              navigator.goBack();
          }}>
          <Image
            source={require('../../../assets/images/left_arrow_ic.png')}
            style={{width: 30, height: 30, tintColor: colors.white}}
            alt="Back Icon.."
          />
          </TouchableOpacity>
          <Animated.Image
            source={require('../../../assets/images/recite_quran_img.png')}
            style={{
              width: animatedImageHeight,
              height: animatedImageHeight,
              marginTop: animatedImageMarginTop,
            }}
            alt="Loading..."
          />
        </View>
      </Animated.View>

      {/* <Animated.ScrollView
        style={{paddingTop: HEADER_MAX_HEIGHT}}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: animatedHeaderValue}}},
        ])}
        scrollEventThrottle={16}>
 */}
      <View style={{paddingTop: HEADER_MAX_HEIGHT, flex: 1}}>
        <TabNav />
      </View>
      {/* </Animated.ScrollView> */}
    </View>
  );
};

const FirstRoute = () => {
  const [surahs, setSurahs] = useState();
  useEffect(() => {
    getSurahs().then(response => {
      setSurahs(response.data);
    });
  }, []);

  return (
    <Animated.ScrollView>
      {surahs ? (
        surahs.map((item, index) => {
          return <SurahCard surah={item} key={item.number} />;
        })
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding:15,
          }}>
          <Text style={{fontSize: 20, fontFamily: fonts.Signika.bold}}>
            Loading Surahs
          </Text>
        </View>
      )}
    </Animated.ScrollView>
  );
};

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
        <Text style={styles.surahNameEnglish}>{surah.name}</Text>
      </View>
    </View>
  );
};

const SecondRoute = () => {
  const [surahs, setSurahs] = useState();
  useEffect(() => {
    getSurahs().then(response => {
      setSurahs(response.data);
    });
  }, []);

  return(   <Animated.ScrollView>
  {surahs ? (
    surahs.map((item, index) => {
      return <SurahCard surah={item} key={item.number} />;
    })
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:15,
      }}>
      <Text style={{fontSize: 20, fontFamily: fonts.Signika.bold}}>
        Loading Surahs
      </Text>
    </View>
  )}
</Animated.ScrollView>
);
}

const ThirdRoute = () => (
  <View style={{flex: 1, backgroundColor: colors.tertiary}}>
    {new Array(20).fill().map((item, index) => {
      return (
        <View p={5}>
          <Text p={5} style={{backgroundColor: colors.success.light}}>
            Item is {index}
          </Text>
        </View>
      );
    })}
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

function TabNav() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BY SURAH'},
    {key: 'second', title: 'BY PARAH'},
    {key: 'third', title: '3RD OPTION'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      // renderTabBar={props=>{
      //   return(
      //     <View style={{flexDirection:'row'}} >
      //       <Button>ALi</Button>
      //       <Button>ALi</Button>
      //       <Button>ALi</Button>
      //     </View>
      //   )
      // }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.secondary}}
          style={{
            backgroundColor: colors.white,
          }}
          activeColor={colors.secondary}
          inactiveColor={colors.black}
          labelStyle={{fontFamily: fonts.Signika.medium}}
          // renderBadge={({route})=>(<Button p={-5}>Ok</Button>)}
          // renderIcon={()=>(<Image source={require('../../../assets/images/mosque_ic.png')} style={{width:15, height:15}}></Image>)}
        />
      )} // <-- add this line
    />
  );
}
export default ReciteQuran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surahCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: 8,
    backgroundColor: colors.white,
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
  numberOfAyahs: {
    fontSize: 13,
    fontFamily: fonts.Signika.regular,
  },
});
