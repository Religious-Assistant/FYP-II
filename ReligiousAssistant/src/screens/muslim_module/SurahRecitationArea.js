import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkSurahIsRead,
  getSurahByNumber,
  markSurahAsRead,
  markSurahAsUnRead,
  selectIsLoadingMarkSurahAsRead,
  selectIsLoadingSurahByNumber,
  selectIsLoadingSurahRecitationStatus,
  selectIsLoadingUpdateLastReadSurah,
  selectSurahByNumber,
  selectSurahRecitationStatus,
  updateLastReadSurah,
} from '../../redux/slices/muslim_module_slices/reciteQuranSlice';
import Loader from '../common/Loader';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

import {FlatList, Image} from 'native-base';
import last_read_ic from '../../../assets/images/last_read_ic.png';
import { getUserData, selectIsLoadingGetUserData, selectUserData } from '../../redux/slices/auth_slices/authSlice';

const SurahRecitationArea = ({route, navigation}) => {
  const {surah} = route.params;
  const dispatch = useDispatch();
  const surahByNumber = useSelector(selectSurahByNumber);
  const isLoadingSurahByNumber = useSelector(selectIsLoadingSurahByNumber);
  const isLoadingMarkSurahAsRead=useSelector(selectIsLoadingMarkSurahAsRead)
  const isLoadingSurahRecitationStatus=useSelector(selectIsLoadingSurahRecitationStatus)
  const isLoadingGetUserData=useSelector(selectIsLoadingGetUserData)
  const surahRecitationStatus=useSelector(selectSurahRecitationStatus)

  const user=useSelector(selectUserData)

  useEffect(() => {
    dispatch(getSurahByNumber(surah.number));
    dispatch(getUserData())
    dispatch(checkSurahIsRead(surah.englishName))

  }, [dispatch]);

  function markSurahAsComplete(surahNumber, surahName){

    if(user){
      dispatch(markSurahAsRead({user: user.username,surahNumber, surahName}))
    }

  }

  function markSurahAsInComplete(surahNumber, surahName){

    if(user){
      dispatch(markSurahAsUnRead({user: user.username,surahNumber, surahName}))
    }
  }

  return (
    <View style={{backgroundColor: colors.white}}>
      {isLoadingSurahByNumber || isLoadingMarkSurahAsRead ? (
        <Loader msg={`Getting ${surah.englishName} for you ...`} />
      ) : (
        <>
        <View style={[styles.surahActionContainer]}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10, top:35}}>

              {
                isLoadingGetUserData || isLoadingSurahRecitationStatus ?<Loader msg='Loading recitation status ...' />:

                <>
                  {

                    surahRecitationStatus?
                    <TouchableOpacity onPress={()=>{
                      markSurahAsInComplete(surah.number, surah.englishName)
                  }}>
                  <Text style={{fontFamily:fonts.Signika.medium, color:colors.info, fontSize:16}}>
                          Mark As Unread
                      </Text>
                  </TouchableOpacity>
                    :

                    
                                    <TouchableOpacity onPress={()=>{
                                      markSurahAsComplete(surah.number, surah.englishName)
                                  }}>
                                  <Text style={{fontFamily:fonts.Signika.medium, color:colors.info, fontSize:16}}>
                                          Mark As Complete
                                      </Text>
                                  </TouchableOpacity>
                  }
                </>
          }
                <Text style={{fontFamily:fonts.Signika.bold, color:colors.secondary, fontSize:20}}>
                    {surah.name}
                </Text>
            </View>
        </View>
            <FlatList
          data={surahByNumber.ayahs}
          renderItem={({item, index}) => {
            return (
              <>
                <AyahCard ayah={item} surahNumber={surah.number} key={item.number} />
              </>
            );
          }}></FlatList>
        </>
        
      )}
    </View>
  );
};

const AyahCard = props => {
  const {ayah, surahNumber} = props;

  const dispatch=useDispatch()
  let isLoadingUpdateLastReadSurah=useSelector(selectIsLoadingUpdateLastReadSurah);
  

  function saveLastRead(surahNum, ayahNum) {
    //Store in database again user
    dispatch(updateLastReadSurah({surahNumber:surahNum, ayahNumber:ayahNum}))
  }

  return (
    <View style={styles.ayahCardContainer}>
              <View style={styles.meta}>
      <Text style={styles.metaText}>{ayah.number}</Text>
      </View>

      <Text style={styles.ayahText}>{ayah.text}</Text>

        {isLoadingUpdateLastReadSurah?<Loader msg="Updating Last Read ... " />:
                  <View style={styles.actions}>
                  <Pressable
                    onPress={() => {
                      saveLastRead(surahNumber, ayah.number);
                    }}>
                    <Image
                      source={last_read_ic}
                      style={{height: 25, width: 25, tintColor:colors.info}}
                      alt="Icon"
                    />
                  </Pressable>
                  </View>
        }
    </View>
  );
};
export default SurahRecitationArea;

const styles = StyleSheet.create({
  ayahCardContainer: {
    padding: 10,
    marginTop: 5,
    backgroundColor: colors.cover,
    width:'96%',
    alignSelf:'center',
    borderRadius:2,
    flex:1,
  },
  surahActionContainer:{
    backgroundColor:colors.primary,
    height:100,
  },
  ayahText: {
    fontFamily: fonts.Signika.bold,
    fontSize: 22,
    color: colors.success.deep,
    margin: 5,
  },
  actions:{
    flexDirection:'row',
    paddingVertical:2,
   },
   meta:{
    flexDirection:'row',
    marginLeft:10,
   },
   metaText:{
    fontFamily:fonts.Signika.bold,
   }
});
