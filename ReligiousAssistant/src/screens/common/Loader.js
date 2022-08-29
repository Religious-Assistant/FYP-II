import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLoader from "react-native-animated-loader";
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

const Loader = (props) => {

return (
<AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader3.json")}
        animationStyle={styles.lottie}
        speed={1}
        
      >
        <Text style={styles.lottieText}>{props.msg}</Text>
      </AnimatedLoader>
  )
}

export default Loader

const styles = StyleSheet.create({
    lottie: {
      width: 300,
      height: 300
    },
    lottieText:{
      fontFamily:fonts.Signika.bold,
      fontSize:20,
      color:colors.primary
    }
  });