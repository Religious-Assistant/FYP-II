/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Text, Image} from 'native-base';

import colors from '../../theme/colors';
import muslimLogo from '../../../assets/images/MuslimLogo.png';

import {useDispatch, useSelector} from 'react-redux'
import { setTab } from '../../redux/slices/muslim_module_slices/bottomNavSlice';

export default function Alerts({navigation}) {


  const dispatch=useDispatch()
  //when tab is focused in MuslimBottomTab.js, this will be called 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          dispatch(setTab('Alerts'))    
    });

    //unsubscribe on unmount
    return unsubscribe;
  }, [navigation]);

  
  const [state, setState] = useState({
    data: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '2 hours ago',
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '3 hours ago',
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '1 day ago',
      },
      {
        id: 4,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '2 days ago',
      },
      {
        id: 5,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '3 days ago',
      },
      {
        id: 6,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '5 days ago',
      },
      {
        id: 7,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        timeAgo: '1 month ago',
      },
    ],
  });

  return (
    //Main container
    <View style={styles.root}>
      {/* Flatlist to show the Notifications  */}
      <FlatList
        style={styles.root}
        data={state.data}
        extraData={state}
        // separator
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={item => {
          const Notification = item.item;
          let mainContentStyle;
          return (
            //View Started
            <View style={styles.container}>
              {/* Muslim logo Image */}
              <Image source={muslimLogo} style={styles.avatar} alt="image.." />
              {/* View that shows main content of notification and time ago */}
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text>{Notification.text}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{Notification.timeAgo}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

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
