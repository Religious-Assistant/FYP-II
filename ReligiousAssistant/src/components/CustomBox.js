/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {Box, Image, Button, Text} from 'native-base';
import {StyleSheet, View} from 'react-native';

import mosqueIcon from '../../assets/images/mosque_ic.png';
import directionIcon from '../../assets/images/direction_ic.png';

import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function CustomBox(props) {
  const myRef = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      borderWidth: 4,
      borderRadius: 4,
      borderColor: colors.cover,
    };
    myRef.current.setNativeProps({
      style: styleObj,
    });
  }, [myRef]);
  return (
    <Box
      width="100%"
      bg={colors.cover}
      p="3"
      shadow={2}
      mt={props.mt}
      ref={myRef}>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Image
          source={mosqueIcon}
          style={{
            height: 40,
            width: 40,
          }}
          alt="icon .."
        />
        <Text style={styles.textMosque}>{props.text}</Text>
        <Text
          style={{
            fontFamily: fonts.Signika.medium,
            color: colors.black,
            marginTop: '5%',
            marginLeft: props.ml,
          }}>
          {props.distance}
        </Text>
        <Button
          style={{
            height: 20,
            width: 70,
            marginLeft: '-20%',
            marginTop: '-3%',
          }}
          variant="ghost">
          <Image
            source={directionIcon}
            style={{
              height: 50,
              width: 42,
              tintColor: colors.primary,
            }}
            alt="icon .."
          />
        </Button>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  textMosque: {
    fontFamily: fonts.Signika.medium,
    color: colors.black,
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 20,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.black,
    marginTop: '5%',
  },
});
