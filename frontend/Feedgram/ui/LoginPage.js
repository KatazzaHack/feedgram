import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TextInput,
  Button
} from 'react-native';

const LoginPage = (): Node => {
    const [username, onUsernameChanged] = React.useState(null);

    const confirmUsername = async (username) => {
        try {
            console.log("new user is created: ", username);
            await AsyncStorage.setItem('@storage_username', username);
        } catch (e) {
            //TODO: Handle error.
        }
    }

    return (
      <View>
         <TextInput
            onChangeText={onUsernameChanged}
            value={username}
            placeholder="username"
         />
         <Button
            title="OK"
            onPress={() => confirmUsername(username)}
         />
      </View>
    );
};

export default LoginPage;