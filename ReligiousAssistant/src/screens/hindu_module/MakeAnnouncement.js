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

import {Formik} from 'formik';
import CATEGORIES from '../muslim_module/UIConstants';

export default function MakeAnnouncement() {
  function announce(values) {
    console.log(values);
  }

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
            <Formik
              initialValues={{
                description: '',
                category: CATEGORIES.OTHER,
              }}
              onSubmit={values => {
                announce(values);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <>
                  <TextArea
                    name="description"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    mt={'30%'}
                    height={'40%'}
                    color={colors.white}
                    bgColor={colors.tertiary}
                    placeholder="Statement"
                    w="100%"
                    fontFamily={fonts.Signika.ligh}
                    fontSize={'lg'}
                    autoCorrect={true}
                    maxLength={500}
                    multiline={true}
                  />

                  <Select
                    _text={styles.text}
                    color={colors.white}
                    mt={'3%'}
                    selectedValue={values.category}
                    accessibilityLabel="Select Category"
                    placeholder="Select Announcement Category"
                    w={{
                      base: '98%',
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
                    onValueChange={item => setFieldValue('category', item)}>
                    <Select.Item
                      label="Funeral Prayer"
                      value={CATEGORIES.EID_NAMAZ}
                      color={'white'}
                    />
                    <Select.Item
                      label="Other"
                      value={CATEGORIES.OTHER}
                      color={'white'}
                    />
                  </Select>

                  <CustomButton
                    title="Announce Now"
                    variant="solid"
                    mt="8%"
                    onPress={handleSubmit}
                    color="white"
                    base="99%"
                  />
                </>
              )}
            </Formik>
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
