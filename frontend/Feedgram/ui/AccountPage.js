import React, { Component } from 'react'
import {
  FlatList,
  View,
} from 'react-native'

import Post from './Post.js';

const AccountPage = (): Node => {
    // TODO: Get posts for the current logged in user.
    const posts = ['https://reactnative.dev/img/tiny_logo.png',
        'content://com.android.providers.media.documents/document/image%3A25'];

    renderPost = (item) => <Post image_uri={item}/>;

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