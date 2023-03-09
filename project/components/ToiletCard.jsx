import React, {Component} from "react";
import { Image, Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useWindowDimensions } from 'react-native';

// assume props is an array of objects with the following structure:
// {
//     name: "toilet name",
//     location: "toilet location",
//     rating: "toilet rating",
// }



const ToiletCard = (props) => {
    const {height, width} = useWindowDimensions();
    return (
        <View style={styles.container} width = {width*0.87} height = {(width*0.87)/1.5}   >
            <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            <Button title={props.toilet.name} color={'#79443b'} onPress={() => console.log(props.toilet.name) }/>
            <Text style={{width: 100}}>Location = {props.toilet.location}</Text>
            <Text style={{width: 100}}>Rating = {props.toilet.rating}</Text>            
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
        alignItems: 'center',
        justifyContent: 'center'
        // height: (width - 20)/1.5,
        // width: width - 20,
    },
    location:{
        fontSize: 15,
    },
    rating:{
        fontSize: 15,
    },
});


export default ToiletCard;

