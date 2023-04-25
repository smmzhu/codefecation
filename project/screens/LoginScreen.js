// components/login.js
import React, { Component } from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature} from '../database/databaseFuncs';

const TOILETS = [
  {
    "bathroomID": "bathroom_001",
    "coords": {
      "lat": 34.404834,
      "long": -119.844177,
    },
    "name": "Public Urination Tub",
    "address": "123 Main St, New York, NY",
    "tags": [
      "Female",
      "Smells good"
    ],
    "ratings": {
      "overallRating": 4.5,
      "cleanRating": 5,
      "boujeeRating": 3.5
    },
    "reviews": [
      {
        "reviewID": "review_001",
        "userID": "user_001",
        "overallRating": 4,
        "cleanRating": 5,
        "boujeeRating": 3,
        "reviewText": "This bathroom was super clean and smelled great! The only downside was that it didn't have any fancy amenities."
      },
      {
        "reviewID": "review_002",
        "userID": "user_002",
        "overallRating": 5,
        "cleanRating": 5,
        "boujeeRating": 5,
        "reviewText": "Wow, this bathroom was amazing! It had everything I needed and more. I would definitely come back here again."
      }
    ]
  },
  {
    "bathroomID": "bathroom_002",
    "coords": {
      "lat": 34.404834,
      "long": -119.844177
    },
    "name": "Campus Point",
    "address": "456 Elm St, New York, NY",
    "tags": [
      "Male",
      "Non-gendered"
    ],
    "ratings": {
      "overallRating": 3,
      "cleanRating": 2,
      "boujeeRating": 4
    },
    "reviews": [
      {
        "reviewID": "review_003",
        "userID": "user_003",
        "overallRating": 3,
        "cleanRating": 2,
        "boujeeRating": 4,
        "reviewText": "This bathroom was just okay. It wasn't very clean and it didn't have any special features."
      }
    ]
  },
  {
    "bathroomID": "bathroom_003",
    "coords": {
      "lat": 34.404834,
      "long": -119.844177,
    },
    "name": "The Lavatory",
    "address": "789 Oak St, New York, NY",
    "tags": [
      "Female",
      "Smells good"
    ],
    "ratings": {
      "overallRating": 4,
      "cleanRating": 4,
      "boujeeRating": 4
    },
    "reviews": [
      {
        "reviewID": "review_004",
        "userID": "user_004",
        "overallRating": 4,
        "cleanRating": 4,
        "boujeeRating": 4,
        "reviewText": "This bathroom was very nice and clean. I appreciated the attention to detail and the pleasant fragrance."
      }
    ]
  }
];

async function main(){
  var db = await firebase.firestore();
  // var bathroom = await getBathroomFromDB(db, "bathroomID"); //test get bathroom from db
  // console.log("func1 bathroomInfo.address:", getBathroomFeature(bathroom, "address")); //test get bathroom feature
  // updateBathroomFeature(bathroom, "address", "4321 fake st"); //test update bathroom feature
  for (toilet of TOILETS) {
    await setBathroomToDB(db, toilet);
  }
  //console.log(await setBathroomToDB(db, bathroom)); //test set bathroom to db
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
        console.log(res)
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