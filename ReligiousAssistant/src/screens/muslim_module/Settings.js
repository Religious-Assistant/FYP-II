/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import {setTab} from '../../redux/slices/muslim_module_slices/bottomNavSlice';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  VStack,
  HStack,
  Divider,
  Box,
  Stack,
  Heading,
  Switch,
  Modal,
  ScrollView,
  FormControl,
  Input,
  Button,
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import avatar from '../../../assets/images/avatar.png';

import editIcon from '../../../assets/images/edit_ic.png';
import cameraIcon from '../../../assets/images/camera_ic.png';
import galleryIcon from '../../../assets/images/gallery_ic.png';
import edit from '../../../assets/images/edit.png';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';
export default function Settings({navigation}) {
  const dispatch = useDispatch();

  //when tab is focused in MuslimBottomTab.js, this will be called
  React.useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //       dispatch(setTab('Settings'))
    // });
    //unsubscribe on unmount
    //return unsubscribe;
  }, [navigation]);

  const [image, setImage] = useState(avatar);

  const [placement, setPlacement] = useState(undefined);
  const [openPassModal, setOpenPassModal] = useState(false);
  const [openPrimaryModal, setPrimaryModal] = useState(false);
  const [openImgModal, setImageModal] = useState(false);
  //for password
  const openPasswordModal = placement => {
    setOpenPassModal(true);
    setPlacement(placement);
  };
  //for primary mosque
  const openPrimaryMosqModal = placement => {
    setPrimaryModal(true);
    setPlacement(placement);
  };

  //For gallery
  const openImageModal = placement => {
    setImageModal(true);
    setPlacement(placement);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        const obj = {uri: image.path};
        // console.log(obj);
        setImage(obj);
        setImageModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        const obj = {uri: image.path};
        // console.log(obj);
        setImage(obj);
        setImageModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <TouchableOpacity
        activeOpacity={0.98}
        onPress={() => openImageModal('bottom')}>
        <Image style={styles.avatar} source={image} />
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
      <Text style={styles.username}>Kinza</Text>
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
                      style={{fontFamily: fonts.Signika.bold}}
                      color={colors.primary}>
                      Password
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    KinzaShaikh123
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
                      onPress={() => openPasswordModal('center')}>
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

            {/* Primary Mosque */}

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
                      Primary Mosque
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    Sukkur IBA Mosque
                  </Text>
                  <HStack
                    flexDirection={'row'}
                    space={4}
                    justifyContent="space-between">
                    <HStack></HStack>
                    {/* Edit Primary Mosque */}
                    <TouchableHighlight
                      activeOpacity={0.8}
                      underlayColor={colors.cover}
                      onPress={() => openPrimaryMosqModal('center')}>
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
                    <Text
                      fontSize="xs"
                      fontFamily={fonts.Signika.medium}
                      _text={styles.info}
                      ml="-0.5"
                      mt="-1">
                      w.r.t Primary Mosque
                    </Text>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling namaz notifications, you will be able to get
                    notification about each prayer
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
                        onPress={() => {
                          console.log('hi');
                        }}
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
                    <Text
                      fontSize="xs"
                      fontFamily={fonts.Signika.medium}
                      _light={{
                        color: colors.info,
                      }}
                      ml="-0.5"
                      mt="-1">
                      w.r.t Primary Mosque
                    </Text>
                  </Stack>
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling Auto silent mode, your phone will
                    automatically be silent when you will enter the mosque
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
                  <Text fontWeight="400" fontFamily={fonts.Signika.medium}>
                    After enabling Accountability notifications, you will get
                    notification every day at 10 pm to keep track of your Namaz
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
                        marginLeft={'80%'}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </VStack>
          {/*         
        Password Modal */}
          <Modal
            isOpen={openPassModal}
            onClose={() => setOpenPassModal(false)}
            safeAreaTop={true}>
            <Modal.Content maxWidth="350" {...styles[placement]}>
              <Modal.CloseButton />
              <Modal.Header _text={{fontFamily: fonts.Signika.bold}}>
                Change Password
              </Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label _text={{fontFamily: fonts.Signika.medium}}>
                    New Password
                  </FormControl.Label>
                  <Input type="password" />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    _text={{fontFamily: fonts.Signika.regular}}
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setOpenPassModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    _text={{fontFamily: fonts.Signika.regular}}
                    color={colors.white}
                    colorScheme="yellow"
                    onPress={() => {
                      setOpenPassModal(false);
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          {/* 
          Primary Mosque Modal */}
          <Modal
            isOpen={openPrimaryModal}
            onClose={() => setPrimaryModal(false)}
            safeAreaTop={true}>
            <Modal.Content maxWidth="350" {...styles[placement]}>
              <Modal.CloseButton />
              <Modal.Header _text={{fontFamily: fonts.Signika.bold}}>
                Change Primary Mosque
              </Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label _text={{fontFamily: fonts.Signika.medium}}>
                    New Primary Mosque
                  </FormControl.Label>
                  <Input />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    _text={{fontFamily: fonts.Signika.regular}}
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setPrimaryModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    _text={{fontFamily: fonts.Signika.regular}}
                    color={colors.white}
                    colorScheme="yellow"
                    onPress={() => {
                      setPrimaryModal(false);
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          {/* Image Modal */}
          <Modal
            isOpen={openImgModal}
            size="lg"
            onClose={() => setImageModal(false)}
            safeAreaTop={true}>
            <Modal.Content
              maxWidth="350"
              style={{
                marginBottom: 0,
                marginTop: 'auto',
              }}>
              <Modal.CloseButton />
              <Modal.Header _text={{fontFamily: fonts.Signika.bold}}>
                Upload Photo
              </Modal.Header>
              <Modal.Body>
                <View
                  marginTop="2%"
                  marginBottom="2%"
                  style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.98}
                      onPress={takePhotoFromCamera}>
                      <Image
                        marginTop="5%"
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
                        marginTop="5%"
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
              </Modal.Body>
              <Modal.Footer>
                <Button
                  _text={{fontFamily: fonts.Signika.regular}}
                  color={colors.white}
                  colorScheme="yellow"
                  onPress={() => {
                    setImageModal(false);
                  }}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </ScrollView>
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
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -50,
  },
  text: {
    fontFamily: fonts.Signika.medium,
    color: colors.primary,
    marginTop: '5%',
    fontSize: 17,
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.primary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
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
