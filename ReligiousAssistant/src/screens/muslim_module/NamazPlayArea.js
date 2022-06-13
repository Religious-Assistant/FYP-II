import React, {useState, useEffect} from 'react';
import {Button, Image, View, Text, Center, Box,Progress} from 'native-base';
import {StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../theme/colors';

//import all learn_namaz images
import {sunnah2} from './LearnNamazAssets';
import {getScene} from './LearnNamazAssets';
import fonts from '../../theme/fonts';
import {TouchableHighlight} from 'react-native';

const NamazPlayArea = ({ route, navigation }) => {
  const { namazInfo } = route.params;

  const [scene, setScene] = useState(getScene(sunnah2, 0));
  const[progress,setProgress]=useState(1)

  async function renderNextScene() {
    if (scene.step < sunnah2.length) {
      setScene(getScene(sunnah2, scene.step));
      setProgress(prev=>prev+1)
    }
  }

  async function renderPreviousScsne() {
    if (scene.step > 1) {
      setScene(getScene(sunnah2, scene.step - 2));
      setProgress(prev=>prev-1)
    }
  }

  function markAsComplete(){
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
        <Text style={styles.infoText}>
          {scene.desc}
        </Text>
        <Text style={styles.namazText}>
          {scene.text}
        </Text>
      </View>
      <View style={styles.playArea}>
        <Image
          source={scene.image}
          key={scene.step}
          resizeMethod="resize"
          style={{width: 420, height: 420}}
          alt="Could not load step"></Image>
      <Progress max={sunnah2.length} value={progress} borderRadius={0} style={{backgroundColor:colors.cover}} colorScheme="emerald"/>
      </View>


      <View style={styles.controls}>
        <TouchableHighlight onPress={renderPreviousScsne}>
          <View style={styles.iconButton}>
            <Icon name="arrow-back" size={30} style={styles.icon}></Icon>
            <Text style={styles.text}>Back</Text>
          </View>
        </TouchableHighlight>

        <Button w={150} style={styles.actionButton} onPress={markAsComplete}>Mark as Complete</Button>

        <TouchableHighlight onPress={renderNextScene}>
          <View style={styles.iconButton}>
            <Text style={styles.text}>Next</Text>
            <Icon name="arrow-forward" size={30} style={styles.icon}></Icon>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default NamazPlayArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.24,
    backgroundColor: colors.primary,
  },

  playArea: {
    flex: 0.6,
  },
  controls: {
    flex: 0.06,
    margin:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius:8,
  },
  icon: {
    color: colors.white,
  },
  text: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    color:colors.white
  },
  actionButton:{
    backgroundColor:colors.primary
  }
  ,
  namazText:{
    color:colors.white,
    fontSize:20,
    lineHeight:25,
    letterSpacing:2,
    marginLeft:10,
    marginRight:10,
  },
  infoText:{
    color:colors.secondary,
    fontSize:20,
    letterSpacing:2,
    padding:10,
    fontFamily:fonts.Signika.bold
  }
});
