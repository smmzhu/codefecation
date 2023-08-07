import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Rating from './Rating.jsx';
import * as Font from 'expo-font';
import awsconfig from '../src/aws-exports';
import Amplify from '@aws-amplify/core';
import {Storage} from 'aws-amplify';
Amplify.configure(awsconfig);

const Review = ({review}) => {
  const [images, setImages] = useState([]);
  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function componentDidMount() {
    this.loadFonts();
  };

  useEffect(() => {
    async function fetchKeys() {
      if (!review.imgKeys) review.imgKeys = [];
      const rowImages = await Promise.all(
        review.imgKeys.map(async (imgKey) => {
          const temp = await Storage.get(imgKey);
          return temp;
        })
      ).then((data) => {console.log(data); return data}).catch((err) => console.log(err));
      setImages(rowImages);
    }
    fetchKeys();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.userID}>{review.displayName ? review.displayName : "legacy comment"}</Text>
        <Rating Rating={review.overallRating} size={2} />
      </View>
      <Text style={styles.text}>{review.reviewText}</Text>
      {console.log(images)}
      <View style={styles.rowImages}>
        {images.map((image) => {return (<Image source={{uri:image}} style = {{height: 100, width: 100, margin: 5}}/>)})}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
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
  rowImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default Review;
