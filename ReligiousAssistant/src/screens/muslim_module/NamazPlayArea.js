import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';

//import all learn_namaz images
// import step1 from '../../../assets/images/learn_namaz/1.png';
// import step2 from '../../../assets/images/learn_namaz/2.png';
import {Button, Image} from 'native-base';

const NamazPlayArea = () => {

    const steps=[require('../../../assets/images/learn_namaz/1.png'),
    require('../../../assets/images/learn_namaz/2.png')
]

    const[image,setImage]=useState(steps[0])

    function renderNextStep() {
        setImage(steps[1])
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.playArea}>
        <Image
          source={image}
          style={{width: 420, height: 300}}
          alt="Could not load step"></Image>
      </View>

      <View style={styles.controls}>
        <Button onPress={renderNextStep}>Next</Button>
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
    flex: 0.2,
    backgroundColor: colors.primary,
  },

  playArea: {
    flex: 0.6,
    marginTop: 5,
  },
  controls: {
    flex: 0.1,
  },
});
