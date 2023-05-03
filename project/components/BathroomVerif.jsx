import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../database/firebase';
import {incCount} from '../database/databaseFuncs';
import { getAuth } from "firebase/auth";
import * as Font from 'expo-font';

const BathroomVerif = (props) => {
  const [isVerified, setIsVerified] = useState(false);
  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function componentDidMount() {
    this.loadFonts();
  };
  async function dbFunc(feature) {
    const db = await firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;
    let email = "";
    if (user !== null) {
      email = user.email;
    }
    email = email.substring(0, email.indexOf('@'));
    incCount(db, props.bathroomID, email, feature);
  }
  
  const yesVerif = (value) => {
    dbFunc("yesCount");
    setIsVerified(true);
  };
  const noVerif = (value) => {
    dbFunc("noCount");
    setIsVerified(true);
  };

  return (
    <View style={styles.Box}>
      <View style={{margin:10}}>
        <Text style={styles.text}>This restroom is not yet verified, is it a real restroom?</Text>
        <View style={{ flexDirection: 'column', margin: 10, justifyContent:'center', alignItems:'center' }}>
          <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
            <TouchableOpacity onPress={yesVerif}>

              <Text style={{ fontSize: 38 }}>^</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={noVerif}>

              <Text style={{ fontSize: 30, marginLeft: 10, marginRight:10 }}>v</Text>
            </TouchableOpacity>
          </View>
          {isVerified && <Text style={styles.text}>Thanks for judging the restroom!</Text>}
        </View>  
      </View>
    </View>
  );
};

export default BathroomVerif;

const styles = StyleSheet.create({
  text:{
    fontFamily: 'Comfortaa',
    maxWidth: 300,
  
  },
  Box: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});