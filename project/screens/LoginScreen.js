// components/login.js
import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import firebase from '../database/firebase';
import {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature} from '../database/databaseFuncs';
import ploopLogo from '../assets/ploopIcon.png'
import ploopName from '../assets/ploopName.png'
import * as geofire from 'geofire-common';
import kNearestToilets from '../database/geoquerying';
import {Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Animated } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";
import * as Font from 'expo-font';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      fontsLoaded: false
    }
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;  
  }
  async loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
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
        console.log('User logged-in successfully!')
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
    if(this.state.isLoading || !this.state.fontsLoaded){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
          <LinearGradient 
            colors={['#FF9482', '#7D77FF']} 
            start={{ x: 0.2, y: 0.2}} 
            end={{ x: 1, y: 1}}
            style={styles.containerView}
          >
          <Pressable onPress={Keyboard.dismiss} style={styles.container}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 :0}>
          <Image source={ploopLogo} style={styles.logoView}/>
          <Image source={ploopName} style={styles.nameView}/>
          <View style = {{height: 40}}/>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :0}>

            {/* <PaperTextInput
              theme={{roundness: 10}}
              label="Email"
              style={styles.inputStyle}
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              mode = "flat"
            /> */}
            <View style={styles.inputView}>
              <TextInput
                style={styles.text}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.text}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
              />   
            </View>
            </KeyboardAvoidingView>
            <View style = {{height: 20}}/>
            {/* <Button
              color="#3740FE"
              title="Signin"
              onPress={() => this.userLogin()}
            />    */}
            <PaperButton
              style={{
                width: 300,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
              }}
              labelStyle={styles.text}
              mode="contained" 
              onPress={() => this.userLogin()}
            >
              Sign In
            </PaperButton>

            <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Signup')}>
              Don't have account? Click here to signup
            </Text>          
          </Pressable>          
          </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // background: 'rgb(255,148,130)',
    // backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
  }, 
  nameView:{
    width: 225,
    height: 120,
    marginBottom: 0,
    marginTop: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },
  logoView: {
    width: 150,
    height: 150,
    marginBottom: 0,
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
    // backgroundColor: '#rgb(255,148,130)'
  },
  inputView:{
    width:"100%",
    backgroundColor:"rgba(255, 255, 255, 0.3)", 
    borderRadius:22,
    height:60,
    marginBottom:15,
    justifyContent:"center",
    paddingLeft:20,
    paddingRight:20,
    dropShadow: 10,
    // borderColor: "#FFF",
    // borderWidth: 2,
  },
  inputStyle: {
    width: '100%',
    alignSelf: "center",
    borderColor: "#ccc",
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,
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
  colorful: {
    background: 'rgb(255,148,130)',
    backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
  },
  text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
});