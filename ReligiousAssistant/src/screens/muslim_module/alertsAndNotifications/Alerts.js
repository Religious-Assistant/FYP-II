/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {Text, Image} from 'native-base';

import colors from '../../../theme/colors';

import {useNavigation} from '@react-navigation/native';

import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import fonts from '../../../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';
import Loader from '../../common/Loader';
import Empty from '../../common/Empty';
import {dateDifference} from '../../../utils/helpers';
import {
  deleteNotification,
  getUserNotifications,
  selectHasErrorInGettingNotifications,
  selectIsLoadingNotification,
  selectMuslimNotifications,
} from '../../../redux/slices/muslim_module_slices/muslimNotificationSlice';
import {setTab} from '../../../redux/slices/muslim_module_slices/bottomNavSlice';
import CATEGORIES from '../UIConstants';
import { IMAM_CONSENSUS, MOSQUE_CONSENSUS, MUSLIM_ANNOUNCEMENTS, NEW_MOSQUE_ADDITION } from '../../../navigation/constants';

export default function Alerts({navigation}) {
  const dispatch = useDispatch();

  let notifications = useSelector(selectMuslimNotifications);
  const isLoadingNotification = useSelector(selectIsLoadingNotification);
  const hasErrorInAnnouncements = useSelector(
    selectHasErrorInGettingNotifications,
  );
  const user = useSelector(selectUserData);

  //when tab is focused in MuslimBottomTab.js, this will be called
  useEffect(() => {
    if (user) {
      dispatch(getUserNotifications({username: user?.username}));
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTab('Alerts'));
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  //Handle delete
  const handleDelete = item => {
    if (user) {
      dispatch(
        deleteNotification({
          username: user?.username,
          notificationId: item.item._id,
        }),
      );

      dispatch(getUserNotifications({username: user?.username}));
    }
  };

  return (
    <>
      <View style={styles.root}>
        {isLoadingNotification ? (
          <Loader msg="Loagding Notifications" />
        ) : (
          <FlatList
            style={styles.root}
            data={notifications}
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
                    dispatch(getUserNotifications({username: user.username}));
                  }
                }}
                refreshing={isLoadingNotification}
              />
            }
            ListEmptyComponent={<Empty message={'No Notifications yet'} />}
          />
        )}
      </View>
    </>
  );
}

const ListItem = props => {
  const notification = props.item.item;
  const navigator=useNavigation()

  const gotoRespectiveScreen=(category)=>{
    
    if(category==CATEGORIES.EID_NAMAZ){
      navigator.navigate(MUSLIM_ANNOUNCEMENTS)  
    }
    else if(category==CATEGORIES.OTHER){
        navigator.navigate(MUSLIM_ANNOUNCEMENTS)  
    }
    else if(category===CATEGORIES.NEW_MOSQUE_ADDITION){
      navigator.navigate(NEW_MOSQUE_ADDITION)
    }
    else if(category===CATEGORIES.MOSQUE_CONSENSUS){
      navigator.navigate(MOSQUE_CONSENSUS)  
    }
    //Go to no where when Namaz Alert Notification clicked
    else if(category===CATEGORIES.NAMAZ_ALERT){
        
    }
    else if(category===CATEGORIES.IMAM_CONSENSUS){
      navigator.navigate(IMAM_CONSENSUS)  
    }

  }
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

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipe} key={notification._id}>
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={()=>{
          gotoRespectiveScreen(notification.category)
        }}>
          <Image
            source={{uri: notification.icon}}
            style={styles.avatar}
            alt="image.."
          />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>
                  {notification?.title.toUpperCase()}
                </Text>
                <Text style={styles.timeAgo}>
                  {dateDifference(notification?.createdAt)} mins ago
                </Text>
              </View>
              <Text numberOfLines={2}>{notification.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    // height:windowHeight,
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
