//yarn add @react-navigation/native
//yarn add @react-navigation/native-stack
//yarn add react-native-keyboard-aware-scroll-view
//yarn add firebase
//yarn add @react-native-firebase/app
//yarn add react-native-safe-area-context
//npx expo install react-native-screens react-native-safe-area-context

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BathroomScreen from './screens/BathroomScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import BathroomRequest from './screens/BathroomRequest.js';
import BathroomReviewScreen from './screens/RateBathroom.js';
import LoginScreen from './screens/LoginScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import Dashboard from './screens/Dashboard.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }}/>       
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login', headerLeft: null}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', headerLeft: null}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Bathroom" component={BathroomScreen}/>
        <Stack.Screen name="BathroomRequest" component={BathroomRequest}/>
        <Stack.Screen name="RateBathroom" component={BathroomReviewScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;