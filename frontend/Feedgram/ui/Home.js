import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AccountPage from './AccountPage.js';
import NewPostPage from './NewPostPage.js';
import SearchPage from './SearchPage.js';


const Home: () => Node = () => {
    const Tab = createMaterialBottomTabNavigator();

    // TODO(maffina): Tab navigator is not working on the web version.

    return (
       <Tab.Navigator>
            <Tab.Screen name="New Post" component={NewPostPage} />
            <Tab.Screen name="Search" component={SearchPage} />
            <Tab.Screen name="My Account" component={AccountPage} />
        </Tab.Navigator>
    );
};

export default Home;
