import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../data/persistent_data.js";


function LogoutButton(props) {
    const authContext = useContext(AuthContext);

    const doLogout = async () => {
        try {
            await AsyncStorage.removeItem('@storage_username');
            authContext("");
        } catch(exception) {
            console.log(exception);
        }
    }
    return (
        <Icon.Button
          name="logout"
          onPress={doLogout}
          color="white"
          size={12}
        />
    );
};

export default LogoutButton;
