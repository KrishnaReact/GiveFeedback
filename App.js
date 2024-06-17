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
import Home from './App/Home';
import AddUser from './App/AddUser';
import EditUser from './App/EditUser';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='AddUser' component={AddUser} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='EditUser' component={EditUser} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Feedback' component={Feedback} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Videos' component={Videos} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='VideosList' component={VideosList} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
