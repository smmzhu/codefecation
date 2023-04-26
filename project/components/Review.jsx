import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Rating from './Rating.jsx';

const Review = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.userID}>{review.userID}</Text>
        <Rating Rating={review.overallRating} size={2} />
      </View>
      <Text style={styles.text}>{review.reviewText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
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
  },
  topContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
});

export default Review;