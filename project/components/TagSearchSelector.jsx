import React, {useState} from 'react';
import { Pressable, StyleSheet, Modal, Text,TouchableOpacity, View, SafeAreaView} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';

export default function TagSearchSelector(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [tags, setTags] = useState([]);


    const handleTagPress = (tag) => {
        if (tags.includes(tag)) {
          // remove tag if it's already selected
          setTags(tags.filter((t) => t !== tag));
        } else {
          // add tag if it's not already selected
          setTags([...tags, tag]);
        }
      }

    const handleSubmit = () => {
        // console.log(tags)
        props.getTagList(tags);
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
            <Text style={[styles.tagText, selected ? styles.tagTextSelected : null, styles.font]}>{tag}</Text>
          </Pressable>
        );
      }
    
    return(
        <View style={StyleSheet.container}>
            <PaperButton
              style={styles.button}
              labelStyle={styles.text}
              mode="contained" 
              onPress={() => setModalVisible(true)}
            >
              Sort by
            </PaperButton>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                transparent={true}
            >
                <LinearGradient 
                  colors={['#FF9482', '#7D77FF']} 
                  start={{ x: 0.2, y: 0.2}} 
                  end={{ x: 1, y: 1}}
                  style={styles.modal}
                >
                    <Text style = {styles.bigFont}>Choose your desired tags</Text>
                    <View
                    style={styles.tagContainer}>
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
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={() => {handleSubmit(), setModalVisible(false)}}
                    >
                        <Text style = {styles.bigFont}>Done</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cdb79e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdb79e',
        borderRadius: 20,
        padding: 10,
        height: '45%',
        width: '80%',
        position: 'absolute',
        top: '27.5%',
        left: '10%',
    },
    button: {
        alignSelf: 'center',
        width: 75,
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        flex: 1,
        margin: 10,
    },
    exitButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 100,
        height: '15%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    bigFont: {
      fontFamily: "Comfortaa",
      fontSize: 20,
    },
    font: {
      fontFamily: "Comfortaa",
      fontSize: 16,
    },
    tagButton: {
        flex: 0,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width:'48%',
      },
      tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        color: 'black',
      },
      tagButtonSelected: {
        flex: 0,
        backgroundColor: 'brown',
        borderColor: 'brown',
        },
      tagTextSelected: {
        flex: 0,
        color: '#fff',
      },
      tagButtonFirst: {
        flex: 0,
        marginLeft: 10,
      },
      text: {
        width: 250,
        fontSize: 18,
        // lineHeight: 21,
        textAlign: "center",
        fontFamily: "Comfortaa",
      },
});