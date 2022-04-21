/**
 * @author Nadir
 * @version 1.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Animated, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import profile from '../../../assets/images/profile.png';

import { Image, Text,View } from 'native-base';
// Tab ICons...
import home from '../../../assets/images/home.png';
import search from '../../../assets/images/search.png';
import notifications from '../../../assets/images/bell.png';
import settings from '../../../assets/images/settings.png';
import logout from '../../../assets/images/logout.png';

// Menu
import menu from '../../../assets/images/menu_ic.png';
import close from '../../../assets/images/close.png';


import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Home from './Home';
import { color } from 'react-native-reanimated';

export default function CustomDrawer() {
  const [currentTab, setCurrentTab] = useState("Home");
  
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          marginTop: 8,
          left:32,
        }}
        alt='Profile image'
        ></Image>

        <Text style={{
          fontSize: 20,
          color: 'white',
          marginTop: 20,
          left:27,
          fontFamily:fonts.Signika.regular
        }}>Full Name</Text>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "View Profile", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderLeftColor:showMenu?colors.secondary:colors.primary,
        borderLeftWidth:showMenu?1:0,
        borderTopColor:showMenu?colors.secondary:colors.primary,
        borderTopWidth:showMenu?1:0,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
                      <View style={styles.appBar}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 200,
              useNativeDriver: true,
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 200,
              useNativeDriver: true,
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 200,
              useNativeDriver: true,
            })
              .start()

            setShowMenu(!showMenu);
          }}>
            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor:colors.white,
              marginTop: showMenu?40:15,
              marginLeft: showMenu?10:10,

            }}
            alt={showMenu?'Close':'Open'}
            ></Image>


          </TouchableOpacity>
          <Text style={[styles.titleText,{marginTop: showMenu?40:15}]}>Home</Text>
          </View>
        </Animated.View>
        <Home />
      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? colors.secondary : "white"
        }}
        alt='Icon'
        ></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? colors.secondary : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appBar:{
    flexDirection:'row',
  },
  titleText:{
    fontFamily:fonts.Signika.bold,
    color:colors.secondary,
    marginLeft:'36%',
    fontSize:18,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
