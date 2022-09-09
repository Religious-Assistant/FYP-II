/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {
  Icon,
  Fab,
  Box,
  Center,
  NativeBaseProvider,
  Text,
  Image,
} from 'native-base';

//navigation
import {useNavigation} from '@react-navigation/native';
import {
  HINDU_USER_ANNOUNCEMENT_DETAILS,
  HINDU_USER_MAKE_ANNOUNCEMENT_SCREEN,
} from '../../../navigation/constants';

import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//icons
import Octicons from 'react-native-vector-icons/Octicons';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteAnnouncement,
  getAnnouncements,
  selectAnnouncements,
  selectHasErrorInAnnouncements,
  selectIsLoadingAnnouncements,
} from '../../../redux/slices/hindu_module_slices/hinduAnnouncementSlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';

//components
import Loader from '../../common/Loader';
import Empty from '../../common/Empty';

//to check connection
import NoConnectionScreen from '../../common/NoConnectionScreen';
import {checkConnected} from '../../common/CheckConnection';

//helper functions
import {dateDifference} from '../../../utils/helpers';

export default function Announcements() {
  const [connectStatus, setConnectStatus] = useState(false);
  const dispatch = useDispatch();

  let announcements = useSelector(selectAnnouncements);
  const isLoadingAnnouncements = useSelector(selectIsLoadingAnnouncements);
  const hasErrorInAnnouncements = useSelector(selectHasErrorInAnnouncements);
  const user = useSelector(selectUserData);

  let announcementsArray = [];

  Object.keys(announcements)
    .sort()
    .reverse()
    .forEach(key => {
      announcementsArray.push({
        key: key,
        _id: announcements[key]._id,
        avatar: announcements[key].avatar,
        statement: announcements[key].statement,
        createdAt: announcements[key].createdAt,
        announcedBy: announcements[key].announcedBy,
      });
    });

  useEffect(() => {
    checkConnected().then(res => {
      setConnectStatus(res);
    });
    if (user) {
      dispatch(getAnnouncements({username: user.username}));
    }
  }, [connectStatus]);

  //Handle delete
  const handleDelete = item => {
    if (user) {
      dispatch(
        deleteAnnouncement({
          username: user?.username,
          announcementId: item.item._id,
        }),
      );
    }
  };

  return connectStatus ? (
    <>
      <View style={styles.root}>
        {isLoadingAnnouncements ? (
          <Loader msg="Loagding announcements" />
        ) : (
          <FlatList
            style={styles.root}
            data={announcementsArray}
            extraData={announcementsArray}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => item?._id}
            renderItem={v => {
              return (
                <ListItem
                  item={v}
                  handleDelete={() => {
                    handleDelete(v);
                  }}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  if (user) {
                    dispatch(getAnnouncements({username: user.username}));
                  }
                }}
                refreshing={isLoadingAnnouncements}
              />
            }
            ListEmptyComponent={<Empty message={'No announcements yet'} />}
          />
        )}
      </View>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <FabButton />
        </Center>
      </NativeBaseProvider>
    </>
  ) : (
    <NoConnectionScreen
      onCheck={() => {
        checkConnected().then(res => {
          setConnectStatus(res);
        });
      }}
    />
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

  const gotoAnnouncement = () => {
    navigator.navigate(HINDU_USER_ANNOUNCEMENT_DETAILS, {
      announcement: announcement,
    });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipe}>
        <TouchableOpacity style={styles.container} onPress={gotoAnnouncement}>
          <Image
            source={{uri: announcement.avatar}}
            style={styles.avatar}
            alt="image.."
          />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>
                  {announcement?.announcedBy.toUpperCase()}
                </Text>
                <Text style={styles.timeAgo}>
                  {dateDifference(announcement?.createdAt)} ago
                </Text>
              </View>
              <Text numberOfLines={2}>{announcement.statement}</Text>
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
    navigator.navigate(HINDU_USER_MAKE_ANNOUNCEMENT_SCREEN);
  }
  return (
    <Box position="relative" w="100%" h={100}>
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
    flex: 1,
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
