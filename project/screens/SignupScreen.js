import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      rePassword: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.displayName === '' || this.state.email === '' || this.state.password === '' || this.state.rePassword === '') {
      Alert.alert('Enter details to signup!')
    } 
    else if (this.state.password !== this.state.rePassword) {
      Alert.alert('Passwords do not match!')
    }
    else if (this.state.password.length < 6) {
      Alert.alert('Password should be at least 6 characters.')
    }
    else if (this.state.displayName.length < 4) {
      Alert.alert('Name should be at least 4 characters.')
    }
    else if (this.state.displayName.length > 25) {
      Alert.alert('Name should be at most 25 characters.')
    }
    else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: '',
          rePassword: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        this.setState({ errorMessage: error.message }); 
        this.updateInputVal(false, 'isLoading'); 
        if (error.message == "Firebase: The email address is badly formatted. (auth/invalid-email).")
          Alert.alert('Please enter a valid email address.');
        else if (error.message == "Firebase: The email address is already in use by another account. (auth/email-already-in-use).")
          Alert.alert('The email address is already in use by another account.');
        else if (error.message == "Firebase: Password should be at least 6 characters (auth/weak-password).")
          Alert.alert('Password should be at least 6 characters.');
        else
          Alert.alert(error.message);
      })
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <TextInput
          style={styles.inputStyle}
          placeholder="Retype Password"
          value={this.state.rePassword}
          onChangeText={(val) => this.updateInputVal(val, 'rePassword')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>        
      </Pressable>                
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});