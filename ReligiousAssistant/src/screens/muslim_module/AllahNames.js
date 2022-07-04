/**
 * @author Kinza Kiran
 * @version 1.0
 */
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  VStack,
  Divider,
  Box,
  Heading,
  FlatList,
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import duaIcon from '../../../assets/images/dua_ic.png';

export default function AllahNames({navigation}) {
  const namesOfAllah = [
    {
      key: 1,
      name: 'ٱلْمَلِكُ',
      meaning: 'The King and Owner of Dominion'  
    },
    {
      key: 2,
      name: 'ٱلْرَّحِيْمُ',
      meaning: 'The Bestower of Mercy',
    },
    {
      key: 3,
      name: 'ٱلْرَّحْمَـانُ',
      meaning: 'The Most or Entirely Merciful',
    },
    {
      key: 4,
      name: 'ٱلْمُؤْمِنُ',
      meaning: 'The One Who gives Emaan and Security',
    },
    {
      key: 5,
      name: 'ٱلْسَّلَامُ',
      meaning: 'The Perfection and Giver of Peace',
    },
    {
      key: 6,
      name: 'ٱلْقُدُّوسُ',
      meaning: 'The Absolutely Pure',
    },
    {
      key: 7,
      name: 'ٱلْجَبَّارُ',
      meaning: 'The Compeller, The Restorer',  
    },
    {
      key: 8,
      name: 'ٱلْعَزِيزُ',
      meaning: 'The All Mighty',
    },
    {
      key: 9,
      name: 'ٱلْمُهَيْمِنُ',
      meaning: 'The Guardian, The Witness, The Overseer',
    },
    {
      key: 10,
      name: 'ٱلْبَارِئُ',
      meaning: 'The Originator',
    },
    {
      key: 11,
      name: 'ٱلْخَالِقُ',
      meaning: 'The Creator, The Maker',
    },
    {
      key: 12,
      name: 'ٱلْمُتَكَبِّرُ',
      meaning: 'The Supreme, The Majestic',
    },
    {
      key: 13,
      name: 'ٱلْقَهَّارُ',
      meaning: 'The Subduer, The Ever-Dominating',
    
    },
    {
      key: 14,
      name: 'ٱلْغَفَّارُ',
      meaning: 'The All- and Oft-Forgiving',
    },
    {
      key: 15,
      name: 'ٱلْمُصَوِّرُ',
      meaning: 'The Fashioner',
    },
    {
      key: 16,
      name: 'ٱلْفَتَّاحُ',
      meaning: 'The Opener, The Judge',
    },
    {
      key: 17,
      name: 'ٱلْرَّزَّاقُ',
      meaning: 'The Provider',
    },
    {
      key: 18,
      name: 'ٱلْوَهَّابُ',
      meaning: 'The Giver of Gifts',
    },
    {
      key: 19,
      name: 'ٱلْبَاسِطُ',
      meaning: 'The Extender',
    },
    {
      key: 20,
      name: 'ٱلْقَابِضُ',
      meaning: 'The Withholder',
    },
    {
      key: 21,
      name: 'ٱلْعَلِيمُ',
      meaning: 'The All-Knowing, The Omniscient',
    },
    {
      key: 22,
      name: 'ٱلْمُعِزُّ',
      meaning: 'The Honourer, The Bestower',
    },
    {
      key: 23,
      name: 'ٱلْرَّافِعُ',
      meaning: 'The Exalter, The Elevator',
    },
    {
      key: 24,
      name: 'ٱلْخَافِضُ',
      meaning: 'The Reducer, The Abaser',
    },
    {
      key: 25,
      name: 'ٱلْبَصِيرُ',
      meaning: 'The All-Seeing',
    },
    {
      key: 26,
      name: 'ٱلْسَّمِيعُ',
      meaning: 'The All-Hearing',
    },
    {
      key: 27,
      name: 'ٱلْمُذِلُّ',
      meaning: 'The Dishonourer, The Humiliator',
    },
    {
      key: 28,
      name: 'ٱلْلَّطِيفُ',
      meaning: 'The Subtle One, The Most Gentle',
    },
    {
      key: 29,
      name: 'ٱلْعَدْلُ',
      meaning: 'The Utterly Just',
    },
    {
      key: 30,
      name: 'ٱلْحَكَمُ',
      meaning: 'The Judge, The Giver of Justice',
    },
    {
      key: 31,
      name: 'ٱلْعَظِيمُ',
      meaning: 'The Magnificent, The Supreme',
    },
    {
      key: 32,
      name: 'ٱلْحَلِيمُ',
      meaning: 'The Most Forbearing',
    },
    {
      key: 33,
      name: 'ٱلْخَبِيرُ',
      meaning: 'The Acquainted, the All-Aware',
    },
    {
      key: 34,
      name: 'ٱلْعَلِيُّ',
      meaning: 'The Most High, The Exalted',
    },
    {
      key: 35,
      name: 'ٱلْشَّكُورُ',
      meaning: 'The Most Appreciative',
    },
    {
      key: 36,
      name: 'ٱلْغَفُورُ',
      meaning: 'The Forgiving, The Exceedingly Forgiving',
    },
    {
      key: 37,
      name: 'ٱلْمُقِيتُ',
      meaning: 'The Sustainer',
    }
    ,
    {
      key: 38,
      name: 'ٱلْحَفِيظُ',
      meaning: 'The Preserver, The All Protecting',
    },
    {
      key: 39,
      name: 'ٱلْكَبِيرُ',
      meaning: 'The Greatest, The Most Grand',
    },
    {
      key: 40,
      name: 'ٱلْكَرِيمُ',
      meaning: 'The Most Generous, The Most Esteemed',
    }
    ,
    {
      key: 41,
      name: 'ٱلْجَلِيلُ',
      meaning: 'The Majestic',
    },
    {
      key: 42,
      name: 'ٱلْحَسِيبُ',
      meaning: 'The Reckoner, The Sufficient',
    },
    {
      key: 43,
      name: 'ٱلْوَاسِعُ',
      meaning: '	The All-Encompassing, the Boundless',
    },
    {
      key: 44,
      name: 'ٱلْمُجِيبُ',
      meaning: 'The Responsive One',
    },
    {
      key: 45,
      name: 'ٱلْرَّقِيبُ',
      meaning: 'The Watchful',
    },
    {
      key: 46,
      name: 'ٱلْمَجِيدُ',
      meaning: 'The Glorious, The Most Honorable',
    },
    {
      key: 47,
      name: 'ٱلْوَدُودُ',
      meaning: 'The Most Loving',
    },
    {
      key: 48,
      name: 'ٱلْحَكِيمُ',
      meaning: 'The All-Wise',
    },
    {
      key: 49,
      name: 'ٱلْحَقُّ',
      meaning: 'The Absolute Truth',
    },
    {
      key: 50,
      name: 'ٱلْشَّهِيدُ',
      meaning: 'The All- and Ever Witnessing',
    },
    {
      key:51,
      name:'ٱلْبَاعِثُ',
      meaning:'The Resurrector, The Raiser of the Dead'
    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          marginTop="5%"
          source={duaIcon}
          style={{
            height: 75,
            width: 75,
          }}
          alt="icon .."
        />
        <Text style={styles.heading}>
          Names of {'\n'}
          <Text style={{color: colors.white}}>Allah</Text>
        </Text>
      </View>
      <FlatList
        key={'_'}
        numColumns={3}
        data={namesOfAllah}
        keyExtractor={(itm, index) => index.toString()}
        renderItem={({
          item
        }) =>
          <View
            style={{
              marginTop: '3%',
              width: '32%',
              margin: '0.5%',
              padding: 5,
              maxHeight:'70%',
              alignItems: 'center',
            }}>
            <Box
              border="1"
              rounded="lg"
              overflow="hidden"
              borderColor={colors.cover}
              borderWidth="1"
              width={'110%'}
              _light={{
                backgroundColor: colors.cover,
              }}>
              <VStack space="2" divider={<Divider />} height={'170'} >
                <Box px="5" p={'2'}>
                  <Heading
                    style={styles.label}
                    color={colors.primary}>
                    {item.name}
                  </Heading>
                </Box>
                <Box px="4" pb="4">
                  <Text style={styles.info}>
                  {item.meaning}
                  </Text>
                  
                </Box>
              </VStack>
            </Box>
          </View>
  
        }></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 26,
    marginTop:'8%',
    padding: 2,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
    //padding: 5,
    color: colors.success.deep,
    flexWrap: 'wrap',
  },
  heading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 34,
    marginLeft: '-16%',
    padding: 8,
    color: colors.secondary,
  },
});
