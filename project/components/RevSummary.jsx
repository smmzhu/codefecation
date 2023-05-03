import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Rating from './Rating.jsx';
import * as Font from 'expo-font';

const RevSummary = ({reviewSummary}) => {
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
            <Text style={styles.sectionTitle}>Review Summary: </Text>
            <Text style={styles.text}>{reviewSummary}</Text>
        </View>
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
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Comfortaa',
    marginTop: 0,
  },
});

export default RevSummary;