/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerAnimated,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import colors from '../theme/colors';
import {Button, Heading, View} from 'native-base';

const Map = () => {
  const [position, setPosition] = useState();
  const [reg, setReg] = useState();

  Geocoder.init('AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE');

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
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
          var addressComponent = json.results[0].address_components;
          setReg({address: addressComponent});
          console.log(addressComponent);
        })
        .catch(error => console.warn(error));
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <View style={styles.container}>
      {position ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            onPress={e => {
              setPosition({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              console.log('Touch end ', e.nativeEvent.coordinate);
            }}>
            {position && (
              <Marker
                pinColor="red"
                draggable={true}
                title="Yor are here"
                onDragStart={e => {
                  console.log('Drag start', e.nativeEvent.coordinate);
                }}
                onDragEnd={e => {
                  console.log('Drag End', e.nativeEvent.coordinate);
                }}
                coordinate={position}
              />
            )}
          </MapView>
          <OverlayComponent />
        </>
      ) : (
        <Text>Location detected</Text>
      )}
    </View>
  );
};
const getAddress = () => {};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-60,
  },
});

const OverlayComponent = () => (
  <View style={{position: 'absolute', bottom: 50}}>
    <Button>Hello World</Button>
  </View>
);

export default Map;
