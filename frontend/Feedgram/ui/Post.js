import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
       padding: 10,
       width: deviceWidth,
       height: deviceWidth,
    },
    image: {
        flex: 1,
    },
});

const Post = (props): Node => {
    imageUri = props.image_uri;
    console.log(imageUri);
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageUri}}/>
      </View>
    );
};

export default Post;