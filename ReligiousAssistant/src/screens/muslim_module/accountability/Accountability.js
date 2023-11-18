/**
 * @author Kinza Kiran && Nadir
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, Text, Heading, HStack, Center, Pressable} from 'native-base';

//theme
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

//components
import Namaz from './Namaz';
import Fast from './Fast';

export default function Accountability() {
  const [namazOfFast, setNamazOrFast] = useState(0);

  //This is used in footer, when the value 0 is used for Pryaer while 1 is used for fast
  function setSelectedFeature(selectedFeature) {
    setNamazOrFast(selectedFeature);
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.headerContainer}>
        <Heading color={colors.white}>
          Self <Heading color={colors.secondary}>Accountability</Heading>
        </Heading>
      </View>

      {namazOfFast == 0 ? <Namaz /> : <Fast />}
      <FooterOptions
        setSelectedFeature={setSelectedFeature}
        selected={namazOfFast}
      />
    </View>
  );
}

function FooterOptions(props) {
  function setSelected(value) {
    props.setSelectedFeature(value);
  }
  return (
    //Main Box
    <Box
      flex={1}
      bg="white"
      safeAreaTop
      width="100%"
      maxW="100%"
      maxHeight={'10%'}
      maxH={'7%'}
      backgroundColor={colors.black}
      marginTop={'50%'}
      alignSelf="center">
      <Center flex={1}></Center>
      <HStack bg={colors.primary} alignItems="center" safeAreaBottom shadow={5}>
        {/* Prayer Option */}
        <Pressable
          cursor="pointer"
          opacity={props.selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            <Text color="white" fontSize="18" fontFamily={fonts.Signika.bold}>
              Prayer
            </Text>
          </Center>
        </Pressable>
        {/* Fast Option */}
        <Pressable
          cursor="pointer"
          opacity={props.selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            <Text color="white" fontSize="18" fontFamily={fonts.Signika.bold}>
              Fast
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    backgroundColor: colors.primary,
  },
});
