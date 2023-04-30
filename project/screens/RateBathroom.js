import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert, KeyboardAvoidingView } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal'; //yarn add react-native-confetti-cannon
import firebase from '../database/firebase';
import {addReview} from '../database/databaseFuncs';
import { getAuth } from "firebase/auth";
import uuid from 'react-native-uuid';

const BathroomReviewScreen = ({route, navigation}) => {  
  const {bathroomID, name, ratings} = route.params;
  console.log(bathroomID);
  console.log(name);
  const [overallRating, setOverallRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [boujeenessRating, setBoujeenessRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false); // added state variable for showing congratulatory modal

  const handleOverallRatingChange = (rating) => {
    setOverallRating(rating);
  };

  const handleCleanlinessRatingChange = (rating) => {
    setCleanlinessRating(rating);
  };

  const handleBoujeenessRatingChange = (rating) => {
    setBoujeenessRating(rating);
  };

  const createTwoButtonAlert = () =>
    Alert.alert('It appears you\'ve already reviewed this restroom. Do you want to overwrite your review?', '', [
      {
        text: 'Cancel',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {text: 'Yes'}
  ]);

  useEffect(() => {
    const db = firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;
    let email = "";
    if (user !== null) {
      // const displayName = user.displayName; // SAMUEL PLZ IMPLEMENT THIS
      email = user.email;
    }
    email = email.substring(0, email.indexOf('@'));
    db.collection("bathrooms").doc(bathroomID).get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        const bathroomData = docSnapshot.data();
        const existingReview = bathroomData.reviews.find(review => review.userID === email);
        if (existingReview) {
          createTwoButtonAlert();
          return;
        }}
    })
  }, []);

  async function dbFunc() {
    const db = await firebase.firestore();
    const auth = getAuth();
    const user = auth.currentUser;
    let email = "";
    if (user !== null) {
      // const displayName = user.displayName; // SAMUEL PLZ IMPLEMENT THIS
      email = user.email;
    }
    email = email.substring(0, email.indexOf('@'));
    const review = {
      reviewID: uuid.v4(),
      userID: email,
      overallRating: overallRating,
      cleanRating: cleanlinessRating,
      boujeeRating: boujeenessRating,
      reviewText: reviewText,
    }
    addReview(db, email, bathroomID, review).then(console.log("SUPERGOOD")).catch((err)=>{console.log(err)});
  }

  const submitReview = () => {
    // Submit the review to the server or local storage
    console.log('Overall Rating:', overallRating);
    console.log('Cleanliness Rating:', cleanlinessRating);
    console.log('Boujeeness Rating:', boujeenessRating);
    console.log('Review Text:', reviewText);
    dbFunc();
    setShowCongratulatoryModal(true); // show the congratulatory modal
  };

  return (
    <>
    <View style={styles.container}>
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 :0}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Write a Review</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Overall Rating:</Text>
            <Rater onRatingChange={handleOverallRatingChange}/>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Cleanliness Rating:</Text>
            <Rater onRatingChange={handleCleanlinessRatingChange}/>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Boujeeness Rating:</Text>
            <Rater onRatingChange={handleBoujeenessRatingChange}/>
          </View>
          <Text style={styles.ratingLabel}>Review (optional):</Text>
          <TextInput
              editable
              style={styles.reviewInput}
              placeholder="Write your review here..."
              multiline={true}
              numberOfLines={15}
              maxLength={500}
              onChangeText={setReviewText}
              value={reviewText}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitReview}
            disabled={!overallRating || !cleanlinessRating || !boujeenessRating}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
          {showCongratulatoryModal && <CongratulatoryModal navigation={navigation}/>}
        </View>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </View>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  reviewInput: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlignVertical: 'top',
    minHeight: 150,
    fontSize: 16,
    lineHeight: 24,
  },
  submitButton: {
    backgroundColor: '#F5A623',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    opacity: 1,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  returnButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F5A623',
    borderRadius: 5,
    opacity: 1,
  },
  returnButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
};

export default BathroomReviewScreen;