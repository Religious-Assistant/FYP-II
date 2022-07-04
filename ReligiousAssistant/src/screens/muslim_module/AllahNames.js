/**
 * @author Kinza Kiran
 * @version 1.0
 */
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  VStack,
  Center,
  Divider,
  Box,
  Stack,
  Heading,
  ScrollView,
  FlatList,
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import duaIcon from '../../../assets/images/dua_ic.png';

export default function AllahNames({navigation}) {
  const namesOfAllah = [
    {
      key: 1,
      name: 'ٱلْرَّحْمَـانُ',
      meaning: 'The Most or Entirely Merciful',
    },
    {
      key: 2,
      name: 'ٱلْرَّحِيْمُ',
      meaning: 'The Bestower of Mercy',
    },
    {
      key: 3,
      name: 'ٱلْمَلِكُ',
      meaning: 'The King and Owner of Dominion',
    },
    {
      key: 4,
      name: '',
      meaning: '',
    },
    {
      key: 5,
      name: '',
      meaning: '',
    },
    {
      key: 6,
      name: '',
      meaning: '',
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
        renderItem={itm => (
          <View
            style={{
              marginTop: '4%',
              width: '30%',
              margin: '1%',
              padding: 8,
              //borderWidth: 0.75,
              alignItems: 'center',
            }}>
            <Box
              border="1"
              rounded="lg"
              overflow="hidden"
              borderColor={colors.cover}
              borderWidth="1"
              _light={{
                backgroundColor: colors.cover,
              }}>
              <VStack space="2" divider={<Divider />}>
                <Box px="5" p={'2'}>
                  <Heading
                    size="md"
                    ml="-1"
                    style={styles.label}
                    color={colors.primary}>
                    Name
                  </Heading>
                </Box>
                <Box px="4" pb="4">
                  Meaning
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
  ayat: {
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
    padding: 5,
    color: colors.primary,
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
    padding: 5,
    color: colors.info,
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
