import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Rating from './Rating.jsx';
import * as Font from 'expo-font';

const Review = ({review}) => {
  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function componentDidMount() {
    this.loadFonts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.userID}>{review.displayName ? review.displayName : "legacy comment"}</Text>
        <Rating Rating={review.overallRating} size={2} />
      </View>
      <Text style={styles.text}>{review.reviewText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userID: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Comfortaa',
  },
  topContainer: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Comfortaa',
  },
});

export default Review;
