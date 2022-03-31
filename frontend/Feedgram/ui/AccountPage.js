import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import Post from './Post.js';

import { getMediaIdsForUser, getMediaById } from '../data/network_requests.js';
import { UsernameContext } from '../data/persistent_data.js';

const AccountPage = (): Node => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const username = useContext(UsernameContext);

    useEffect(() => {
        if (!username) {
            return;
        }
        async function fetchMediaIds() {
          mediaIds = await getMediaIdsForUser(username);
          console.log('Media ids: ', mediaIds);
          var nPosts = [];
          mediaIds.forEach(id => {
            getMediaById(id).then(media => {
               nPosts.push(media);
               setPosts(nPosts);
            });
          })
        }
        fetchMediaIds().then(() => setIsLoading(false));
    }, [username]);

    const renderPost = (item) => <Post image_uri={item}/>;

     if (isLoading) {
       return <ActivityIndicator/>;
     }
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