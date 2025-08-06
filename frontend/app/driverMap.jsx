import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebaseConfig';

export default function DriverMap() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [elephantLocations, setElephantLocations] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      let currentLoc = await Location.getCurrentPositionAsync({});
      setDriverLocation(currentLoc.coords);

      // Fetch all elephant locations from Firebase
      const snapshot = await getDocs(collection(db, 'locations'));
      const locations = snapshot.docs.map(doc => doc.data());
      setElephantLocations(locations);

      // Check proximity
      const nearby = locations.find(loc => {
        const distance = getDistanceFromLatLonInMeters(
          currentLoc.coords.latitude,
          currentLoc.coords.longitude,
          loc.latitude,
          loc.longitude
        );
        return distance < 500; // meters
      });

      if (nearby) {
        Alert.alert('⚠️ Warning', 'You are near an elephant location!');
      }
    })();
  }, []);

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (!driverLocation) {
    return (
      <View style={styles.center}>
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {elephantLocations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title="Elephant Reported"
          >
            <Image
              source={require('../assets/elephant.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
