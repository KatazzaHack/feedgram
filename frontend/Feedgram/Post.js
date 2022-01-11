import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export class Post extends Component {
 render() {
    return (
      <View>
        <Text> {this.props.data} </Text>
      </View>
    )
  }
}