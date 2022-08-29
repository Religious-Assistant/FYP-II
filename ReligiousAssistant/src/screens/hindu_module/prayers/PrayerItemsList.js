/**
 * @author Kinza Kiran
 * @version 1.0
 */

 import React from 'react';
 import {StyleSheet} from 'react-native';
 import {Box, View, Text, ScrollView} from 'native-base';
 
 //theme
 import colors from '../../../theme/colors';
 import fonts from '../../../theme/fonts';
 
 export default function PrayerItemsList() {
   const prayerItems = [
     {
       key: 1,
       info: 'Lamp oil.',
     },
     {
       key: 2,
       info: 'Cotton wicks for the lamps.',
     },
     {
       key: 3,
       info: 'Japa mala, if you perform Japa.',
     },
     {
       key: 4,
       info: 'Mat to sit on while performing puja.',
     },
     {
       key: 5,
       info: 'Puja utensils set to carry the required ingredients to perform abhishekam.',
     },
     {
       key: 6,
       info: 'Flowers and a flower bowl to hold them.',
     },
     {
       key: 7,
       info: 'Dhoop sticks and a stand to put them.',
     },
     {
       key: 8,
       info: 'Aarti puja diya or spoons to perform aarti.',
     },
     {
       key: 9,
       info: 'Camphor.',
     },
   ];
 
   return (
     <ScrollView
       keyboardShouldPersistTaps="handled"
       flex={1}
       backgroundColor={colors.white}>
       {/* Main view */}
       <View style={styles.root}>
         <View>
           <Text style={styles.userText}>Pooja Samagri List</Text>
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
           {prayerItems.map(itm => {
             return (
               <Text key={itm.key} style={styles.statement}>
                 {itm.key}. {itm.info}
               </Text>
             );
           })}
           <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
             <Text
               color={colors.info}
               marginTop="3%"
               style={{fontFamily: fonts.Signika.regular}}
               fontWeight="400">
               pujaNpujari
             </Text>
           </View>
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
   userText: {
     alignSelf: 'center',
     fontFamily: fonts.Signika.medium,
     fontSize: 24,
     padding: 5,
     marginTop: '10%',
   },
   boxContainer: {
     minWidth: '90%',
     padding: 15,
     marginTop: 20,
   },
   statement: {
     marginTop: 20,
     padding: 2,
     fontFamily: fonts.Signika.regular,
     fontSize: 18,
   },
 });
 