import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal';
import MapChoose from '../components/MapChoose';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const CreateBathroomPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [tags, setTags] = useState([]);
  const [extraTags, setExtraTags] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [boujeenessRating, setBoujeenessRating] = useState(0);
  const [review, setReview] = useState('');
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false); // added state variable for showing congratulatory modal

  const handleNameChange = (name) => {
    setName(name);
  }

  const handleAddressChange = (address) => {
    setAddress(address);
  }

  const handleLongitudeChange = (longitude) => {
    setLongitude(longitude);
  }

  const handleLatitudeChange = (latitude) => {
    setLatitude(latitude);
  }

  const handleTagPress = (tag) => {
    if (tags.includes(tag)) {
      // remove tag if it's already selected
      setTags(tags.filter((t) => t !== tag));
    } else {
      // add tag if it's not already selected
      setTags([...tags, tag]);
    }
  }

  const handleExtraTagsChange = (extraTags) => {
    setExtraTags(extraTags);
  }

  const handleOverallRatingChange = (rating) => {
    setOverallRating(rating);
  };

  const handleCleanlinessRatingChange = (rating) => {
    setCleanlinessRating(rating);
  };

  const handleBoujeenessRatingChange = (rating) => {
    setBoujeenessRating(rating);
  };

  const handleReviewChange = (review) => {
    setReview(review);
  }

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Longitude:', longitude);
    console.log('Latitude:', latitude);
    console.log('Tags:', tags);
    console.log('Extra Tags:', extraTags);
    console.log('Overall Rating:', overallRating);
    console.log('Cleanliness Rating:', cleanlinessRating);
    console.log('Boujeeness Rating:', boujeenessRating);
    console.log('Review:', review);
    setShowCongratulatoryModal(true); // show the congratulatory modal
  }
  
  const renderTagButton = (tag, index) => {
    const selected = tags.includes(tag);
    const buttonStyles = [styles.tagButton];
    if (selected) {
      buttonStyles.push(styles.tagButtonSelected);
    }
    if (index % 3 === 0) {
      buttonStyles.push(styles.tagButtonFirst);
    }
    return (
      <Pressable
        key={tag}
        style={buttonStyles}
        onPress={() => handleTagPress(tag)}
      >
        <Text style={[styles.tagText, selected ? styles.tagTextSelected : null]}>{tag}</Text>
      </Pressable>
    );
  }

  return (
    <ScrollView style={styles.container1}>
    <View style={styles.container}>
      <Text style={styles.title}>Request a Bathroom Page</Text>
      <Text style={styles.tagLabel}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name (Ex. San Miguel Floor 1 Bathroom 1427)"
        onChangeText={handleNameChange}
        value={name}
      />
      <Text style={styles.tagLabel}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={handleAddressChange}
        value={address}
      />
      <View style={styles.inputContainer}>
        {/* CHANGE IT TO A MAP THAT THE USER CAN DRAG A POINT ON TOP OF INSTEAD */}
        <Text style={styles.tagLabel}>Choose your location:</Text>
        <MapChoose setLatitude = {setLatitude} setLongitude = {setLongitude}/>
        {/* <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Longitude (Optional)"
          onChangeText={handleLongitudeChange}
          value={longitude}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Latitude (Optional)"
          onChangeText={handleLatitudeChange}
          value={latitude}
        /> */}
      </View>
      <Text style={styles.tagLabel}>Tags:</Text>
      <View style={styles.tagContainer}>
        {renderTagButton('Male')}
        {renderTagButton('Female')}
        {renderTagButton('Non-gendered')}
        {renderTagButton('Family Bathroom')}
        {renderTagButton('Baby-Friendly')}
        {renderTagButton('ADA Accessible')}
        {renderTagButton('Smells good')}
        {renderTagButton('Pay per Use')}
        {renderTagButton('Customer-Only')}
        {renderTagButton('Portable Bathroom')}
        {renderTagButton('High-Tech')}
      </View>
      <Text style={styles.ratingLabel}>Don't see a tag?</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a tag here... (Separate tags with commas)"
        onChangeText={handleExtraTagsChange}
        value={extraTags}
      />
      <Text style={styles.subTitle}>Your initial review!</Text>
      <Text style={styles.tagLabel}>Rating:</Text>
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
      <Text style={styles.tagLabel}>Review: (optional)</Text>
      <TextInput
        style={styles.reviewInput}
        placeholder="Write your review here..."
        multiline={true}
        numberOfLines={15}
        maxLength={500}
        onChangeText={handleReviewChange}
        value={review}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={!name || !address || !tags || !overallRating || !cleanlinessRating || !boujeenessRating}
      > 
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {showCongratulatoryModal && <CongratulatoryModal navigation={navigation}/>}
      <View style={{marginTop: 10}}>
      <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    // flex: 1,
    // padding: 0,
    // backgroundColor: '#fff',
    // alignItems: 'left',
    // justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 45,
    paddingLeft: 20,
    backgroundColor: '#fff',
    // alignItems: 'left',
    // justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // alignItems: 'center',
  },
  subTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    // alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    height : '70%',
  },
  inputHalf: {
    flex: 1,
    width: '45%',
  },
  tagLabel: {
    flex: 0,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagButton: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
    maxWidth: 100, // set a max width for the tag button
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    color: 'black',
    justifyContent: 'flex-start', // align the tags to the left
  },
  tagButtonSelected: {
    flex: 0,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    },
  tagText: {
    flex: 0,
    fontSize: 12,
  },
  tagTextSelected: {
    flex: 0,
    color: '#fff',
  },
  tagButtonFirst: {
    flex: 0,
    marginLeft: 10,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  reviewInput: {
    flex: 1,
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
    flex: 1,
    backgroundColor: '#F5A623',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    opacity: 1,
  },
  submitButtonText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  returnButton: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F5A623',
    borderRadius: 5,
    opacity: 1,
  },
  returnButtonText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default CreateBathroomPage;
