/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from "react";
import { Text,View,StyleSheet,ImageBackground,Dimensions } from "react-native";
import colors from "../theme/colors";

const image = { uri: "../../assets/images/login_bg.png" };

function SplashScreeen(){
    return(
        <ImageBackground
        style={styles.image}
        resizeMode="stretch"
        source={require('../../assets/gifs/splash.gif')}
        >
        </ImageBackground>
    
      )
}
const styles = StyleSheet.create(
  {
    container:{
    flexL:1
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    }
});

export default SplashScreeen;