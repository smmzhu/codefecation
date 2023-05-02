import React, {useState} from 'react';
import { Pressable, StyleSheet, Modal, Text,TouchableOpacity, View, SafeAreaView} from 'react-native';

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
            <Text style={[styles.tagText, selected ? styles.tagTextSelected : null]}>{tag}</Text>
          </Pressable>
        );
      }
    
    return(
        <SafeAreaView style={StyleSheet.container}>
            <TouchableOpacity
            style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text>sort by tags</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                transparent={true}
            >
                <View style={styles.modal}>
                    <Text>Choose your desired tags</Text>
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
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={() => {handleSubmit(), setModalVisible(false)}}
                    >
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
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
        borderWidth: 10,
        borderColor: 'black',
        padding: 10,
        height: '45%',
        width: '80%',
        position: 'absolute',
        top: '27.5%',
        left: '10%'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#79443b',
        width: '80%', //100 
        height: '100%',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 10,
        justifyContent: 'center',
    },
    exitButton: {
        alignItems: 'center',
        backgroundColor: '#79443b',
        width: 100,
        height: '15%',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 10,
        justifyContent: 'center',
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
        minWidth: '40%', // set minWidth equal to or greater than tag's width
        maxWidth: '40%', // set a max width for the tag button
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
});