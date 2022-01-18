import React, { Component } from 'react'
import {
  FlatList,
  View,
} from 'react-native'

import Post from './Post.js';

const AccountPage = (): Node => {
    // TODO: Get posts for the current logged in user.
    const posts = ["data1", "data2", "data3"];

    renderPost = (item) => <Post data={item}/>;

    return (
      <View>
         <FlatList
            data={posts}
            renderItem={(item) => renderPost(item.item)}
         />
      </View>
    );
};

export default AccountPage;