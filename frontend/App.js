// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import DriverDashboard from './app/DriverDashboard';
import LoginPage from './app/index'; // Login screen
import StationDashboard from './app/StationDashboard';
import UploadLocation from './app/UploadLocation'; // Location uploader screen
import WildlifeDashboard from './app/WildlifeDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Authentication */}
        <Stack.Screen name="Login" component={LoginPage} />

        {/* Dashboards */}
        <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
        <Stack.Screen name="StationDashboard" component={StationDashboard} />
        <Stack.Screen name="WildlifeDashboard" component={WildlifeDashboard} />

        {/* Location upload page */}
        <Stack.Screen name="UploadLocation" component={UploadLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}