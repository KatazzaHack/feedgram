import React, { useState, useEffect } from 'react'
import {
  FlatList,
  View,
  Text,
} from 'react-native'

import Post from './Post.js';
import {getMediaIdsForUser} from '../data/util.js'

const AccountPage = (): Node => {
    // TODO: Get posts for the current logged in user.
    const POSTS = ['https://reactnative.dev/img/tiny_logo.png',
    'https://reactnative.dev/img/tiny_logo.png'];

    // If you want to debug android only, use:
    // 'content://com.android.providers.media.documents/document/image%3A25'];
    const userId = "qwert";
    const [posts, setPosts] = useState([]);
    const [mediaIds, setMediaIds] = useState([]);

    // For debugging async requests
    // TODO(maffina): remove this when we fix CORS issues and will be able to use real fetch
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  useEffect(() => {
    async function fetchMediaIds() {
      // getMediaIdsForUser(userId).then((res) => v);
      setPosts([]);
      sleep(3000).then(() => setPosts(POSTS));
    }

    fetchMediaIds();
  }, [userId]);

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