import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useEffect, useRef} from 'react';
import {Animated} from "react-native";
import {LogBox} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Rating from './Rating';
import Tag from './Tag';

const MiniInfoBox = (props) => {
  const [disp, setDisp] = useState(useRef(new Animated.ValueXY({x: 0, y: 1})).current); //disp = displacement
  flyOutToBottom = () => {
    Animated.timing(disp.y, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  flyInFromBottom = () => {
    Animated.timing(disp.y, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  console.log("miniInfoBox: " + props.name + " " + props.isActive);
  LogBox.ignoreLogs(["Cannot update a component (`App`) while rendering a different component (`MiniInfoBox`)."]);
  LogBox.ignoreLogs(["Cannot update a component (`HomeScreen`) while rendering a different component (`MiniInfoBox`)."]);
  if (props.activeFlag){flyInFromBottom(); props.setActiveFlag(false);};
  return (
    <Animated.View style={{
      transform: [{
        translateY: disp.y.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 600]})
        }
      ],
      ...styles.modalView
    }}>
      <Text style={styles.modalText}>{props.name}</Text>
      <Pressable
        style={[styles.button, styles.buttonClose, {position: 'absolute', top: 10, right: 10,}]}
        onPress={() => {flyOutToBottom(); props.setCurrPtInfoActive("none")}}>
        {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
        <FontAwesome name='times' size={24} color='white' />
      </Pressable>
      <Rating rating={props.rating} style={{marginTop: 5, marginBottom: 5}} />
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        {props.tags && props.tags.map((tag) => (
          <Tag tag={tag} key={tag}/>
        ))}
      </View>
      <Text style={styles.location}>Location: </Text>
      <Pressable
        style={[styles.button, styles.buttonClose, {
          position: 'absolute',
          bottom: 10,
          right: 10,
        },]}
        onPress={() => props.navigation.navigate('Bathroom', {
          bathroomName: props.name,
          bathroomRating: props.rating,
          bathroomTags: props.tags,
        })}>
        <Text style={styles.textStyle}>Extra Info</Text>
      </Pressable>
    </Animated.View>
  ); 
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginLeft: '20%',
    marginBottom: '2.5%',
    position: 'absolute',
    height: '30%',
    alignSelf: 'center',
    bottom:     100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  tagsTitle: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 5,
    margin: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'left',
  }
});

export default MiniInfoBox;