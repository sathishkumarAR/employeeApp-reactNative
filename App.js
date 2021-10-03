import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';

import AppNavigator from './app/navigation/AppNavigator';
import CreateEmployee from './app/screens/CreateEmployee';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';


export default function App() {
  return (
    // <Home />
    // <CreateEmployee />
    // <Profile />
    <NavigationContainer>
      <AppNavigator />

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
