import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAvoidingView } from 'react-native';
import { Button as PaperButton } from "react-native-paper";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: '',
      username: '',
      email: '', 
      password: '',
      rePassword: '',
      isLoading: false,
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.displayName === '' || this.state.email === '' || this.state.password === '' || this.state.rePassword === '' || this.state.username === '') {
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
    else if (this.state.username.length < 4) {
      Alert.alert('Username should be at least 4 characters.')
    }
    else if (this.state.username.length > 25) {
      Alert.alert('Username should be at most 25 characters.')
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
          displayName: this.state.displayName,
          username: this.state.username
        })
        // console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          username: '',
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
      <LinearGradient 
            colors={['#FF9482', '#7D77FF']} 
            start={{ x: -0.2, y: -0.2}} 
            end={{ x: 0.6, y: 0.6}}
            style={styles.containerView}
          >
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? -200 :0}>
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.text}
              placeholder="Name"
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            />      
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.text}
              placeholder="Username"
              value={this.state.username}
              onChangeText={(val) => this.updateInputVal(val, 'username')}
            />      
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.text}
              placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.text}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
            />   
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.text}
              placeholder="Retype Password"
              value={this.state.rePassword}
              onChangeText={(val) => this.updateInputVal(val, 'rePassword')}
              maxLength={15}
              secureTextEntry={true}
            />   
          </View>
          <PaperButton
              style={{
                width: 300,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
                backgroundColor: "#5f37fe",
              }}
              labelStyle={styles.text}
              mode="contained" 
              onPress={() => this.registerUser()}
          >
            Register!
          </PaperButton>
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already Registered? Click here to login
          </Text>        
        </Pressable> 
        </KeyboardAvoidingView>  
      </LinearGradient>             
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
  },

  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // background: 'rgb(255,148,130)',
    // backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
  }, 
  inputStyle: {
    width:"100%",
    backgroundColor:"rgba(255, 255, 255, 0.3)", 
    borderRadius:22,
    height:60,
    marginBottom:15,
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:20,
    paddingRight:20,
    dropShadow: 10,
    // borderColor: "#FFF",
    // borderWidth: 2,
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
  },
  text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
});