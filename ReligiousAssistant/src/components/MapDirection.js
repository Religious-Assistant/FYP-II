/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

//maps
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

//constants
import {GOOGLE_MAPS_APIKEY} from './componentsConstants';

//image
import MosqueIc from '../../assets/images/mosque_pin.png';

//theme
import colors from '../theme/colors';

export default function MapDirection({route, navigation}) {
  const [position, setPosition] = useState();
  const [reg, setReg] = useState();

  const [sourceCoordinates, setSourceCoordinates] = useState();
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: route.params.destinationCoordinates[1],
    longitude: route.params.destinationCoordinates[0],
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      setSourceCoordinates({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.922,
        longitudeDelta: 0.0421,
      });
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <View style={styles.container}>
      {position ? (
        <MapView
          style={styles.map}
          initialRegion={position}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}>
          <MapViewDirections
            origin={sourceCoordinates}
            destination={destinationCoordinates}
            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
            strokeWidth={4}
            strokeColor="red"
            //extra
            optimizeWaypoints={true}
          />
          {sourceCoordinates ? (
            <Marker coordinate={sourceCoordinates} pinColor="red" />
          ) : (
            <Text>Detecting</Text>
          )}
          <Marker
            coordinate={destinationCoordinates}
            // image={}
            pinColor={colors.success.deep}
            onDragStart={e => {
              console.log('Drag start', e.nativeEvent.coordinate);
            }}
            onDragEnd={e => {
              console.log('Drag End', e.nativeEvent.coordinate);
              setDestinationCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}>
            <Image source={MosqueIc} style={{width: 48, height: 48}}></Image>
          </Marker>
        </MapView>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
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
    height: Dimensions.get('window').height - 60,
  },
});
