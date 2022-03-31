import React, { useState, useEffect, useContext } from 'react'
import {
  FlatList,
  View,
  Text,
} from 'react-native'

import Post from './Post.js';

import { getMediaIdsForUser } from '../data/network_requests.js'
import { getMediaById } from '../data/network_requests.js'
import { UsernameContext } from '../data/persistent_data.js';

const AccountPage = (): Node => {
    // TODO: Get posts for the current logged in user.
    const POSTS = ['https://reactnative.dev/img/tiny_logo.png',
    'https://reactnative.dev/img/tiny_logo.png'];

    const [posts, setPosts] = useState([]);
    const [mediaIds, setMediaIds] = useState([]);

    const username = useContext(UsernameContext);

    useEffect(() => {
        async function fetchMediaIds() {
          mediaIdsResponse = await getMediaIdsForUser(username);
          console.log(mediaIdsResponse);
          var nPosts = [];
          mediaIdsResponse.forEach(id => {
            mediaIdResponse = getMediaById(id);
            nPosts.push(mediaIdResponse);
          })
          setPosts(POSTS);
        }
        fetchMediaIds();
    }, [username]);

    renderPost = (item) => <Post image_uri={item}/>;

     if (posts.length === 0) {
       return (<Text>Loading...</Text>);
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