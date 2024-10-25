import { View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants'; 

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const LocationSearch = () => {
  const [location, setLocation] = useState(initialRegion);
  const [errorMsg, setErrorMsg] = useState("");
  const apiKey = Constants?.expoConfig?.extra?.googleMapsApiKey;

  useEffect(() => {
    _getLocation();
  }, []);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location is denied');
        return;
      }

      let location1 = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location1.coords.latitude,
        longitude: location1.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsTraffic

      />
    </View>
  );
};

export default LocationSearch;
