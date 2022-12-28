import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMediaById } from '../data/network_requests.js';
import { useFocusEffect } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
       padding: 10,
       width: deviceWidth,
       height: deviceWidth,
       backgroundColor: "#FFF",
    },
    image: {
        flex: 1,
    },
    postHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 5,
        width: deviceWidth,
        backgroundColor: "#FF00000",
    },
    titleText: {
        fontSize: 24,
        paddingLeft: 10,
    },
    bookmarkButton: {
        size: 24,
        backgroundColor: "#FFF",
        justifySelf: "flex-end",
    },
    ratingContainer: {
        width: "100%",
        height: 24,
        backgroundColor: "#DDDDDD",
    },
    rating: {
       backgroundColor: "#00FF00",
       width: 100,
       height: 24,
    }
});

const Post = (props): Node => {
    const [isLoading, setIsLoading] = useState(true);
    const [mediaUri, setMediaUri] = useState();

    title = props.title;
    description = props.description;
    mediaIds = props.media_ids;
    username = props.username;
    console.log(title, description, mediaIds, username);

    useFocusEffect(
        useCallback(() => {
            if (!username) {
                return;
            }
            async function getMedia(id) {
                 let imageUri = await getMediaById(id);
                 setMediaUri(imageUri);
            };
            getMedia(mediaIds[0]).then(() => setIsLoading(false));
        }, [mediaUri])
    );

//    contentType =props props.content_type;

    contentType = "video";
//    console.log(imageUri);
    return (
      <View style={styles.container}>
        <View style={styles.postHeader}>
            <Icon name={contentType}
               color="black"
               size={24}/>
            <Text style={styles.titleText}>
              {title}
            </Text>
            <Icon.Button color="black"
                style={styles.bookmarkButton} name="book-outline"/>
        </View>
        <View style={styles.ratingContainer}>
            <View style={styles.rating}/>
        </View>
        <Image style={styles.image} source={isLoading? null : {uri: mediaUri}}/>
        <Text>
          {description}
        </Text>
      </View>
    );
};

export default Post;