import {View, Text, Box, VStack, Divider, Center, Image, ScrollView} from 'native-base';

import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';



export default function FeatureContainer() {
  const featureArray1=[
    {
      title:"Recite Quran",
      image:require('../../../assets/images/quran.png'),
    },
    {
      title:"Closest Mosque",
      image:require('../../../assets/images/mosque.png'),
    },
    {
      title:"View Calander",
      image:require('../../../assets/images/islamic_calander.png'),
    }
  
  ]

  const featureArray2=[
    {
      title:"Learn Namaz",
      image:require('../../../assets/images/learn_namaz.png'),
    },
    {
      title:"Accountability",
      image:require('../../../assets/images/accountability.png'),
    },
    {
      title:"Announcements",
      image:require('../../../assets/images/announcement_ic.png'),
    },  
  ]

  const featureArray3=[
    {
      title:"Auto Silent",
      image:require('../../../assets/images/auto_silent.png'),
    },
    {
      title:"Add Mosque",
      image:require('../../../assets/images/add_ic.png'),
    },
    {
      title:"Tasbih Counter",
      image:require('../../../assets/images/tasbih_ic.png'),
    },
    {
      title:"Qibla Rukh",
      image:require('../../../assets/images/qibla_direction.png'),
    },
    {
      title:"Rakah Info",
      image:require('../../../assets/images/info_ic.png'),
    },    
  
  ]
  
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:colors.white, flex:0.5, borderTopLeftRadius:25}}> 
      <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
        {
          featureArray1.map((item,index)=>{
            return <FeatureCard>
              <Image source={item.image}
                style={{
                  height: 50,
                  width: 50,
                }}/>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </FeatureCard>          })
        }
      </View>

      <View style={{flex:0.5, flexDirection:'row', justifyContent:'space-evenly', marginTop:-20}}>
        {
          featureArray2.map((item,index)=>{
            return <FeatureCard>
              <Image source={item.image}
                style={{
                  height: 50,
                  width: 50,
                }}/>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </FeatureCard>          })
        }
      </View>


      </View>
      <View style={{backgroundColor:colors.tertiary, flex:0.30}} mb={5}> 
        <Text style={styles.moreText} p={2}>More Features</Text>
        <ScrollView showsHorizontalScrollIndicator horizontal mt={1}>
        {
          featureArray3.map((item,index)=>{
            return <MoreFeaturesCard key={index}>
              <Image source={item.image}
                style={{
                  height: 50,
                  width: 50,
                }}
                alt='Icon..'
                />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </MoreFeaturesCard>          })
        }
        </ScrollView>
      </View>
    </View>
  );
}

function FeatureCard(props) {
  return (
    <Center style={styles.card}>{props.children}</Center>
  );
}

function MoreFeaturesCard(props) {
  return (
    <Center style={styles.moreFeaturesCard}>{props.children}</Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding:10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
  },
  card: {
    width:100,
    height:100,
    borderRadius:10,
    // elevation:10,
    shadowOffset:{height:1,width:1},
    backgroundColor:colors.tertiary
  },
  moreFeaturesCard:{
    width:100,
    height:90,
    borderRadius:10,
    // elevation:10,
    marginLeft:3,
    marginRight:3,
    backgroundColor:colors.white
  },
  cardTitle:{
    fontFamily:fonts.Signika.medium,
    fontSize:14,
  },
  moreText:{
    fontFamily:fonts.Signika.bold,
    fontSize:16,
    color:colors.secondary
  }
});