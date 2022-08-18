import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Box,
  Image,
  View,
  Heading,
  Text,
  Center,
  HStack,
  Stack,
  ScrollView,
} from 'native-base';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {dateDifference} from '../../../utils/helpers'

export default function AnnouncementNoti({route, navigation}) {
  const {announcement} = route.params;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      flex={1}
      backgroundColor={colors.white}>
      {/* Main view */}
      <View style={styles.root}>
        <View>
          <Image
            source={{uri: announcement?.avatar}}
            style={styles.avatar}
            alt="Announcer image"
          />
          <Text style={styles.userText}>{announcement?.announcedBy.toUpperCase()}</Text>
        </View>

        <Box
          rounded="lg"
          overflow="hidden"
          style={styles.boxContainer}
          borderColor={colors.cover}
          borderWidth="1"
          _light={{
            backgroundColor: colors.cover,
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              _light={{
                color: colors.info,
              }}
              _text={{fontFamily: fonts.Signika.bold}}>
              {announcement.category}
            </Text>

            <Text
              color={colors.muted}
              style={{fontFamily: fonts.Signika.regular}}
              fontWeight="400">
              {dateDifference(announcement.createdAt)} ago
            </Text>
          </View>


              <Text style={styles.statement}>
                {announcement.statement}
              </Text>
        </Box>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
  },
  userText: {
    alignSelf: 'center',
    fontFamily: fonts.Signika.medium,
    fontSize: 24,
    padding:5,
    marginTop: 15,
  },
  boxContainer: {
    minWidth: '90%',
    padding: 15,
    marginTop:20,
  },
  statement:{
    marginTop:20,
    padding:2,
    fontFamily: fonts.Signika.regular,
    fontSize:18,
  }
});
