/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AccountPage from './ui/AccountPage.js';
import NewPostPage from './ui/NewPostPage.js';
import SearchPage from './ui/SearchPage.js';

const App: () => Node = () => {
  const backgroundStyle = {
    backgroundColor: "#ff0000",
  };

  const Tab = createMaterialBottomTabNavigator();

  return (
  <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="New Post" component={NewPostPage} />
        <Tab.Screen name="My Account" component={AccountPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
