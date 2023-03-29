import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const MiniInfoBox = (props) => {
  console.log(props.name);
  const [name, setName] = useState(props.name);
  return (props.isActive ?
    <View style={styles.fixedView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{"Modal for " + props.name}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {props.setCurrPtInfoActive("none")}}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View> : <View/>
  ); 
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  fixedView: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    left:     0,
    top:      0,
  },
  modalView: {
    margin: 20,
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