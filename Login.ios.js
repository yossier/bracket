/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} = React;


var bracket = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Username
        </Text>
        
        <Text style={styles.welcome}>
          Password
        </Text>
      <Button style={styles.buttons} onPress={this._Signup}>
        Login
      </Button>
      </View>
    );
  },

  _loginPress(event) {
    console.log('Pressed!');
  },
  _Signup(event){
    console.log('Sign up pressed');
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2E2E2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  pics: {
    width: 300,
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#6600FF',
    marginBottom: 5,
  },
  buttons: {
    borderRadius: 5,
    height: 50,
    width: 250,
    color: 'white',
    backgroundColor: '#1AA3FF',
    padding: 15,
    margin: 8,
  }
});

AppRegistry.registerComponent('bracket', () => bracket);
