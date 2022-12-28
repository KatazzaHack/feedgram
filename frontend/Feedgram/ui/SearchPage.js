import React, { Component, useEffect } from 'react'
import {
  FlatList,
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

import Post from './Post.js';
import { getPostIdsForUser, getPostById } from '../data/network_requests.js';

const styles = StyleSheet.create({
    input: {
        color: "#000000",
    },
});

const SearchPage = (): Node => {
    const [usernameSearchField, onUsernameSearchFieldChanged] = React.useState("");
    const [username, onUsernameChanged] = React.useState("");
    const [posts, setPosts] = React.useState();

    useEffect(() => {
        async function fetchPostIds() {
          let postIds = await getPostIdsForUser(username);
          console.log('Post ids: ', postIds);
          var nPosts = [];
          postIds.forEach(id => {
            getPostById(id).then(post => {
               post["username"] = username;
               console.log("Post: ", post);
               nPosts.push(post);
               setPosts(nPosts);
            });
          })
        }
        fetchPostIds();
    }, [username]);

    onUsernameConfirmed = () => {
        onUsernameChanged(usernameSearchField);
    };

    const renderPost = (post) => <Post username={post.username} media_ids={post.media_ids} title={post.title} description={post.description}/>;

    return (
      <View>
         <TextInput
            style={styles.input}
            onChangeText={onUsernameSearchFieldChanged}
            value={usernameSearchField}
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
