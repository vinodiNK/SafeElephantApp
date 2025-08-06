// frontend/app/wildlifeDashboard.jsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WildlifeDashboard() {
    const router = useRouter();

  const handleBackToLogin = () => {
    router.replace('/'); // Navigates back to login page (index.jsx)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Wildlife Officer!</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e8b57',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
