/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, VStack, Divider, Button, Text, HStack, Center} from 'native-base';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

export default function Fast(props) {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  const currDate = date + '-' + month + '-' + year;

  const [keepFast, setKeepFast] = useState(0);
  return (
    <View style={styles.container}>
      <Box
      rounded={"lg"}
      style={styles.mainBox}
      >
        <View>
          <Text style={styles.text}>
            Have you kept fast on{' '}
            {props.selectedDate == 'Invalid date'
              ? currDate
              : props.selectedDate}{' '}
            ?
          </Text>
        </View>

        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingTop:40}}>
          <Button
            title="Yes"
            variant="solid"
            color="white"
            w={{
              base: '40%',
            }}
            colorScheme="yellow"
            onPress={() => {
              setKeepFast(1);
            }}>
            Yes
          </Button>
          <Button
            title="No"
            variant="solid"
            color="white"
            w={{
              base: '40%',
            }}
            colorScheme="yellow"
            onPress={() => {
              setKeepFast(0);
            }}>
            No
          </Button>
        </View>
      </Box>
      <Button
        w={{
          base: '29%',
        }}
        _text={{
          fontSize: 'md',
          fontFamily: fonts.Signika.medium,
          color: colors.white,
        }}
        colorScheme="yellow"
        variant="solid"
        style={{alignSelf: 'flex-end', right: 10, top: "22.5%", bottom:10}}
        onPress={() => {
          keepFast == 0 ? console.log('No') : console.log('Yes');
        }}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    fontFamily: fonts.Signika.regular,
    marginTop: '31%',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Signika.regular,
  },
  mainBox: {
    alignSelf:'center',
    width:"94%",
    backgroundColor: colors.cover,
    padding:20,
    marginTop:30,
    minHeight:"20%"
  },
});
