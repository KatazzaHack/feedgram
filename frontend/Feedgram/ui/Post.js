import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    imageUri = props.image_uri;
//    contentType = props.content_type;
//    titleText = props.title_text;
    contentType = "video";
    titleText = "Catch me If you can";
    console.log(imageUri);
    return (
      <View style={styles.container}>
        <View style={styles.postHeader}>
            <Icon name={contentType}
               color="black"
               size={24}/>
            <Text style={styles.titleText}>
              {titleText}
            </Text>
            <Icon.Button color="black"
                style={styles.bookmarkButton} name="book-outline"/>
        </View>
        <View style={styles.ratingContainer}>
            <View style={styles.rating}/>
        </View>
        <Image style={styles.image} source={{uri: imageUri}}/>
      </View>
    );
};

export default Post;