// components/login.js
import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../database/firebase';
import {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature} from '../database/databaseFuncs';
import ploopLogo from '../assets/ploopIcon.png'
import * as geofire from 'geofire-common';
import geoquery from '../database/geoquerying';

// async function main(){ //populates geohash field in database
//   const bathroomIDs = ["bathroom_001", "bathroom_002", "bathroom_003", "bathroom_004", "bathroom_005", "bathroom_006", "bathroom_007", "bathroom_008", "bathroom_009", "bathroom_010"];
//   const db = await firebase.firestore();
//   for (bathroomID of bathroomIDs) {
//     let bathroom = await getBathroomFromDB(db, bathroomID); //test get bathroom from db
//     console.log(bathroom.coords.lat, bathroom.coords.long);
//     bathroom.coords.geohash = geofire.geohashForLocation([bathroom.coords.lat, bathroom.coords.long]); 
//     await setBathroomToDB(db, bathroom);
//   }
// }
// main();

async function main(){
  const db = firebase.firestore();
  await geoquery(db);
  console.log("geoquery ran");
}
main();


export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
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
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.containerView}>
      <Image source={ploopLogo} style={styles.logoView}/>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
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
    marginBottom: 0,
    marginTop: 150,
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