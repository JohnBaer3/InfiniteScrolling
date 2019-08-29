/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button, TouchableHighlight, TextInput
} from 'react-native';


import Firebase from 'firebase';
var config = {
    apiKey: "AIzaSyCU7pLC_1XYOVoPGzLj4EVS7lGlVQoNf9c",
    authDomain: "resolvetest-16fb3.firebaseapp.com",
    databaseURL: "https://resolvetest-16fb3.firebaseio.com",
    projectId: "resolvetest-16fb3",
    storageBucket: "",
    messagingSenderId: "311353194429",
    appId: "1:311353194429:web:88986ca74b517bbb"
  };


import "firebase/firestore"


let app = Firebase.initializeApp(config);

//export const db = app.database();
export const firestore = Firebase.firestore()


//import { addUser } from './components/itemService';
import {YellowBox} from 'react-native';

export default class App extends Component {
    
    componentDidMount(){
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
        console.log("bla")
    }
    
    constructor(props) {
      super(props);
      this.state = {
        attachments: '',
        daysLeft: 0,
        reward: 0,
        title: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      this.setState({
        name: e.nativeEvent.text
      });
    }
    handleSubmit() {
        console.log("bal");
      this.addUser(this.state.name);
      
    }
    
    addUser = e =>{
      const db = Firebase.firestore();
      const userRef = db.collection("resolve_posts").add({
        attachments: 'https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/resolve_posts%2FDNbPofoGUxQ0DvVPXZVV%2Ffile_portfolio-profile-pic.jpg?alt=media&token=8575ba98-d953-42b8-964d-07c16b6ddfb3',
        daysLeft: 3,
        reward: 100,
        title: 'FILLER'
      });  
      this.setState({
        name: ""
      });
    }
        
        
  render() {
      
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput
              style={styles.itemInput}
              onChange={this.handleChange}
            />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Add
              </Text>
            </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a8ab7'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});







