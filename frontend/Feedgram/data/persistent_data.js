import {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context created for setting the username. Used on the login page.
export const AuthContext = createContext();

// Context created for getting the username.
export const UsernameContext = createContext();

export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('@storage_username');
    if (username !== null) {
      console.log("User already exists in AsyncStorage: ", username);
      return username;
    } else {
      console.log("User doesn't exist in AsyncStorage");
      return "";
    }
  } catch(e) {
    //TODO: Handle error
    console.log("Error fetching username from the AsyncStorage");
    return "";
  }
};