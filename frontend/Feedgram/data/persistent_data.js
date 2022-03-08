import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUsername = async () => {
  console.log("getData");
  try {
    const username = await AsyncStorage.getItem('@storage_username');
    if (username !== null) {
      console.log("user exists: ", username);
      return username;
    } else {
      console.log("user doesn't exists");
      return null;
    }
  } catch(e) {
    //TODO: Handle error
    console.log("error fetching username");
    return null;
  }
};