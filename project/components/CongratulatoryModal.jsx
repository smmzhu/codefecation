import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const CongratulatoryModal = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);

//   const handlePress = () => {
//     setModalVisible(true);
//   };

  const handleConfettiComplete = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Congratulations!</Text>
      </Pressable> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thanks for plooping with us!</Text>
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              explosionSpeed={500}
              fallSpeed={2000}
              autoStart={true}
              onAnimationEnd={handleConfettiComplete}
            />
            {/* <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CongratulatoryModal;