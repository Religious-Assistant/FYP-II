/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center, TextArea, Select, CheckIcon} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import timeICon from '../../../assets/images/announce_ic.png';
import CustomButton from '../../components/CustomButton';

export default function MakeAnnouncement() {
  let [category, setCategory] = React.useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View
          style={{
            flex: 0.17,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Image
              source={timeICon}
              tintColor={colors.secondary}
              style={{
                marginTop: '20%',
                marginRight: '5%',
                marginBottom: '-2%',
                height: 120,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Make </Text>
              <Heading color={colors.white}>
                <Text style={{fontFamily: fonts.Signika.bold}}>
                  Announcement
                </Text>
              </Heading>
            </Heading>
          </View>
        </View>
        <View style={{flex: 0.83}} width="95%">
          <Center
            width="88%"
            space={2}
            maxW="88%"
            marginTop={'35%'}
            marginLeft={'8%'}
            marginBottom={'5%'}>
            <TextArea
              mt={'50%'}
              color={colors.white}
              bgColor={colors.tertiary}
              placeholder="Statement"
              w="100%"
              maxW="400"
            />
            <Select
              _text={styles.text}
              color={colors.white}
              shadow={2}
              selectedValue={category}
              minWidth="100%"
              mt={'3%'}
              accessibilityLabel="Select Category"
              placeholder="Select Category"
              w={{
                base: '90%',
              }}
              _selectedItem={{
                bg: colors.secondary,
                endIcon: <CheckIcon size="5" />,
              }}
              _light={{
                bg: colors.tertiary,
                _text: {color: colors.white},
              }}
              _dark={{
                bg: colors.white,
              }}
              onValueChange={itemValue => {
                setCategory(itemValue);
                // props.onValueChange;
              }}>
              <Select.Item
                shadow={2}
                label="Eid Namaz"
                value="eidNamaz"
                color={'white'}
              />
              <Select.Item shadow={2} label="Other" value="other" />
            </Select>

            <CustomButton
              title="Make Announcement"
              variant="solid"
              mt="8%"
              color="white"
              base="99%"
            />
          </Center>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors.white,
    fontFamily: fonts.Signika.regular,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
  },
});
