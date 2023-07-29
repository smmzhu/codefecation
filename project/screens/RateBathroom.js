import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert, KeyboardAvoidingView, Keyboard, Pressable } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal'; //yarn add react-native-confetti-cannon
import firebase from '../database/firebase';
import {addReview} from '../database/databaseFuncs';
import { getAuth } from "firebase/auth";
import uuid from 'react-native-uuid';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as PaperButton } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";
import * as Font from 'expo-font';

const BathroomReviewScreen = ({route, navigation}) => {  
  const {bathroomID, name, ratings} = route.params;
  const [overallRating, setOverallRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [boujeenessRating, setBoujeenessRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false); // added state variable for showing congratulatory modal
  
  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function componentDidMount() {
    this.loadFonts();
  };

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
    let userID = "";
    if (user !== null) {
      userID = user.uid;
    }
    db.collection("bathrooms").doc(bathroomID).get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        const bathroomData = docSnapshot.data();
        const existingReview = bathroomData.reviews.find(review => review.userID === userID);
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
    let userID = "";
    if (user !== null) {
      userID = user.uid;
    }
    const displayName = user.displayName;

    const review = {
      reviewID: uuid.v4(),
      userID: userID,
      displayName: displayName,
      overallRating: overallRating,
      cleanRating: cleanlinessRating,
      boujeeRating: boujeenessRating,
      reviewText: reviewText,
    }
    addReview(db, userID, bathroomID, review).then(console.log("Review Logged.")).catch((err)=>{console.log(err)});
    setShowCongratulatoryModal(true);
  }

  const submitReview = () => {
    // Submit the review to the server or local storage
    // console.log('Overall Rating:', overallRating);
    // console.log('Cleanliness Rating:', cleanlinessRating);
    // console.log('Boujeeness Rating:', boujeenessRating);
    // console.log('Review Text:', reviewText);
    dbFunc();
  };
  const check= () => {
    let output = "";
    if(!overallRating){
      output += "Overall rating\n";
    }
    if(!cleanlinessRating){
      output += "Cleanliness rating\n";
    }
    if(!boujeenessRating){
      output += "Boujeeness rating\n";
    }
    if(output==''){
      submitReview();
    }else{
      output = "Please finish the following:\n" + output;
      output = output.slice(0, output.length-1);
      Alert.alert(output);
    }
  }
  return (
    <>
      <LinearGradient 
        colors={['#FF9482', '#7D77FF']} 
        start={{ x: 0.2, y: 0.2}} 
        end={{ x: 1, y: 1}}
        style={styles.containerView}
      >
        <SafeAreaView style={styles.container}>
          <Pressable onPress = {Keyboard.dismiss}>
          
            <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 :0}>
              <View style={styles.reviewBox}>
                <View style={{height:'7%', width:'100%', paddingLeft:0, flexDirection:'row'}}>
                  <PaperButton onPress={() => navigation.goBack()} style = {{backgroundColor:"transparent", height: 50, width: 50, justifyContent: "flex-start", alignSelf: "flex-start", resizeMode: "contain"}}>
                    <Image source={require('../assets/backButton.png')} style={styles.logoView}/>
                  </PaperButton>
                </View>                      
                <Text style={styles.title}>Write a Review</Text>                
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingLabel}>Overall:</Text>
                      <Rater onRatingChange={handleOverallRatingChange}/>
                    </View>

                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingLabel}>Cleanliness:</Text>
                      <Rater onRatingChange={handleCleanlinessRatingChange}/>
                    </View>

                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingLabel}>Boujeeness:</Text>
                      <Rater onRatingChange={handleBoujeenessRatingChange}/>
                    </View>
                    <Text style={{marginVertical:10, ...styles.ratingLabel}}>Review (optional):</Text>
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
                  <PaperButton
                    style={{
                      width: 300,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      alignSelf: 'center',
                      backgroundColor: '#7D77FF',
                    }}
                    labelStyle={styles.text}
                    mode="contained" 
                    onPress={check}
                  >
                    Submit Review
                  </PaperButton>
                {showCongratulatoryModal && <CongratulatoryModal navigation={navigation}/>}
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = {
  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",

    
    // background: 'rgb(255,148,130)',
    // backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
  }, 
  text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
  },
  logoView: {
    width: 30,
    height: 30,
    // marginBottom: 0,
    // marginTop: 0
    resizeMode: 'contain',
   }, 
  reviewBox: {
    // flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width:'100%',
    height:'100%',
    borderRadius: 25,
    marginVertical: 0,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 99,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    justifyC9ntent: 'center',
    width: '100%',
    // height: '100%',
    // backgroundColor: '#F5F5F5',
    padding: '0%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    fontFamily: 'Comfortaa',
  },
  ratingContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  ratingLabel: {
    fontSize: 16,
    fontFamily: 'Comfortaa',
    marginRight: 10,

  },
  reviewInput: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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