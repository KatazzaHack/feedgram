import React, { Component } from 'react'
import {
  FlatList,
  View,
  TextInput,
  Button
} from 'react-native'

import Post from './Post.js';

const SearchPage = (): Node => {
    const [username, onUsernameChanged] = React.useState(null);
    const [posts, setPosts] = React.useState();

    onUsernameConfirmed = () => {
        // TODO: Get posts for the specified user |username|.
        setPosts(['https://reactnative.dev/img/tiny_logo.png']);
    };
    renderPost = (imageUri) => <Post image_uri={imageUri}/>;

    return (
      <View>
         <TextInput
            onChangeText={onUsernameChanged}
            value={username}
            placeholder="username"
         />
         <Button
            title="OK"
            onPress={onUsernameConfirmed}
         />
         <FlatList
            data={posts}
            renderItem={(post) => renderPost(post.item)}
         />
      </View>
    );
};

export default SearchPage;
