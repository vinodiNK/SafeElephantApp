// frontend/app/driverDashboard.jsx

import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DriverDashboard() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace('/'); // Navigates back to login page (index.jsx)
  };

  
  const handleOpenMap = async () => {
    router.push('/driverMap');
    // Ask for location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to open the map.');
      return;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Open in Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open Google Maps:', err)
    );
  };

  const handleContactStation = () => {
    // You can replace this with actual logic to contact a station (navigation or phone call)
    Alert.alert('Contacting Station', 'This feature is under development.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Driver!</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
        <Text style={styles.buttonText}>Open Map</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContactStation}>
        <Text style={styles.buttonText}>Contact Next Station</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30,
  },
  button: {
    backgroundColor: '#2e8b57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#2e8b57',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
