import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import img from '../../../assets/images/quran_ic.png';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

const ReciteQuran = () => {
  return (
    <>
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
      />
    </>
  );
};

export default ReciteQuran;

const styles = StyleSheet.create({});
