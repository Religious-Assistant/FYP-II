/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {VStack, Divider, Box, Heading, FlatList} from 'native-base';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

export default function AllahNames({navigation}) {
  const namesOfAllah = [
    {
      key: 1,
      name: 'ٱلْمَلِكُ',
      meaning: 'The King and Owner of Dominion',
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
    },
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
    },
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
      key: 51,
      name: 'ٱلْبَاعِثُ',
      meaning: 'The Resurrector, The Raiser of the Dead',
    },
    {
      key: 52,
      name: 'ٱلْمَتِينُ',
      meaning: 'The Firm, The Steadfast',
    },
    {
      key: 53,
      name: 'ٱلْقَوِيُّ',
      meaning: '	The All-Strong',
    },
    {
      key: 54,
      name: 'ٱلْوَكِيلُ',
      meaning: 'The Trustee, The Disposer of Affairs',
    },
    {
      key: 55,
      name: 'ٱلْمُحْصِيُ',
      meaning: 'The All-Enumerating, The Counter',
    },
    {
      key: 56,
      name: 'ٱلْحَمِيدُ',
      meaning: 'The Praiseworthy',
    },
    {
      key: 57,
      name: 'ٱلْوَلِيُّ',
      meaning: 'The Protecting Associate',
    },
    {
      key: 58,
      name: 'ٱلْمُحْيِى',
      meaning: 'The Giver of Life',
    },
    {
      key: 59,
      name: 'ٱلْمُعِيدُ',
      meaning: 'The Restorer, The Reinstater',
    },
    {
      key: 60,
      name: 'ٱلْمُبْدِئُ',
      meaning: 'The Originator, The Initiator',
    },
    {
      key: 61,
      name: 'ٱلْقَيُّومُ',
      meaning: 'The Sustainer, The Self-Subsisting',
    },
    {
      key: 62,
      name: 'ٱلْحَىُّ',
      meaning: 'The Ever-Living',
    },
    {
      key: 63,
      name: 'ٱلْمُمِيتُ',
      meaning: 'The Bringer of Death, the Destroyer',
    },
    {
      key: 64,
      name: 'ٱلْوَاحِدُ',
      meaning: 'The One',
    },
    {
      key: 65,
      name: 'ٱلْمَاجِدُ',
      meaning: 'The Illustrious, the Magnificent',
    },
    {
      key: 66,
      name: 'ٱلْوَاجِدُ',
      meaning: 'The Perceiver',
    },
    {
      key: 67,
      name: 'ٱلْقَادِرُ',
      meaning: '	The Capable, The Powerful',
    },
    {
      key: 68,
      name: 'ٱلْصَّمَدُ',
      meaning: 'The Eternal, Satisfier of Needs',
    },
    {
      key: 69,
      name: 'ٱلْأَحَد',
      meaning: 'The Unique, The Only One',
    },
    {
      key: 70,
      name: 'ٱلْمُؤَخِّرُ',
      meaning: 'The Delayer, the Retarder',
    },
    {
      key: 71,
      name: 'الْمُقَدِّمُ',
      meaning: 'The Expediter, The Promoter',
    },
    {
      key: 72,
      name: 'ٱلْمُقْتَدِرُ',
      meaning: 'The Omnipotent',
    },
    {
      key: 73,
      name: 'ٱلْظَّاهِرُ',
      meaning: 'The Manifest',
    },
    {
      key: 74,
      name: 'ٱلْآخِرُ',
      meaning: 'The Last',
    },
    {
      key: 75,
      name: 'ٱلأَوَّلُ',
      meaning: 'The First',
    },
    {
      key: 76,
      name: 'ٱلْمُتَعَالِي',
      meaning: 'The Self Exalted',
    },
    {
      key: 77,
      name: 'ٱلْوَالِي',
      meaning: 'The Governor, The Patron',
    },
    {
      key: 78,
      name: 'ٱلْبَاطِنُ',
      meaning: 'The Hidden One, Knower of the Hidden',
    },
    {
      key: 79,
      name: 'ٱلْمُنْتَقِمُ',
      meaning: 'The Avenger',
    },
    {
      key: 80,
      name: 'ٱلْتَّوَّابُ',
      meaning: 'The Ever-Pardoning, The Relenting',
    },
    {
      key: 81,
      name: 'ٱلْبَرُّ',
      meaning: 'The Source of Goodness, the Kind Benefactor',
    },
    {
      key: 82,
      name: 'مَالِكُ ٱلْمُلْكُ',
      meaning: 'Master of the Kingdom, Owner of the Dominion',
    },
    {
      key: 83,
      name: 'ٱلْرَّؤُفُ',
      meaning: 'The Most Kind',
    },
    {
      key: 84,
      name: 'ٱلْعَفُوُّ',
      meaning: 'The Pardoner',
    },
    {
      key: 85,
      name: 'ٱلْجَامِعُ',
      meaning: '	The Gatherer, the Uniter',
    },
    {
      key: 86,
      name: 'ٱلْمُقْسِطُ',
      meaning: 'The Equitable, the Requiter',
    },
    {
      key: 87,
      name: 'ذُو ٱلْجَلَالِ وَٱلْإِكْرَامُ',
      meaning: 'Possessor of Glory and Honour',
    },
    {
      key: 88,
      name: '	ٱلْمَانِعُ',
      meaning: 'The Withholder',
    },
    {
      key: 89,
      name: 'ٱلْمُغْنِيُّ',
      meaning: 'The Enricher',
    },
    {
      key: 90,
      name: 'ٱلْغَنيُّ',
      meaning: 'The Self-Sufficient, The Wealthy',
    },
    {
      key: 91,
      name: 'ٱلْنُّورُ',
      meaning: 'The Light, The Illuminator',
    },
    {
      key: 92,
      name: 'ٱلْنَّافِعُ',
      meaning: 'The Propitious, the Benefactor',
    },
    {
      key: 93,
      name: 'ٱلْضَّارُ',
      meaning: 'The Distresser',
    },
    {
      key: 94,
      name: 'ٱلْبَاقِي',
      meaning: 'The Ever-Surviving, The Everlasting',
    },
    {
      key: 95,
      name: 'ٱلْبَدِيعُ',
      meaning: 'The Incomparable Originator',
    },
    {
      key: 96,
      name: 'ٱلْهَادِي',
      meaning: 'The Guide',
    },
    {
      key: 97,
      name: 'ٱلْصَّبُورُ',
      meaning: 'The Forbearing, The Patient',
    },
    {
      key: 98,
      name: 'ٱلْرَّشِيدُ',
      meaning: 'The Guide, Infallible Teacher',
    },
    {
      key: 99,
      name: 'ٱلْوَارِثُ',
      meaning: 'The Inheritor, The HeirThe Inheritor, The Heir',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          marginTop="5%"
          source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663574409/religious-assistant/static_assets/dua_ic_xnvmkz.png'}}
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
        renderItem={({item}) => (
          <View
            style={{
              marginTop: '3%',
              width: '32%',
              margin: '0.5%',
              padding: 5,
              maxHeight: '70%',
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
              <VStack space="2" divider={<Divider />} height={'200'}>
                <Box px="5" p={'2'}>
                  <Heading style={styles.label} color={colors.primary}>
                    {item.name}
                  </Heading>
                </Box>
                <Box px="4" pb="4">
                  <Text style={styles.info}>{item.meaning}</Text>
                </Box>
              </VStack>
            </Box>
          </View>
        )}></FlatList>
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
    marginTop: '8%',
    padding: 2,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
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
