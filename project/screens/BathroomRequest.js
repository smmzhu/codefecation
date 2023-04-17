import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const CreateBathroomPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleNameChange = (name) => {
    setName(name);
  }

  const handleLocationChange = (location) => {
    setLocation(location);
  }

  const handleDescriptionChange = (description) => {
    setDescription(description);
  }

  const handleRatingChange = (rating) => {
    setRating(rating);
  }

  const handleReviewChange = (review) => {
    setReview(review);
  }

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Name:', name);
    console.log('Location:', location);
    console.log('Description:', description);
    console.log('Rating:', rating);
    console.log('Review:', review);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Bathroom Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={handleNameChange}
        value={name}
      />
      {/* CHANGE IT TO A MAP THAT THE USER CAN DRAG A POINT ON TOP OF INSTEAD */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={handleLocationChange}
        value={location}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags"
        onChangeText={handleDescriptionChange}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        onChangeText={handleRatingChange}
        value={rating}
      />
      <TextInput
        style={styles.input}
        placeholder="Review"
        onChangeText={handleReviewChange}
        value={review}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
      <View style={{marginTop: 10}}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default CreateBathroomPage;