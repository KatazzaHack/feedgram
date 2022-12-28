import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Post from './Post.js';

import { getPostIdsForUser, getPostById } from '../data/network_requests.js';
import { UsernameContext } from '../data/persistent_data.js';

const AccountPage = ( { navigation } ): Node => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const username = useContext(UsernameContext);

    useFocusEffect(
        useCallback(() => {
            if (!username) {
                return;
            }
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
            fetchPostIds().then(() => setIsLoading(false));
        }, [username]));

    const renderPost = (post) => <Post username={post.username} media_ids={post.media_ids} title={post.title} description={post.description}/>;

     if (isLoading) {
       return <ActivityIndicator/>;
     }
     return (
          <View>
             <FlatList
                data={posts}
                renderItem={(post) => renderPost(post.item)}
             />
          </View>
      );
};

export default AccountPage;