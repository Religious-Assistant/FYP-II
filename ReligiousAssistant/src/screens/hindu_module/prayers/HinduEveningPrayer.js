/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, View, Text, ScrollView} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

export default function HinduEveningPrayer() {
  const morningPrayer = [
    {
      key: 1,
      info: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva \n Mata Jaki Parvati, Pita Mahadeva',
    },
    {
      key: 2,
      info: 'Ekdanta Dayavanta, Char Bhujadhaari \n Mathe Par Tilak Sohe, Muse Ki Savari',
    },
    {
      key: 3,
      info: 'Paan charhe,Phool Charhe, Aur Charhe Meva \n Ladduan Kaa Bhog Laage, Sant Kare Seva',
    },
    {
      key: 4,
      info: 'Andhe Ko Aankh Deta, Korian Ko Kayaa \n Banjhan Ko Putra Deta, Nirdhan Ko Maya',
    },
    {
      key: 5,
      info: '‘ Soora’ Shyama Sharana Aaye,  Saphal Kije Seva \n Mata Jaki Parvati, Pita Mahadeva',
    },
    {
      key: 6,
      info: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva \n Mata Jaki Parvati, Pita Mahadeva',
    },
  ];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      flex={1}
      backgroundColor={colors.white}>
      {/* Main view */}
      <View style={styles.root}>
        <View>
          <Text style={styles.userText}>Aarti (Evening Prayer)</Text>
        </View>
        {morningPrayer.map(itm => {
          return (
            <Box
              key={itm.key}
              rounded="lg"
              overflow="hidden"
              style={styles.boxContainer}
              borderColor={colors.cover}
              borderWidth="1"
              maxW={'80%'}
              _light={{
                backgroundColor: colors.cover,
              }}>
              <Text style={styles.statement}>{itm.info}</Text>
            </Box>
          );
        })}
        <Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    alignSelf: 'center',
    fontFamily: fonts.Signika.medium,
    fontSize: 24,
    padding: 5,
    marginTop: '10%',
  },
  boxContainer: {
    minWidth: '90%',
    padding: 15,
    marginTop: 20,
  },
  statement: {
    marginTop: 20,
    padding: 2,
    color: colors.tertiary,
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
  },
});
