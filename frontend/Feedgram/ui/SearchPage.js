import React, { Component, useEffect } from 'react'
import {
  FlatList,
  View,
  TextInput,
  Button
} from 'react-native'

import Post from './Post.js';
import { getMediaIdsForUser, getMediaById } from '../data/network_requests.js';

const SearchPage = (): Node => {
    const [usernameSearchField, onUsernameSearchFieldChanged] = React.useState("");
    const [username, onUsernameChanged] = React.useState("");
    const [posts, setPosts] = React.useState();

    useEffect(() => {
        async function fetchMediaIds() {
          mediaIds = await getMediaIdsForUser(username);
          var nPosts = [];
          mediaIds.forEach(id => {
            getMediaById(id).then(media => {
               nPosts.push(media);
               setPosts(nPosts);
            });
          })
        }
        fetchMediaIds();
    }, [username]);

    onUsernameConfirmed = () => {
        onUsernameChanged(usernameSearchField);
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
