/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Heading, Image, Center, TextArea, Select, CheckIcon} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

import timeICon from '../../../../assets/images/announce_ic.png';
import CustomButton from '../../../components/CustomButton';

import {Formik} from 'formik';
import {ANNOUNCEMENT_CATEGORIES} from '../UIConstants';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import {getAnnouncements, makeAnnouncement, selectHasErrorInMakeAnnouncement, selectIsLoadingMakeAnnouncement} from '../../../redux/slices/muslim_module_slices/muslimAnnouncementSlice';
import Loader from '../../common/Loader';

export default function MakeAnnouncement() {


  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isMakingAnnouncement=useSelector(selectIsLoadingMakeAnnouncement)
  const hasErrorinMakeAnnouncement=useSelector(selectHasErrorInMakeAnnouncement)

  function announce(values) {
    if (user) {
      console.log(user)
      dispatch(
        makeAnnouncement({
          announcedBy: user.username,
          statement: values.description,
          category: values.category,
          longitude:user.location?.coordinates[0],          //this shoud come from user.pref.location.longitude
          latitude:user.location?.coordinates[1],
          avatar:user.avatar          //Url of image, may cause problem on Heroku
        }),
      );
      dispatch(getAnnouncements({username:user.username}))
    }
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
        {
          isMakingAnnouncement?<Loader msg="Announcing to people ..." />:
          
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
                category: ANNOUNCEMENT_CATEGORIES[1],
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
                  {/* Statement */}
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
                  {/* Announcement Category */}
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
                      label="Eid Namaz"
                      value={ANNOUNCEMENT_CATEGORIES[0]}
                      color={'white'}
                    />
                    <Select.Item
                      label="Other"
                      value={ANNOUNCEMENT_CATEGORIES[1]}
                      color={'white'}
                    />
                  </Select>
                  {/* button */}
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
        }
        
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
