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
              marginTop: '4%',
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
