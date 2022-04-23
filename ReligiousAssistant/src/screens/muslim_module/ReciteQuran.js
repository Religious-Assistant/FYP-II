import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {View, Text, ScrollView, Image} from 'native-base';
import colors from '../../theme/colors';
import Animated, {Easing} from 'react-native-reanimated';

const ReciteQuran = () => {
  const animatedHeaderValue = useRef(new Animated.Value(0)).current;;

  const MAX_HEIGHT = 150;
  const MIN_HEIGHT = 50;
  const SCROLL_DISTANCE = MAX_HEIGHT-MIN_HEIGHT;

  const animatedHeaderBackground = animatedHeaderValue.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp',
  });

  const animatedHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [MAX_HEIGHT,MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <Animated.View
        // style={[
        //   styles.header,
        //   {
        //     height: animatedHeaderHeight,
        //     backgroundColor: animatedHeaderBackground,
        //   },
        // ]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: animatedHeaderHeight,
          width: "100%",
          overflow: "hidden",
          zIndex: 999,
          // STYLE
          borderBottomColor: "#EFEFF4",
          borderBottomWidth: 2,
          padding: 10,
          backgroundColor: "blue"
         }}
        >
        <Image
          source={require('../../../assets/images/mosque_ic.png')}
          style={{width: 50, height: 50}}
          alt="Loading..."
        />
      </Animated.View>

      <Animated.ScrollView
        style={{paddingTop:MAX_HEIGHT}}
        // scrollEventThrottle={16}
        // showsVerticalScrollIndicator={false}
        // onScroll={Animated.event(
        //   [
        //   {nativeEvent: {contentOffset: {y: animatedHeaderValue}}}],{useNativeDriver:false})}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animatedHeaderValue }}}              
         ])
        }
        scrollEventThrottle={16}
          >
        {new Array(20).fill().map((item, index) => {
          return (
            <View p={5}>
              <Text p={5} style={{backgroundColor: colors.success.light}}>
                Item is {index}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ReciteQuran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 10,
    left: 0,
    right: 0,
  },
});
