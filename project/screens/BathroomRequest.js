import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Alert, Image, Button, StyleSheet, Pressable, Keyboard, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Rater from '../components/Rater';
import CongratulatoryModal from '../components/CongratulatoryModal';
import MapChoose from '../components/MapChoose';
import { LogBox } from 'react-native';
import firebase from '../database/firebase';
import {setBathroomToDB} from '../database/databaseFuncs';
import * as geofire from 'geofire-common';
import { getAuth } from "firebase/auth";
import uuid from 'react-native-uuid';
import {Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as PaperButton } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const CreateBathroomPage = ({navigation, route}) => {
  const userLoc = route.params.userLoc;
  // console.log(userLoc);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState( new Date());
  const [time1, setTime1] = useState('7:00AM');
  const [time2, setTime2] = useState('7:00PM');
  const [tags, setTags] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [boujeenessRating, setBoujeenessRating] = useState(0);
  const [review, setReview] = useState('');
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false); // added state variable for showing congratulatory modal
  const [scrollHeight, setScrollHeight] = useState(0);
  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function componentDidMount() {
    this.loadFonts();
  };

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

  const timeChange1 = (event,selectedDate)=>{
    const currentDate = selectedDate || date1;
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    let ftime=formatAMPM(tempDate);
    setTime1(ftime);
    // console.log(ftime);
  }
  const timeChange2 = (event,selectedDate)=>{
    const currentDate = selectedDate || date2;
    setDate2(currentDate);
    let tempDate = new Date(currentDate);
    let ftime=formatAMPM(tempDate);
    setTime2(ftime);
    // console.log(ftime);
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }
  async function dbFunc() {
    const db = await firebase.firestore();

    const auth = getAuth();
    const user = auth.currentUser;
    let email = "";
    if (user !== null) {
      // const displayName = user.displayName; // SAMUEL PLZ IMPLEMENT THIS
      email = user.email;
    }
    email = email.substring(0, email.indexOf('@'));
    let hours = time1+' - '+time2;
    const bathroom = {
      bathroomID: uuid.v4(),
      coords: {
        geohash: geofire.geohashForLocation([latitude, longitude]),
        lat: latitude,
        long: longitude,
      },
      name: name,
      address: address,
      hours: hours,
      tags: tags,
      ratings: {
        overallRating: overallRating,
        cleanRating: cleanlinessRating,
        boujeeRating: boujeenessRating
      },
      reviews: [{
        reviewID: uuid.v4(),
        userID: email,
        overallRating: overallRating,
        cleanRating: cleanlinessRating,
        boujeeRating: boujeenessRating,
        reviewText: review,
      }],
      status: {
        validBathroom: false,
        yesCount: [],
        noCount: [],
      },
    };
    // console.log(bathroom);
    setBathroomToDB(db, bathroom).then(console.log("sucsess")).catch((err)=>{console.log(err)});
  };

  const handleSubmit = () => {
    setShowCongratulatoryModal(true); // show the congratulatory modal
    dbFunc();
 
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

  const check= () => {
    let output = "";
    if(!name){
      output += "Name\n";
    }
    if(!address){
      output += "Address\n";
    }
    // if(!longitude){
    //   output += "Map Location\n";
    // }
    if(!tags){
      output += "Select at least one tag\n";
    }
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
      handleSubmit();
    }else{
      output = "Please finish the following:\n" + output;
      output = output.slice(0, output.length-1);
      Alert.alert(output);
    }
  }
  const scrollViewRef = useRef();
  return (
    <>
      <LinearGradient 
        colors={['#F0F3FB', '#F0F3FB']} 
        start={{ x: 0.2, y: 0.2}} 
        end={{ x: 1, y: 1}}
        style={styles.containerView}
      >
        <SafeAreaView style={styles.container1}>          
            {/* <View style={styles.Box}> */}
              <View style={{height:'7%', width:'100%', paddingLeft:'2%', marginTop: '3%', flexDirection:'row'}}>
                <PaperButton onPress={() => navigation.goBack()} style = {{backgroundColor:"transparent", height: 50, width: 50, justifyContent: "flex-start", alignSelf: "flex-end", resizeMode: "contain"}}>
                  <Image source={require('../assets/backButton.png')} style={styles.logoView}/>
                </PaperButton>
              </View>
              <ScrollView style={styles.container1} ref = {scrollViewRef} showsVerticalScrollIndicator={false}>
                {/* <View style={styles.container} > */}
                  <Pressable onPress={Keyboard.dismiss}>

                    <View style={styles.component}>
                      <Text style={styles.title}>Request a Bathroom</Text>
                      <Text style={styles.tagLabel}>Name:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="San Miguel Floor 1 Bathroom 1427"
                        onChangeText={handleNameChange}
                        value={name}
                      />
                      <Text style={styles.tagLabel}>Address:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="1234 Bathroom Street, Santa Barbara, CA 93106"
                        onChangeText={handleAddressChange}
                        value={address}
                      />
                    </View>
                    
                    <View style={styles.component}>
                      <View style={styles.inputContainer}>                
                        <Text style={styles.tagLabel}>Choose your location:</Text>
                          <View style={styles.map}>
                            <MapChoose setLatitude = {setLatitude} setLongitude = {setLongitude} defaultPos = {userLoc}/>
                          </View>
                      </View>
                    </View>

                    <View style={styles.component}>
                      <Text style={styles.tagLabel}>Hours of Operation:</Text>
                      <View style={styles.timeContainer}>
                        <DateTimePicker
                          testID='time1'
                          value={date1}
                          mode='time'
                          is24Hour={false}
                          display='default'
                          onChange={timeChange1}
                        />
                        <Text>  -  </Text>
                        <DateTimePicker
                          testID='time2'
                          value={date2}
                          mode='time'
                          is24Hour={false}
                          display='default'
                          onChange={timeChange2}
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
                    </View>                    

                    <View style={styles.component}>
                      {/* <View style={styles.reviewBox}> */}
                        <LinearGradient 
                          colors={['#ffffff', '#ffffff']} 
                          start={{ x: 0.2, y: 0.2}} 
                          end={{ x: 1, y: 1}}
                          style={styles.reviewBox}
                        >
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
                        <View style={styles.ratingContainer}>
                          <Text style={styles.ratingLabel}>Review: (optional)</Text>
                        </View>
                        <TextInput
                          style={styles.reviewInput}
                          placeholder="Write your review here..."
                          multiline={true}
                          numberOfLines={15}
                          maxLength={500}
                          onChangeText={handleReviewChange}
                          value={review}
                        />
                        </LinearGradient>
                      {/* </View>  */}
                    </View>

                    {/* <Text style={styles.subTitle}>Your initial review!</Text> */}
                      
                    <PaperButton
                      style={{
                        // width: 300,
                        // height: 50,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // borderRadius: 10,
                        // alignSelf: 'center',
                        // marginTop: 10,
                        // backgroundColor: '#7D77FF',
                        flex:1,
                        flexGrow: 1,
                        width: '90%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        alignSelf: 'center',
                        backgroundColor: '#9A9AFE',
                      }}
                      labelStyle={styles.text}
                      mode="contained" 
                      onPress={check}
                    >
                      Submit
                    </PaperButton>
                    {showCongratulatoryModal && <CongratulatoryModal navigation={navigation}/>}
                  </Pressable>
                {/* </View> */}
            </ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :0}>
            </KeyboardAvoidingView>
          {/* </View> */}
          
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // background: 'rgb(255,148,130)',
    // backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
  },
  component: {
    flex: 1,
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: '5%',
    width: '90%',
    height: 'auto',
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
    // alignItems: 'center',
  },
  logoView: {
    width: 30,
    height: 30,
    // marginBottom: 0,
    // marginTop: 0
    resizeMode: 'contain',
   }, 
  map:{
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
    color: "#000",
  },
  Box: {
    // flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginVertical: 0,
    marginHorizontal: 0,
    width: '100%',
    height: '100%',
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
  reviewBox: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 99,
  },
  container1: {
    // flex: 1,
    // padding: 0,
    // backgroundColor: '#fff',
    // alignItems: 'left',
    // justifyContent: 'center',
    flex: 1,
    // height: '100%',
    // width: '90%',
  },
  container: {
    flex: 1,
    padding: '3%',
    //paddingLeft: 20,
    // backgroundColor: '#fff',
    // alignItems: 'left',
    // justifyContent: 'center',
  },
  title: {
    // flex: 1,
    // fontSize: 24,
    // fontWeight: 'bold',
    // fontFamily: "Comfortaa",
    // marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Comfortaa",
    marginBottom: '2%',
    marginTop: '4%',
    marginLeft: '4%',
    alignSelf: 'left',
  },
  subTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Comfortaa",
    marginBottom: 20,
    marginTop: 20,
    // alignItems: 'center',
  },
  input: {
    // flex: 1,
    height: 40,
    width: '90%',

    fontFamily: "Comfortaa",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 20,
    marginLeft: '4%',
    marginVertical: '3%',
    paddingHorizontal: '2%',
  },
  inputContainer: {
    flex: 1,
    fontFamily: "Comfortaa",
    height : '100%',
  },
  inputHalf: {
    fontFamily: "Comfortaa",
    flex: 1,
    width: '45%',
  },
  tagLabel: {
    flex: 0,
    fontWeight: 'bold',
    fontFamily: "Comfortaa",
    // marginBottom: 5,
    marginLeft: '4%',
    marginTop: '4%',
    marginBottom: '2%',
  },
  tagButton: {
    flex: 0,
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
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
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    justifyContent: 'flex-start', // align the tags to the left
  },
  tagButtonSelected: {
    flex: 0,
    backgroundColor: '#7D77FF',
    borderColor: '#7D77FF',
    },
  tagText: {
    flex: 0,
    fontFamily: "Comfortaa",
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
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  ratingLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Comfortaa",
    marginRight: 10,

  },
  reviewInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlignVertical: 'top',
    minHeight: 150,
    fontSize: 16,
    fontFamily: "Comfortaa",
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
    fontFamily: "Comfortaa",
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
    fontFamily: "Comfortaa",
    fontSize: 16,
  },
  timeContainer:{
    flex:1,
    alignContent:'center',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default CreateBathroomPage;
