/**
 * @author Kinza Kiran
 * @version 1.0
 */

 import {View} from 'react-native';
 import React, {useEffect} from 'react';
 import {StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
 import {
   Heading,
   Image,
   Text,
   VStack,
   Box,
   HStack,
   Divider,
 } from 'native-base';
 
 import colors from '../../../theme/colors';
 import fonts from '../../../theme/fonts';
 
 import voteIcon from '../../../../assets/images/vote_ic.png';
 import CustomButton from '../../../components/CustomButton';
  
 import {useDispatch, useSelector} from 'react-redux';
 
 import Loader from '../../common/Loader';
 import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { getUpdatedUserData, getUserData, selectUserData } from '../../../redux/slices/auth_slices/authSlice';
import { castDownvoteForImam, castUpvoteForImam, getImamById, selectImamById, selectIsLoadingGetImamById } from '../../../redux/slices/muslim_module_slices/imamSlice';
 
 export default function ImamConsensusNoti({route, navigation}) {
   const {imamId} = route.params;
 
   const dispatch = useDispatch();
   const[isAlreadyCasted, setIsAlreadyCasted]=useState(false)
 
   const isLoadingImamById = useSelector(selectIsLoadingGetImamById);
   const imamById = useSelector(selectImamById);
   const user=useSelector(selectUserData)
 
   useEffect(() => {
     if (imamId) {
       dispatch(getImamById({imamId: imamId}));
       dispatch(getUserData());
     }
   }, [dispatch, imamId]);
 
 
   const cast_upVote=()=>{
    
     const index=imamById?.receivers.findIndex(candidate=>candidate.username===user?.username)
 
     if(imamId && !isAlreadyCasted && user && !imamById?.receivers[index].hasVoted){
       dispatch(castUpvoteForImam({imamId:imamId, username:user?.username}))
       setIsAlreadyCasted(true)
       dispatch(getUpdatedUserData({username:user?.username}))
     }
     else{
       alert(`Vote already casted or error occured`)
     }
   }
 
   const cast_downVote=()=>{
     const index=imamById?.receivers.findIndex(candidate=>candidate.username===user?.username)
 
     if(imamId && !isAlreadyCasted && user && !imamById?.receivers[index].hasVoted){
       dispatch(castDownvoteForImam({imamId:imamId, username:user?.username}))
       setIsAlreadyCasted(true)
       dispatch(getUpdatedUserData({username:user?.username}))
     }
     else{
       alert(`Vote already casted or error occured`)
     }
   }
 
 
 
   return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
             <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
               <Text style={{fontFamily: fonts.Signika.bold}}>Be the Part</Text>
               <Heading color={colors.white}>
                 <Text style={{fontFamily: fonts.Signika.bold}}>
                   {'\n'}Cast Vote
                 </Text>
               </Heading>
             </Heading>
           </View>
         </View>
 
         {isLoadingImamById ? (
           <Loader msg="Loading User Data ... " />
         ) : (
           <Box
             style={{
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
             }}
             mt="50%">
             <Box
               rounded="lg"
               overflow="hidden"
               style={styles.boxContainer}
               padding="10"
               borderColor={colors.cover}
               borderWidth="1"
               _light={{
                 backgroundColor: colors.cover,
               }}>
               <DetailItem
                 heading={'Candidate Name'}
                 data={imamById?.username.toUpperCase()}
               />
               <DetailItem heading={'Mosque Name'} data={imamById?.mosque?.mosqueName.toUpperCase()} />
               <DetailItem
                 heading={`Total Upvotes`}
                 data={`${imamById?.upVotes}/${imamById?.receivers?.length}`}
               />
               <DetailItem
                 heading={'Total Down Votes'}
                 data={imamById?.downVotes}
               />
 
 
               <Text style={styles.statement}>
                 Do you think the above information is correct? Should we Make {imamById?.username.toUpperCase()}
               </Text>
             </Box>
 
             <VStack space={3} divider={<Divider />} w="90%" marginTop={'10%'}>
               <HStack justifyContent="space-between">
                 {/* Yes or No button */}
                 <CustomButton
                   title="Yes"
                   variant="solid"
                   color="white"
                   base="40%"
                   onPress={() => {
                     cast_upVote()
                   }}
                 />
                 <CustomButton
                   title="No"
                   variant="solid"
                   color="white"
                   base="40%"
                   onPress={() => {
                     cast_downVote()
                   }}
                 />
               </HStack>
             </VStack>
           </Box>
         )}
       </View>
     </TouchableWithoutFeedback>
   );
 }
 
 const DetailItem = ({heading, data}) => {
   return (
     <View style={styles.itemContainer}>
       <Text style={styles.heading}>{heading}</Text>
       <Text style={styles.data}>{data}</Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   maincontainer: {
     flex: 1,
     backgroundColor: colors.white,
     flexDirection: 'column',
   },
   itemContainer: {
     justifyContent: 'space-between',
     flexDirection: 'row',
     marginTop: 10,
   },
   heading: {
     fontFamily: fonts.Signika.medium,
     fontSize: 18,
     color: colors.info,
   },
   data: {
     fontFamily: fonts.Signika.medium,
     fontSize: 15,
     color: colors.primary,
   },
   statement:{
       marginTop:10,
       fontFamily:fonts.Signika.medium,
       fontSize:18
   }
 });
 