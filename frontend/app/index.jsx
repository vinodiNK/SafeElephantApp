// app/index.jsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRole = user.email.includes('driver') ? 'driver'
                        : user.email.includes('station') ? 'station'
                        : 'wildlife';

      if (userRole === 'driver') router.replace('/driverDashboard');
      else if (userRole === 'station') router.replace('/stationDashboard');
      else if (userRole === 'wildlife') router.replace('/wildlifeDashboard');
      else Alert.alert('Invalid role');
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleUploadLocation = () => {
    router.push('/UploadLocation'); // navigate to the UploadLocation screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.jpg')} style={styles.logo} />
      <Text style={styles.title}>🐘 SafeElephant</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
     <View style={styles.passwordContainer}>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    style={styles.passwordInput}
    secureTextEntry={!showPassword}
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? 'eye' : 'eye-off'}
      size={24}
      color="#555"
    />
  </TouchableOpacity>
</View>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadLocation}>
        <Text style={styles.uploadButtonText}>Upload Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2e8b57',
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2e8b57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#4c9aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
  },
passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '90%',
  paddingHorizontal: 10,
  marginVertical: 8,
  backgroundColor: '#fff',
  borderRadius: 8,
  borderColor: '#ccc',
  borderWidth: 1,
},
passwordInput: {
  flex: 1,
  paddingVertical: 12,
}


});