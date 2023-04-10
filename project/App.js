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
import TestBathroomScreen from './screens/TestBathroomScreen.jsx';
import HomeScreen from './screens/HomeScreen.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Bathroom" component={TestBathroomScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;