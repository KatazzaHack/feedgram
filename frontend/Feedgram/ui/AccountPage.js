import React, { useState, useEffect } from 'react'
import {
  FlatList,
  View,
  Text,
} from 'react-native'

import Post from './Post.js';
import {getMediaIdsForUser} from '../data/util.js'
import {getMediaById} from '../data/util.js'

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
      mediaIdsReponse = await getMediaIdsForUser(userId);
      console.log(mediaIdsReponse);
      var nPosts = []
      mediaIdsReponse.forEach(id => {
        mediaIdReponse = getMediaById(id)
        nPosts.push(mediaIdReponse)
      })
      setPosts(["https://00f74ba44becf4cc5a25e87e4634ba18c2ec0dbdaf-apidata.googleusercontent.com/download/storage/v1/b/feedgram-images/o/blobs%2Fe5d34686-8581-42d0-b528-2d7658319202?jk=AFshE3VHYhwkRDsSx90bdm-49kTlw67z5v7dtxV_aMsDuoQritdORXRkck_o5uU8HL1jDtnlesbmGqKSMP7f_4GM-tecypu8IeDhn9mBD8FrNxlrDoWK4matplJf0x_XHkWQuSlPH0coUuLFKNxMnAZbA1DRfaD5aK6uixiYur4bB_q_IodAQJYw811M10dPVvyTfdTp3gsH6KvPwuuiBWiTQa4Grf1b31OHRnf5Pf7gKgPl1Q6x6SRb6XrzW8nxt-vGx0mDJRGy0Rsz8fga6IQTAF2tDGo8Fs7CD3F_WtYUULtTy03H-IQyTkvwRggrMZk3rtM9kZumZ4-46LvZENil2Jkic_YQq8GM9nfHTsaOIhWF7OPhsvcgfjvt0APwPIZl-c62q2Cqouks894ahVxo1jvzGZKwfxo8c63_EgM7hKDK21FD_rxY12KbHGame9MqrrMRoqgrFCpunHFK9l9h6fumWdpzIr19yvsdvgeKo47Lh0o1P-BUVjQf30UwZvh6Ip9xL2y3ddc2F7v5nJLS18gXw79qtIXlU7gSUJTZ_Kr_LYxsHcjycTnylQ0ePi9ma0p_fi1c00j7ItLuJ6UUc1hpYer9EVeilyGbVBn5Q8OeAIdzG1Cl8O9MT-VpxQivf0QPtg80XFBZ9Xi4BMcJHboIdRxHafqaHZ2DsZwC1nLDJDNPk3znBkU35AF3PgE78iWKYIKjfJxnDNktechBhxs8Aec6XDgcYTON4R7tAu_J-Htr_RJwpQLREWWkocm3AmxV7jqw_EtQGULb1gNw5bnkNdv3FF2TAY3wORbJnfxDRdxTGePkRRSxsqlpD1RvOAlIYr7H31EbtfxtJOuyEZfuP3F39EK3RHx3kf5YtER2pCP86qxK3Y57axXzcWmnY23HgaeMi_gmtw41AdFa4noI6khMzzOVH6K3h6qRii1BMJkomYjaJVz4Sthz44BUUQ9b9Aa4Clb192uRmjwNPvdrLZEMALanv9F1dv4QEvZ4dQ&isca=1"])
      //sleep(100).then(() => setPosts(nPosts));
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