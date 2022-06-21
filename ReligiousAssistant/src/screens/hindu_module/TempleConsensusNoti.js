/**
 * @author Kinza Kiran
 * @version 1.0
 */

 import {View} from 'react-native';
 import React from 'react';
 import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
 import {
   Heading,
   Image,
   Text,
   Center,
   VStack,
   HStack,
   Divider,
   ScrollView,
 } from 'native-base';
 
 import colors from '../../theme/colors';
 import fonts from '../../theme/fonts';
 
 import voteIcon from '../../../assets/images/vote_ic.png';
 
 import CustomButton from '../../components/CustomButton';
 
 export default function TempleConsensusNoti() {
   const mosqueInfo = [
     {
       key: 1,
       label: 'Temple Name',
       info: 'Temple 1',
     },
     {
       key: 2,
       label: 'Location',
       info: 'Sukkur',
     },
     {
       key: 3,
       label: 'Added By',
       info: 'Akash Kumar',
     },
   ];
   return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <ScrollView
         keyboardShouldPersistTaps="handled"
         flex={1}
         backgroundColor={colors.white}>
         <View style={styles.maincontainer}>
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
                 source={voteIcon}
                 style={{
                   marginTop: '10%',
                   marginRight: '5%',
                   marginBottom: '5%',
                   height: 80,
                   width: 80,
                   tintColor: colors.secondary,
                 }}
                 alt="icon .."
               />
             </View>
             <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
               <Heading
                 color={colors.secondary}
                 marginLeft="10%"
                 marginTop={'5%'}>
                 <Text style={{fontFamily: fonts.Signika.bold}}>
                   Be the Part
                 </Text>
                 <Heading color={colors.white}>
                   <Text style={{fontFamily: fonts.Signika.bold}}>
                     {'\n'}Cast Vote
                   </Text>
                 </Heading>
               </Heading>
             </View>
           </View>
           <View style={{flex: 0.83}} width="95%" alignItems="center">
             <Center
               width="90%"
               space={2}
               maxW="90%"
               marginTop={'68%'}
               marginLeft={'5%'}
               marginBottom={'5%'}>
               {mosqueInfo.map((mosque, index) => {
                 return (
                   <VStack
                     key={mosque.key}
                     space={3}
                     divider={<Divider />}
                     w="90%"
                     marginTop={'10%'}>
                     <HStack justifyContent="space-between" flexWrap={'wrap'}>
                       <Text style={styles.label}>{mosque.label}:</Text>
                       <Text style={styles.info}>{mosque.info}</Text>
                     </HStack>
                   </VStack>
                 );
               })}
 
               <VStack space={3} divider={<Divider />} w="90%">
                 <HStack justifyContent="space-between">
                   <Text
                     style={{
                       fontFamily: fonts.Signika.medium,
                       fontSize: 14,
                       color: colors.muted,
                       marginTop: '10%',
                     }}>
                     Do you think the above information is correct? Should we add
                     Temple 1?
                   </Text>
                 </HStack>
               </VStack>
               <VStack space={3} divider={<Divider />} w="90%" marginTop={'10%'}>
                 <HStack justifyContent="space-between">
                   <CustomButton
                     title="Yes"
                     variant="solid"
                     color="white"
                     base="40%"
                     onPress={() => {
                       console.log('Yes');
                     }}
                   />
                   <CustomButton
                     title="No"
                     variant="solid"
                     color="white"
                     base="40%"
                     onPress={() => {
                       console.log('No');
                     }}
                   />
                 </HStack>
               </VStack>
             </Center>
           </View>
         </View>
       </ScrollView>
     </TouchableWithoutFeedback>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 0.5,
     backgroundColor: colors.white,
     fontFamily: fonts.Signika.regular,
   },
   maincontainer: {
   flex: 1, 
   backgroundColor: colors.white
   },
   text: {
     fontFamily: fonts.Signika.medium,
     color: colors.primary,
     marginTop: '5%',
   },
   label: {
     fontFamily: fonts.Signika.bold,
     fontSize: 20,
     padding: 5,
     color: colors.primary,
   },
   info: {
     fontFamily: fonts.Signika.bold,
     fontSize: 20,
     padding: 5,
     color: colors.tertiary,
   },
 });
 