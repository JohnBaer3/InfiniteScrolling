
import firestore from "./Firestore";

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button, TouchableHighlight, TextInput
} from 'react-native';

class User extends React.Component {
constructor() {
    super();
    this.state = {
     email: "",
     fullname: ""
    };
  }
    
    updateInput = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
}

   
    
  render() {
    return (
        <TouchableHighlight
                onPress = {this.addUser}
              >
          <TextInput
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.fullname}
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.email}
          />
          <Button title="submit"><Text>Submit</Text></Button>
        </TouchableHighlight>
        );
      }
   }
export default User;