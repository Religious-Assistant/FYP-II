/**
 * @author Kinza
 * @version 1.0
 */

 import React, {useState, useEffect} from 'react';

 import {StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
 
 import ImagePicker from 'react-native-image-crop-picker';
 import {
   Image,
   Text,
   View,
   VStack,
   HStack,
   Divider,
   Box,
   Stack,
   Heading,
   Switch,
   Modal,
   FormControl,
   Input,
   Button,
   Actionsheet,
   useDisclose,
   ScrollView,
   FlatList,
 } from 'native-base';
 import SearchableDropdown from 'react-native-searchable-dropdown';
 
 //theme
 import colors from '../../../theme/colors';
 import fonts from '../../../theme/fonts';
 import editIcon from '../../../../assets/images/edit_ic.png';
 import cameraIcon from '../../../../assets/images/camera_ic.png';
 import galleryIcon from '../../../../assets/images/gallery_ic.png';
 import edit from '../../../../assets/images/edit.png';
 
 //Redux
 import {useDispatch, useSelector} from 'react-redux';
 import {setTab} from '../../../redux/slices/hindu_module_slices/bottomNavSlice';
 import {
   getUpdatedUserData,
   getUserData,
   selectIsLoadingGetUserData,
   selectUserData,
 } from '../../../redux/slices/auth_slices/authSlice';

 import {GOOGLE_MAP, HINDU_SETTINGS} from '../../../navigation/constants';
 import Loader from '../../common/Loader'; 
 import {useNavigation} from '@react-navigation/native';
import { selectHasUpdatedAutosilentSetting, selectHasUpdatedPassword, selectHasUpdatedVegNotifications, selectIsUploadingProfileImage, updateAutoSilentSetting, updatePassword, updateProfileImage, updateVegNotifications } from '../../../redux/slices/hindu_module_slices/hinduPreferencesSlice';


export default function Settings({route, navigation}) {

  const navigator = useNavigation();

  //Modal
  const {isOpen, onOpen, onClose} = useDisclose();

  const [open, setOpen] = useState(false);
  const [isPasswordModal, setIspasswordModal] = useState(false);
  const [modalHeader, setModalHeader] = useState('');

  function closeModal() {
    setOpen(false);
  }

  function openeModal(header, passwordModalFlag) {
    setOpen(true);
    setModalHeader(header);
    setIspasswordModal(passwordModalFlag);
  }

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isLoadingGetUserData = useSelector(selectIsLoadingGetUserData);

  const hasUpdatedAutoSilentSettings = useSelector(
    selectHasUpdatedAutosilentSetting,
  );
  const hasUpdatedVegSettings = useSelector(
    selectHasUpdatedVegNotifications,
  );

  const isUploadingProfileImage = useSelector(selectIsUploadingProfileImage);

  const hasUpdatedPassword = useSelector(selectHasUpdatedPassword);

  //when tab is focused in MuslimBottomTab.js, this will be called

  useEffect(() => {
    dispatch(getUserData());
    if (user?.avatar) {
      setAvatar({image: user?.avatar, key: 0});
    }

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab('Settings'));
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  //avatar state
  const [avatar, setAvatar] = useState({
    image: `${user?.avatar}`,
    key: 1,
  });

  const sendFileToBackend = image => {
    dispatch(
      updateProfileImage({profileImage: image.data, username: user?.username}),
    );
    dispatch(getUpdatedUserData({username: user?.username}));
  };

  //Take user's profile from Camera
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    })
      .then(image => {
        sendFileToBackend(image);
        setAvatar({image: image.path, key: 0});
        onClose;
      })
      .catch(err => {
        console.log(err);
      });
  };

  //take user's profile from Gallery
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    })
      .then(image => {
        sendFileToBackend(image);
        setAvatar({image: image.path, key: 2});
        onClose;
      })
      .catch(err => {
        console.log(err);
      });
  };

  function updateUserPassword(newPassword) {
    dispatch(
      updatePassword({
        username: user.username,
        newPassword: newPassword,
      }),
    );
    if (hasUpdatedPassword) {
      alert('Updated Password');
    }
  }

  function updateVegNotificationsSettings(state) {
    dispatch(
      updateVegNotifications({
        username: user.username,
        state: state,
      }),
    );

    if (hasUpdatedVegSettings) {
      alert(`Updated Veg Notification Settings`);
    }
  }

  function updateAutoSilent(state) {
    dispatch(updateAutoSilentSetting({username: user.username, state: state}));

    if (hasUpdatedAutoSilentSettings) {
      alert(`Updated Auto-Silent Settings`);
    }
  }


  function updatePrimaryTemple(item) {}

  function openMap() {
    navigator.navigate(GOOGLE_MAP, {screen: HINDU_SETTINGS});
  }
  //Rough Data
  const [serverData, setServerData] = React.useState([]);

  const [password, setPassword] = useState();
  const handlePassword = text => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Set Your Preferences</Text>
      </View>
      {isLoadingGetUserData || isUploadingProfileImage ? (
        <Loader msg="Loading ..." />
      ) : (
        <>
          <TouchableOpacity activeOpacity={0.98} onPress={onOpen}>
            <Image
              style={styles.avatar}
              source={{uri: avatar.image}}
              alt="Loading image .."
            />
            <Image
              marginLeft="55%"
              marginTop="5%"
              source={edit}
              style={{
                height: 45,
                width: 45,
                tintColor: colors.primary,
              }}
              alt="icon .."
            />
          </TouchableOpacity>
          <Text style={styles.username}>{user?.username}</Text>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            flex={1}
            maxHeight={'57%'}>
            <View
              style={{
                flex: 0.7,
                marginTop: 35,
                marginLeft: '6%',
                width: '90%',
                maxWidth: '88%',
                height: '90%',
                maxHeight: '30%',
              }}>
              <VStack space={3} divider={<Divider />} w="99%">
                {/* Password */}

                <Box alignItems="center">
                  <Box
                    maxW="90%"
                    w={{
                      base: '90%',
                    }}
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    {/* Password */}
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={styles.label}
                          color={colors.primary}>
                          Password
                        </Heading>
                      </Stack>
                      <Text fontWeight="400" style={styles.text}>
                        Old Password is Hashed and can't be displayed here.
                      </Text>
                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        <HStack></HStack>

                        {/* Edit Password */}
                        <TouchableHighlight
                          activeOpacity={0.8}
                          underlayColor={colors.cover}
                          onPress={() => openeModal('Change Password', true)}>
                          <Image
                            marginLeft="6%"
                            source={editIcon}
                            style={{
                              height: 30,
                              width: 33,
                              tintColor: colors.secondary,
                            }}
                            alt="icon .."
                          />
                        </TouchableHighlight>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>

                {/* Primary Temple */}

                <Box alignItems="center">
                  <Box
                    maxW="90%"
                    w={{
                      base: '90%',
                    }}
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={{fontFamily: fonts.Signika.bold}}
                          color={colors.primary}>
                          Primary Temple
                        </Heading>
                      </Stack>
                      <Text fontWeight="400" style={styles.text}>
                        {user?.preferences?.primaryTemple}
                      </Text>
                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        <HStack></HStack>
                        {/* Edit Primary Temple */}
                        <TouchableHighlight
                          activeOpacity={0.8}
                          underlayColor={colors.cover}
                          onPress={() =>
                            openeModal('Change Primary Temple', false)
                          }>
                          <Image
                            marginLeft="6%"
                            source={editIcon}
                            style={{
                              height: 30,
                              width: 33,
                              tintColor: colors.secondary,
                            }}
                            alt="icon .."
                          />
                        </TouchableHighlight>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>

                {/* Location */}

                <Box alignItems="center">
                  <Box
                    maxW="90%"
                    w={{
                      base: '90%',
                    }}
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={{fontFamily: fonts.Signika.bold}}
                          color={colors.primary}>
                          Location
                        </Heading>
                      </Stack>
                      {route?.params ? (
                        <Text fontWeight="400" style={styles.text}>
                          {`Longitude: ${route.params.longitude}\nLatitude: ${route.params.latitude}`}
                        </Text>
                      ) : user ? (
                        <Text fontWeight="400" style={styles.text}>
                          {`Longitude: ${user.location.coordinates[0]}\nLatitude: ${user.location.coordinates[1]}`}
                        </Text>
                      ) : (
                        <Text fontWeight="400" style={styles.text}>
                          {`No Location set yet`}
                        </Text>
                      )}

                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        <HStack></HStack>
                        {/* Edit Location Temple */}
                        <TouchableHighlight
                          activeOpacity={0.8}
                          underlayColor={colors.cover}
                          onPress={() => {
                            openMap();
                          }}>
                          <Image
                            marginLeft="6%"
                            source={editIcon}
                            style={{
                              height: 30,
                              width: 33,
                              tintColor: colors.secondary,
                            }}
                            alt="icon .."
                          />
                        </TouchableHighlight>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>

                {/* Namaz Noti */}
                <Box alignItems="center">
                  <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={{fontFamily: fonts.Signika.bold}}
                          color={colors.primary}>
                          Namaz Notifications
                        </Heading>
                        <Text style={styles.info} mt="-1">
                          w.r.t Primary Temple
                        </Text>
                      </Stack>
                      <Text
                        fontWeight="400"
                        style={{fontFamily: fonts.Signika.regular}}>
                        After enabling namaz notifications, you will be able to
                        get notification about each prayer
                      </Text>
                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        {/* switch for Namaz Notification */}
                        <HStack>
                          <Switch
                            offTrackColor="rose.300"
                            onTrackColor="lime.300"
                            size="lg"
                            marginLeft={'80%'}
                            onValueChange={value => {
                              updateNamazNotification(value);
                            }}
                            defaultIsChecked={
                              user?.preferences?.namazNotifications
                            }
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>

                {/* AutoSilent Mode */}
                <Box alignItems="center">
                  <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={{fontFamily: fonts.Signika.bold}}
                          color={colors.primary}>
                          Auto Silent Mode
                        </Heading>
                        <Text style={styles.info} mt="-1">
                          w.r.t Primary Temple
                        </Text>
                      </Stack>
                      <Text
                        fontWeight="400"
                        style={{fontFamily: fonts.Signika.regular}}>
                        After enabling Auto silent mode, your phone will
                        automatically be silent when you will enter the temple
                      </Text>
                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        {/* switch for Auto Silent mode */}
                        <HStack>
                          <Switch
                            offTrackColor="rose.300"
                            onTrackColor="lime.300"
                            size="lg"
                            onValueChange={value => {
                              updateAutoSilent(value);
                            }}
                            defaultIsChecked={user?.preferences?.phoneSilent}
                            marginLeft={'80%'}
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>

                {/* Accountability Notification */}
                <Box alignItems="center">
                  <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor={colors.cover}
                    borderWidth="1"
                    marginBottom={'3'}
                    _light={{
                      backgroundColor: colors.cover,
                    }}>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading
                          size="md"
                          ml="-1"
                          style={{fontFamily: fonts.Signika.bold}}
                          color={colors.primary}>
                          Accountability Notifications
                        </Heading>
                      </Stack>
                      <Text
                        fontWeight="400"
                        style={{fontFamily: fonts.Signika.regular}}>
                        After enabling Accountability notifications, you will
                        get notification every day at 10 pm to keep track of
                        your Namaz
                      </Text>
                      <HStack
                        flexDirection={'row'}
                        space={4}
                        justifyContent="space-between">
                        {/* switch for Accountability Notification */}
                        <HStack>
                          <Switch
                            offTrackColor="rose.300"
                            onTrackColor="lime.300"
                            size="lg"
                            onValueChange={value => {
                              updateAccountabilityNotificarions(value);
                            }}
                            defaultIsChecked={
                              user?.preferences?.accountabilityNotifications
                            }
                            marginLeft={'80%'}
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>
              </VStack>

              {/* Modals */}
              <CommonModal
                open={open}
                closeModal={closeModal}
                headerText={modalHeader}
                newPassword={password}
                updateUserPassword={updateUserPassword}>
                {isPasswordModal ? (
                  <FormControl>
                    <FormControl.Label
                      _text={{fontFamily: fonts.Signika.medium}}>
                      New Password
                    </FormControl.Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChangeText={handlePassword}
                    />
                  </FormControl>
                ) : (
                  <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => {
                      console.log('Item');
                      // updatePrimaryMosqueSetting(item)
                    }}
                    setSort
                    containerStyle={{padding: 5}}
                    textInputStyle={{
                      padding: 5,
                      borderWidth: 1,
                      fontFamily: fonts.Signika.medium,
                    }}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: colors.cover,
                      borderColor: '#bbb',
                    }}
                    itemTextStyle={{
                      color: colors.black,
                      fontFamily: fonts.Signika.medium,
                    }}
                    itemsContainerStyle={{
                      maxHeight: '100%',
                    }}
                    items={serverData}
                    placeholder="Select Mosque"
                  />
                )}
              </CommonModal>

              {/* Image ActionSheet */}

              <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
                <Actionsheet.Content>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 20,
                        fontFamily: fonts.Signika.bold,
                      }}>
                      Upload Photo
                    </Text>
                  </Box>
                  <View
                    marginTop="2%"
                    marginBottom="5%"
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                    }}>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.98}
                        onPress={takePhotoFromCamera}>
                        <Image
                          marginTop="3%"
                          marginRight="29%"
                          source={cameraIcon}
                          style={{
                            height: 55,
                            width: 55,
                          }}
                          alt="icon .."
                        />
                      </TouchableOpacity>
                      <Text style={styles.text}>Camera</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.98}
                        onPress={choosePhotoFromLibrary}>
                        <Image
                          marginTop="6%"
                          source={galleryIcon}
                          style={{
                            height: 55,
                            width: 55,
                          }}
                          alt="icon .."
                        />
                      </TouchableOpacity>
                      <Text style={styles.text}>Gallery</Text>
                    </View>
                  </View>
                  <Actionsheet.Footer>
                    <Button
                      onPress={onClose}
                      _text={{fontFamily: fonts.Signika.regular}}
                      color={colors.white}
                      colorScheme="yellow">
                      Exit
                    </Button>
                  </Actionsheet.Footer>
                </Actionsheet.Content>
              </Actionsheet>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const CommonModal = props => {
  const {open, headerText, newPassword, updateUserPassword} = props;
  //console.log(headerText);
  function closeModal() {
    props.closeModal();
  }

  return (
    <Modal isOpen={open} onClose={closeModal} safeAreaTop={true}>
      <Modal.Content maxWidth="350" {...styles['center']}>
        <Modal.CloseButton />
        <Modal.Header _text={{fontFamily: fonts.Signika.bold}}>
          {headerText}
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              _text={{fontFamily: fonts.Signika.regular}}
              variant="ghost"
              colorScheme="blueGray"
              onPress={closeModal}>
              Cancel
            </Button>
            {headerText == 'Change Password' ? (
              <Button
                _text={{fontFamily: fonts.Signika.regular}}
                color={colors.white}
                colorScheme="yellow"
                onPress={() => {
                  updateUserPassword(newPassword);
                }}
                type="submit">
                Save
              </Button>
            ) : (
              <Button
                _text={{fontFamily: fonts.Signika.regular}}
                color={colors.white}
                colorScheme="yellow"
                onPress={closeModal}
                type="submit">
                Save
              </Button>
            )}
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    height: 110,
  },
  headerText: {
    fontFamily: fonts.Signika.bold,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    color: colors.secondary,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -50,
  },
  text: {
    fontFamily: fonts.Signika.regular,
    fontSize: 17,
    padding: 5,
    color: colors.tertiary,
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
    padding: 5,
    color: colors.info,
    flexWrap: 'wrap',
  },
  username: {
    fontFamily: fonts.Signika.bold,
    fontSize: 30,
    marginTop: '5%',
    marginLeft: '38%',
    padding: 8,
    color: colors.primary,
    //marginLeft:"92%"
  },
});
