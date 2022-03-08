import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AccountPage from './AccountPage.js';
import NewPostPage from './NewPostPage.js';
import SearchPage from './SearchPage.js';

const Home: () => Node = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={SearchPage} />
            <Tab.Screen name="New Post" component={NewPostPage} />
            <Tab.Screen name="My Account" component={AccountPage} />
        </Tab.Navigator>
    );
};

export default Home;