import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons';

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
//    contentType = props.content_type;
//    titleText = props.title_text;
    contentType = "";
    titleText = props.title_text;
    console.log(imageUri);
    return (
      <View style={styles.container}>
        <Icon name={content_type}
           color="black"
           size={24}/>
        <Text style={styles.titleText}>
          {titleText}
        </Text>
        <Image style={styles.image} source={{uri: imageUri}}/>
      </View>
    );
};

export default Post;