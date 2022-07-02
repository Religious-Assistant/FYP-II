/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
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
  Actionsheet,
  useDisclose,
} from 'native-base';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

import avatar from '../../../assets/images/avatar.png';

import duaIcon from '../../../assets/images/dua_ic.png';
import cameraIcon from '../../../assets/images/camera_ic.png';
import galleryIcon from '../../../assets/images/gallery_ic.png';
import edit from '../../../assets/images/edit.png';

export default function Duas({navigation}) {
    const duas = [
        {
            key:1,
            heading:"For Keeping Fast",
            dua: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
            translation:"I intend to keep the fast for tomorrow in the month of Ramadan."
        },
        {
            key:2,
            heading:"For Breaking Fast",
            dua: " اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امنْتُ وَعَليْكَ تَوَكّلتُ وَ عَلى رِزْقِكَ اَفْطَرْت",
            translation:"O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance."
        },
        {
            key:3,
            heading:"When waking up",
            dua:"اَلْحَمْدُ لِلَّهِ الَّذي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            translation:"All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection."
        },
        {
            key:4,
            heading:"Before Sleeping",
            dua:" اَللّٰھُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
            translation:"O Allah (Almighty) I live and die in your name."
        },
        {
            key:5,
            heading:"When Entering Home",
            dua:"بِسْـمِ اللّهِ وَلَجْنـَا، وَبِسْـمِ اللّهِ خَـرَجْنـَا، وَعَلَـى رَبِّنـَا تَوَكّلْـنَا",
            translation:"In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we place our trust."
        },
        {
            key:6,
            heading:"When Leaving Home",
            dua:"بِسْمِ اللَّهِ تَوَكَّلْـتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُـوَّةَ إِلاَّ بِاللَّهِ",
            translation:"In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah."
        },
        {
            key:7,
            heading:"When Going to Mosque",
            dua:"اللّهُـمَّ اجْعَـلْ في قَلْبـي نورا ، وَفي لِسـاني نورا، وَاجْعَـلْ في سَمْعي نورا، وَاجْعَـلْ في بَصَري نورا، وَاجْعَـلْ مِنْ خَلْفي نورا، وَمِنْ أَمامـي نورا، وَاجْعَـلْ مِنْ فَوْقـي نورا ، وَمِن تَحْتـي نورا .اللّهُـمَّ أَعْطِنـي نورا",
            translation:"O Allah, place within my heart light, and upon my tongue light, and within my ears light, and within my eyes light, and place behind me light and in front of me light and above me light and beneath me light. O Allah, bestow upon me light."
        },
        {
            key:8,
            heading:"When Entering the Mosque",
            dua:" أَعوذُ بِاللّهِ العَظِيـمِ، وَبِوَجْهِـهِ الكَرِيـمِ وَسُلْطـَانِه القَدِيـمِ، مِنَ الشَّيْـطَانِ الرَّجِـيمِ، بِسْـمِ اللّهِ وَالصَّلَاةُ وَالسَّلامُ عَلَى رَسُولِ اللّهِ، اَللَّهُـمَّ افْتَـحْ لِي أَبْوَابَ رَحْمَتـِكَ",
            translation:"I take refuge with Allah, The Supreme and with His Noble Face, and His eternal authority from the accursed devil. In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, open the gates of Your mercy for me."
        },
        {
            key:9,
            heading:"When Leaving the Mosque",
            dua:"بِسْمِ اللّهِ وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللّهِ، اَللَّهُـمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْـلِكَ، اَللَّهُـمَّ اعْصِمْنِـي مِنَ الشَّيْـطَانِ الرَّجِـيمِ",
            translation:"In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your favour. O Allah, guard me from the accursed devil."
        },
        {
            key:10,
            heading:"Before Eating",
            dua:"(1)بِسْمِ اللهِ (2) بِسمِ اللهِ أَوَّلَهُ وَآخِرَهُ",
            translation:"(1)In the Name of Allah. (2) In the Name of Allah at the beginning and at the end."
        },
        {
            key:11,
            heading:"After Eating",
            dua:"الْحَمْدُ لِلَّهِ الَّذِى اطْعَمَنَا وَسَقَانَا ، وَجَعَلنَا مُسْلِمِينَ",
            translation:"Praise be to Allah Who has fed us and given us drink and made us Muslims."
        },
        {
            key:12,
            heading:"Upon Sneezing",
            dua:"(1) الْحَمْدُ للهِ (2) يَرْحَمُكَ الله [For a male], يَرْحَمُكِ الله [For a female] (3) يَهْدِيكُمُ اللهُ وَيُصْلِحُ بَالَكُمْ ",
            translation:"(1) You should say: 'All praise is for Allah.' (2) Your companion should say 'May Allah have mercy upon you.' (3) You should reply back 'May Allah guide you and rectify your condition.'"
        },
        {
            key:13,
            heading:"For controlling your anger",
            dua:"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطانِ الرَّجِيْمِ",
            translation:"I seek refuge with Allah against the Satan, the outcast."
        },
        {
            key:14,
            heading:"On Hearing Azan",
            dua:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
            translation:"There is no might and no power except by Allah."
        },
        {
            key:15,
            heading:"When Hearing Good News",
            dua:"الْحَمْدُ لِلَّهِ, مَاشَاء اللَّهُ, تبارک اللهُ",
            translation:"All praise is to Allah, Just as Allah willed Blessed is Allah"
        },
        {
            key:16,
            heading:"When Hearing Bad News",
            dua:"الْحَمْـدُ للهِ على كُـلِّ حَالٍ",
            translation:"Praise is to Allah in all circumstances"
        }
        
       
    ]
  return (
    <View style={styles.container}>
      <View style={styles.header} >
      <Image
          marginTop="5%"
          source={duaIcon}
          style={{
            height: 75,
            width: 75,
          }}
          alt="icon .."
        />
        <Text style={styles.heading}>Duas</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        flex={1}
        maxHeight={'90%'}>
        <View
          style={{
            flex: 0.7,
            marginTop: 35,
            marginLeft: '2%',
            width: '97%',
            maxWidth: '97%',
            height: '90%',
            maxHeight: '30%',
          }}>
          <VStack space={3} divider={<Divider />} w="99%">
          {
            duas.map((item,index)=>{
                            return <Box key={item.key} alignItems="center">
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
                                style={styles.label}
                                color={colors.primary}>
                                {item.key}{'.  '}{item.heading}
                              </Heading>
                            </Stack>
                            <Text fontWeight="400" style={styles.ayat}>
                            {item.dua}
                            </Text>
                            <Text fontWeight="400" style={styles.info}>
                           {item.translation}
                            </Text>
                          </Stack>
                        
                    
                
              </Box>
            </Box>
})}
          </VStack>
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
    flexDirection:'row',
    justifyContent:'space-evenly'
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
  ayat: {
    fontFamily: fonts.Signika.regular,
    fontSize: 18,
    padding: 5,
    color: colors.primary,
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: fonts.Signika.regular,
    fontSize: 20,
    padding: 5,
    color: colors.tertiary,
  },
  info: {
    fontFamily: fonts.Signika.regular,
    fontSize: 16,
    marginLeft: '-1%',
    padding: 5,
    color: colors.info,
    flexWrap: 'wrap',
  },
  heading: {
    fontFamily: fonts.Signika.bold,
    fontSize: 40,
    marginTop: '7%',
    marginLeft: '-18%',
    padding: 8,
    color: colors.white,
    //marginLeft:"92%"
  },
});
