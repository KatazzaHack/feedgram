import React from 'react'
import {
  Text,
  View,
} from 'react-native'

const Post = (props): Node => {
    return (
      <View>
        <Text> {props.data} </Text>
      </View>
    );
};

export default Post;