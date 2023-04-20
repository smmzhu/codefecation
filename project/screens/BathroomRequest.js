import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal';

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
        <TextInput
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
        />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    // alignItems: 'center',
  },
  input: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputHalf: {
    width: '45%',
  },
  tagLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagButton: {
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    color: 'black',
    justifyContent: 'flex-start', // align the tags to the left
    alignItems: 'center', // vertically center the tags
  },
  tagButtonSelected: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    },
  tagText: {
    fontSize: 12,
  },
  tagTextSelected: {
    color: '#fff',
  },
  tagButtonFirst: {
    marginLeft: 10,
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
});

export default CreateBathroomPage;