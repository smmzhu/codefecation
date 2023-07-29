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
    marginLeft: '2%',
    marginRight: '4%',
    marginBottom: '5%',
    width: '90%',
    height: 'auto',

    paddingVertical: '3%',
    paddingHorizontal: '4%',
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
  },
});

export default RevSummary;
