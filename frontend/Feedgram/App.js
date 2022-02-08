/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import LoginPage from './ui/LoginPage.js';

const App: () => Node = () => {
  const [username, onUsernameChanged] = React.useState(null);

  const backgroundStyle = {
    backgroundColor: "#ff0000",
  };

  const Tab = createMaterialBottomTabNavigator();

  const getData = async () => {
    console.log("getData");
    try {
        const username = await AsyncStorage.getItem('@storage_username');
        if (username !== null) {
            console.log("user exists: ", username);
            onUsernameChanged(username);
        } else {
            console.log("user doesn't exists");
        }
    } catch(e) {
        //TODO: Handle error
        console.log("error fetching username"
        console.log(e
    }
  }

  getData();

  if (!username) {
    return <LoginPage/>;
  } else {
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
};

export default App;
