/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './ui/Home.js';
import LoginPage from './ui/LoginPage.js';
import LogoutButton from './ui/components/LogoutButton.js';

import {AuthContext, UsernameContext, getUsername} from './data/persistent_data.js';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(null);

  const backgroundStyle = {
    backgroundColor: "#ff0000",
  };

  getUsername().then(username => {
    setUsername(username);
    setIsLoading(false);
  });

  if (isLoading) {
    return <ActivityIndicator/>;
  }

  return (

      <AuthContext.Provider value={(username) => setUsername(username)}>
         <UsernameContext.Provider value={username}>
            <NavigationContainer>
                <Stack.Navigator>
                    {username == "" ? (
                        <Stack.Screen
                            name="login"
                            component={LoginPage}
                        />
                    ) : (
                        <Stack.Screen
                            name="Feedgram"
                            component={Home}
                            options={{
                              headerRight: () => (
                                <LogoutButton/>
                              ),
                              headerTitle: username,
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </UsernameContext.Provider>
      </AuthContext.Provider>
  );
};
export default App;
