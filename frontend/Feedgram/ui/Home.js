import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  SafeAreaView,
} from 'react-native';
import AccountPage from './AccountPage.js';
import NewPostPage from './NewPostPage.js';
import SearchPage from './SearchPage.js';


const Home: () => Node = () => {
    const Tab = createMaterialBottomTabNavigator();

    // TODO(maffina): Tab navigator is not working on the web version.

    return (
    <SafeAreaView style={{flex: 1}} collapsable={false}>
       <Tab.Navigator>
            <Tab.Screen name="New Post" component={NewPostPage} />
            <Tab.Screen name="Search" component={SearchPage} />
            <Tab.Screen name="My Account" component={AccountPage} />
        </Tab.Navigator>
    </SafeAreaView>
    );
};

export default Home;
