/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import colors from '../theme/colors';
import {Button, View} from 'native-base';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ADD_MOSQUE } from '../navigation/constants';

const Map = () => {
  const [position, setPosition] = useState();
  const [reg, setReg] = useState();

  const navigator=useNavigation()

  Geocoder.init('AIzaSyAYgN_qJ-teJ5AJxO05TWaH35gcs5StQNE');

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
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

  function getLongLatitude(e) {
    console.log(e.nativeEvent.coordinate);
  }

  function confirmAndSubmitMapValues(lat_long){

    navigator.navigate(ADD_MOSQUE,{longitude:lat_long.longitude, latitude:lat_long.latitude})
  }
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
              getLongLatitude(e);
              setPosition({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}>
            {position && (
              <Marker
                pinColor="red"
                draggable={true}
                title="Yor are here"
                onDragStart={e => {}}
                onDragEnd={e => {
                  getLongLatitude(e);
                }}
                coordinate={position}
              />
            )}
          </MapView>
          <View style={{position: 'absolute', bottom: 40}}>
    <CustomButton
      title="Confirm"
      variant="solid"
      mt="8%"
      color={colors.primary}
      base="99%"
      onPress={() => {
          confirmAndSubmitMapValues(position)
      }}
    />
  </View>
        </>
      ) : (
        <Text>Location detected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
  },
});


export default Map;
