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

import { View} from 'native-base';

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

    setPosition({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });

  }

  function confirmAndSubmitMapValues(){
    console.log(position)
    navigator.navigate(ADD_MOSQUE,{longitude:position.longitude, latitude:position.latitude})
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
            onPress={getLongLatitude}>
            {position && (
              <Marker
                pinColor="red"
                draggable={true}
                title="Yor are here"
                onDragEnd={getLongLatitude}
                coordinate={{latitude : position.latitude , longitude : position.longitude}}
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
      onPress={confirmAndSubmitMapValues}
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
