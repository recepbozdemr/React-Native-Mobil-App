import React, {Component} from 'react';
import { StyleSheet,SafeAreaView,View, Text, Button } from 'react-native';
import FlatListExample from './src/component/FlatListExample';
import axios from 'axios';

export default class App extends Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <FlatListExample />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#A9E5E8'
  }
});
