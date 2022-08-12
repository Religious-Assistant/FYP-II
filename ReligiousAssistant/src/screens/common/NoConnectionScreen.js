import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import wifiIc from '../../../assets/images/wifi_ic.png';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import CustomButton from '../../components/CustomButton';

const NoConnectionScreen = props => {
  return (
    <View style={styles.container}>
      <Image
        source={wifiIc}
        style={{width: '30%', height: '30%'}}
        resizeMode="contain"
      />
      <Text style={styles.label}>No Connection</Text>
      <CustomButton title="Reload" onPress={props.onCheck} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 25,
    padding: 5,
    color: colors.primary,
    marginTop: '-15%',
    marginBottom: '5%',
  },
});
export default NoConnectionScreen;
