/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {
  Icon,
  Fab,
  Box,
  Center,
  NativeBaseProvider,
  Text,
  Image,
  Button,
} from 'native-base';

import colors from '../../../theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';

import {useNavigation} from '@react-navigation/native';
import {
  MAKE_ANNOUNCEMENT_SCREEN,
  MUSLIM_USER_ANNOUNCEMENT_DETAILS,
} from '../../../navigation/constants';

import {data} from './dummyData';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAnnouncements,
  selectAnnouncements,
  selectHasErrorInAnnouncements,
  selectIsLoadingAnnouncements,
} from '../../../redux/slices/muslim_module_slices/muslimAnnouncementSlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import Loader from '../../common/Loader';
import moment from 'moment';

export default function Announcements() {
  // const [announcements, setAnnouncements] = useState(data);

  const dispatch = useDispatch();

  const announcements = useSelector(selectAnnouncements);
  const isLoadingAnnouncements = useSelector(selectIsLoadingAnnouncements);
  const hasErrorInAnnouncements = useSelector(selectHasErrorInAnnouncements);
  const user = useSelector(selectUserData);

  useEffect(() => {
    if (!announcements && user) {
      dispatch(getAnnouncements({username: user.username}));
    }
  }, []);

  // //Handle delete
  // const handleDelete = item => {
  //   const arr = [...announcements];
  //   arr.splice(item.index, 1);
  //   setAnnouncements(arr);

  // };

  return (
    <View style={styles.root}>
      {isLoadingAnnouncements ? (
        <Loader msg="Loagding announcements" />
      ) : (
        <FlatList
          style={styles.root}
          data={announcements}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id}
          renderItem={v => {
            console.log(v);
            return (
              <ListItem
                item={v}
                handleDelete={() => {
                  handleDelete(v);
                }}
              />
            );
          }}
        />
      )}
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <FabButton />
        </Center>
      </NativeBaseProvider>
    </View>
  );
}

const ListItem = props => {
  const announcement = props.item.item;

  const navigator = useNavigation();

  const rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity
        onPress={props.handleDelete}
        style={styles.deleteContainer}
        activeOpacity={0.7}>
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const dateDifference = () => {
    let dt1 = new Date(announcement.createdAt);
    let dt2 = new Date();           //Now
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  const gotoAnnouncement = () => {
    navigator.navigate(MUSLIM_USER_ANNOUNCEMENT_DETAILS, {
      announcement: announcement,
    });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipe}>
        <TouchableOpacity style={styles.container} onPress={gotoAnnouncement}>
          <Image
            source={{uri: announcement.image}}
            style={styles.avatar}
            alt="image.."
          />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>{announcement.announcedBy}</Text>
                <Text>{announcement.statement}</Text>
              </View>
              <Text style={styles.timeAgo}>{dateDifference()} mins ago</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
const FabButton = () => {
  const navigator = useNavigation();

  function launchMakeAnnouncementScreen() {
    navigator.navigate(MAKE_ANNOUNCEMENT_SCREEN);
  }
  return (
    <Box position="relative" w="100%" h={200}>
      <Fab
        bottom={46}
        backgroundColor={colors.tertiary}
        icon={
          <Icon
            color={colors.secondary}
            as={<Octicons name="pencil" />}
            size={5}
          />
        }
        label={
          <Text color="white" fontSize="sm">
            Make announcement
          </Text>
        }
        onPress={launchMakeAnnouncementScreen}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  deleteContainer: {
    justifyContent: 'center',
    backgroundColor: colors.error,
    width: '30%',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    color: colors.white,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: colors.info,
  },
});
