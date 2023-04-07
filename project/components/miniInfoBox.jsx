import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useEffect, useRef} from 'react';
import {Animated} from "react-native";

const MiniInfoBox = (props) => {
  const [disp, setDisp] = useState(useRef(new Animated.ValueXY({x: 0, y: 0})).current); //disp = displacement
  flyOutToBottom = () => {
    disp.y.setValue(0);
    Animated.timing(disp.y, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  flyInFromBottom = () => {
    disp.y.setValue(1);
    Animated.timing(disp.y, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  console.log("miniInfoBox: " + props.name + " " + props.isActive)
  console.log(disp.y)
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
      <Text style={styles.modalText}>{"Modal for " + props.name}</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {flyOutToBottom(); props.setCurrPtInfoActive("none")}}>
        <Text style={styles.textStyle}>Hide Modal</Text>
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
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MiniInfoBox;