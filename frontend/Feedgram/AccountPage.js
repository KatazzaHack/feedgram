import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import { Post } from './Post.js';

export class AccountPage extends Component {
  // TODO: Get posts for specific user.df fsf
  getPosts() {
    return ["data1", "data2", "data3"]
  }

  renderPost(item) {
    return (<Post data={item}/>);
  }

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