import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import { Post } from './Post.js';

export class NewPostPage extends Component {
  render() {
    return (
      <View>
         <FlatList
            data={this.getPosts()}
            renderItem={({item}) => this.renderPost(item)}
         />
      </View>
    )
  }
}