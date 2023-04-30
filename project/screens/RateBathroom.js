import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal'; //yarn add react-native-confetti-cannon

const BathroomReviewScreen = ({navigation}) => {
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
  const submitReview = () => {
    // Submit the review to the server or local storage
    // console.log('Overall Rating:', overallRating);
    // console.log('Cleanliness Rating:', cleanlinessRating);
    // console.log('Boujeeness Rating:', boujeenessRating);
    // console.log('Review Text:', reviewText);
    setShowCongratulatoryModal(true); // show the congratulatory modal
    // setTimeout(() => {
    //   navigation.navigate('Home'); // navigate back to the home screen
    // }, 3000); // wait 3 seconds before navigating back to the home screen
  };

  return (
    <View style={styles.container}>
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
            onPress={check}
            // disabled={!overallRating || !cleanlinessRating || !boujeenessRating}
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
    </View>
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