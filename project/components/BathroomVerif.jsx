import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import {incCount} from '../database/databaseFuncs';
import { getAuth } from "firebase/auth";

const BathroomVerif = (props) => {
  const [isVerified, setIsVerified] = useState(false);
  
  async function dbFunc(feature) {
    const db = await firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;
    let email = "";
    if (user !== null) {
      // const displayName = user.displayName; // SAMUEL PLZ IMPLEMENT THIS
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
    <View>
      <Text>This restroom is not yet verified, is it a real restroom?</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={yesVerif}>
          <Text style={{ fontSize: 30 }}>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={noVerif}>
          <Text style={{ fontSize: 30, marginLeft: 10 }}>👎</Text>
        </TouchableOpacity>
      </View>
      {isVerified && <Text>Thanks for judging the restroom!</Text>}
    </View>
  );
};

export default BathroomVerif;