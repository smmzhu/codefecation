import React, {Component} from "react";
import { Image, Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Rating from './Rating';
import Tag from "./Tag.jsx";

const ToiletCard = (props) => {
    const {height, width} = useWindowDimensions();
    return (
        <View style={styles.container} width = {width*.87} height = {(width*.7)}   >
            <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            <Button 
                title={props.toilet.name}
                color={'#79443b'}
                onPress={() => props.navigation.navigate('Bathroom', {
                    bathroomName: props.toilet.name,
                    bathroomRating: props.toilet.rating
                })}/>
            <View style={styles.tagContainer}>
                {props.toilet.tags.map((tag) => (
                    <Tag tag={tag} key={tag}/>
                    ))}
            </View>
            <Text style={{width: 100}}>Location = {props.toilet.location}</Text>
            <Rating Rating = {props.toilet.rating}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#cdb79e',
        borderColor: 'black',
        borderWidth: 10,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    location:{
        fontSize: 15,
    },
    rating:{
        fontSize: 15,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      },
});


export default ToiletCard;

