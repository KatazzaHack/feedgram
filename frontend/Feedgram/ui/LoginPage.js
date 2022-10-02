import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import { AuthContext } from "../data/persistent_data.js";
import { newUser } from '../data/network_requests.js';

const styles = StyleSheet.create({
    input: {
        color: "#000000",
    },
});

const LoginPage = (): Node => {
    const [username, onUsernameChanged] = React.useState("");
    const authContext = useContext(AuthContext);

    const confirmUsername = async (username) => {
        try {
            const response = await newUser(username);
            if (response["status"] == "ok") {
                await AsyncStorage.setItem('@storage_username', username);
                console.log("New user is written to AsyncStorage: ", username);
                authContext(username);
            } else {
                console.log(response);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
      <View>
         <TextInput
            style={styles.input}
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