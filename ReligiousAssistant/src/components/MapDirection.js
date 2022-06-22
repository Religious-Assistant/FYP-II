import React, {useState, useEffect} from 'react';
import MapView, {Callout, Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import colors from '../theme/colors';
import MapViewDirections from 'react-native-maps-directions';


const GOOGLE_MAPS_APIKEY = 'AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE';

export default function MapDirection(){
  const [position, setPosition] = useState();
  const [reg,setReg] = useState();
  
  const [cord1,setCord1] = useState();
  const [cord2,setCord2]= useState();
  
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
      setCord1({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      })
      
      setCord2({
        latitude: crd.latitude+0.005,
        longitude: crd.longitude+0.005,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      })
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <View style={styles.container}>
      {
        position?
        <MapView
        style={styles.map}
        initialRegion={position}>
        <MapViewDirections
          origin={cord1}
          destination={cord2}
          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
          strokeWidth={3}
          strokeColor={colors.secondary}
          //extra
          optimizeWaypoints={true}
        />
        {cord1 ? <Marker coordinate={cord1} 
        pinColor="red"
        />:<Text>Detecting</Text>}
        <Marker coordinate={cord2} 
        pinColor="green"
        draggable={true}
        onDragStart={e => {
          console.log('Drag start', e.nativeEvent.coordinate);
        }}
        onDragEnd={e => {
          console.log('Drag End', e.nativeEvent.coordinate);
          setCord2({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        
        />
      </MapView>:<Text>Loading</Text>}
    </View>
  );
};

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
