/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feedback from './App/Feedback';
import Videos from './App/Videos';
import VideosList from './App/VideosList';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Feedback' component={Feedback} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Videos' component={Videos} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='VideosList' component={VideosList} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
