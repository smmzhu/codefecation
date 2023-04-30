// components/login.js
import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import firebase from '../database/firebase';
import {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature} from '../database/databaseFuncs';
import ploopLogo from '../assets/ploopIcon.png'
import * as geofire from 'geofire-common';
import kNearestToilets from '../database/geoquerying';
import {Dimensions} from 'react-native';


export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
    }
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;  
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch(error => {
        this.setState({ errorMessage: error.message }); 
        this.updateInputVal(false, 'isLoading'); 
        if (error.message == "[FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).]")
          Alert.alert('The password is invalid or the user does not have a password.');
        else if (error.message == "[FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).]")
          Alert.alert('There is no user record corresponding to this identifier. The user may have been deleted.');
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
          <View style={styles.containerView}>
          <Pressable onPress={Keyboard.dismiss} style={styles.container}>
          <Image source={ploopLogo} style={styles.logoView}/>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 :0}>
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
            </KeyboardAvoidingView>
            <Button
              color="#3740FE"
              title="Signin"
              onPress={() => this.userLogin()}
            />   
            <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Signup')}>
              Don't have account? Click here to signup
            </Text>                          
          </Pressable>
          </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 25,
    backgroundColor: '#fff'
  }, 
  logoView: {
    width: 150,
    height: 150,
    marginBottom: Dimensions.get('window').width * 0.2,
    marginTop: 0,
    alignSelf: "center",
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 25,
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