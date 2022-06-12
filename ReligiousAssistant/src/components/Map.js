/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding'; 
import colors from '../theme/colors';
import { View } from 'native-base';

const Map = () => {
  const [position, setPosition] = useState();
  const [reg,setReg] = useState();
  Geocoder.init("AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE"); 
  const myApiKey = "AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE";
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      //console.log(pos)
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      
      Geocoder.from(crd.latitude, crd.longitude)


                    .then(json => {

                        //console.log(json);


    var addressComponent = json.results[0].address_components;

                  setReg({

                           Address: addressComponent

                        })

                        console.log(addressComponent);

                    })

                    .catch(error => console.warn(error));
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <View style={styles.container}>
        {position?    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      zoomEnabled={true}
      zoomControlEnabled={true}
      onPress={(e) => {
        setPosition({ latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421, })
        
        }
    }
      >
          {
              position &&
       <MapView.Marker
       pinColor="red"
       draggable={true}
       title='Yor are here'
       onDragStart={e => {
        console.log('Drag start', e.nativeEvent.coordinate);
      }}
      onDragEnd={e => {
        console.log('Drag End', e.nativeEvent.coordinate);
      }}
      //  description='This is a description'
       coordinate={position}
       />}
       </MapView>:<Text>Location detected</Text>}

       </View>
  );
};
const getAddress = () =>{
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cover,
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
});

export default Map;