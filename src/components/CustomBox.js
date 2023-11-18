/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Box, Image, Text} from 'native-base';

//theme
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
    <Box bg={colors.cover} p="3" mt={props.mt} ref={myRef} mb={props.mb}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <Image
          source={{uri:props.templeic ? props?.templeic : 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413006/religious-assistant/static_assets/closest_mosque_ic_snp3f2.png'}}
          style={{
            height: 40,
            width: 40,
          }}
          alt="icon .."
        />
        <Text style={styles.textMosque}>{props.text}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontFamily: fonts.Signika.medium,
            color: colors.black,
            marginTop: '5%',
            marginLeft: props.ml,
            fontSize: 16,
          }}>
          {props.distance}
        </Text>
        <TouchableOpacity
          style={{
            right: 10,
          }}
          onPress={props.onPress}
          activeOpacity={0.6}>
          <Image
            source={{uri:'https://res.cloudinary.com/nadirhussainnn/image/upload/v1663413045/religious-assistant/static_assets/direction_ic_cantmg.png'}}
            style={{
              height: 50,
              width: 50,
              tintColor: colors.primary,
            }}
            alt="Direction"
          />
        </TouchableOpacity>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  textMosque: {
    fontFamily: fonts.Signika.medium,
    color: colors.black,
    marginTop: '5%',
    fontSize: 20,
    flexWrap: 'wrap',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.black,
    marginTop: '5%',
  },
});
