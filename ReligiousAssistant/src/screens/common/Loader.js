import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLoader from "react-native-animated-loader";

const Loader = () => {
  return (
<AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>Doing something...</Text>
      </AnimatedLoader>
  )
}

export default Loader

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100
    }
  });