/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {
  Icon,
  Fab,
  Box,
  Center,
  NativeBaseProvider,
  Text,
  Image,
} from 'native-base';

import colors from '../../theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';

import deleteIcon from '../../../assets/images/delete_ic.png';
import { useNavigation } from '@react-navigation/native';
import { MAKE_ANNOUNCEMENT_SCREEN } from '../../navigation/constants';

export default function Announcements(){
    const [state,setState] = useState({
      data: [
        {
          id: 3,
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          name: 'March SoulLaComa',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
        },
        {
          id: 2,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'John DoeLink',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
        },
        {
          id: 4,
          image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          name: 'Finn DoRemiFaso',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 5,
          image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          name: 'Maria More More',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 1,
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: 'Frank Odalthh',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://via.placeholder.com/100x100/7B68EE/000000',
        },
        {
          id: 6,
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          name: 'Clark June Boom!',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 7,
          image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          name: 'The googler',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
      ],
    })
  

    return (
      <View style={styles.root}>
        {/* Announcements Notifications */}
        <FlatList
          style={styles.root}
          data={state.data}
          extraData={state}
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
              <View style={styles.container}>
                <Image
                  source={{uri: Notification.image}}
                  style={styles.avatar}
                  alt="image.."
                />
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <View style={styles.text}>
                      {/* name */}
                      <Text style={styles.name}>{Notification.name}</Text>
                      {/* delete */}
                      <Image
                        source={deleteIcon}
                        style={{
                          height: 22,
                          width: 22,
                        }}
                        alt="icon .."
                      />
                      {/* Announcement text */}
                      <Text>{Notification.text}</Text>
                    </View>
                    {/* timeAgo */}
                    <Text style={styles.timeAgo}>2 hours ago</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <FabButton />
          </Center>
        </NativeBaseProvider>
      </View>
    );
  }


const FabButton = () => {

  const navigator=useNavigation()

  function launchMakeAnnouncementScreen(){
    navigator.navigate(MAKE_ANNOUNCEMENT_SCREEN)
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
