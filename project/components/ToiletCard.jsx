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
                    coords: props.toilet.coords,
                    name: props.toilet.name,
                    tags: props.toilet.tags,
                    ratings: props.toilet.ratings,
                    reviews: props.toilet.reviews,
                })}/>

            <View style={styles.tagContainer}>
                {props.toilet.tags.map((tag) => (
                    <Tag tag={tag} key={tag}/>
                    ))}
            </View>
            {/* onPress={() => console.log(props.toilet.name) } */}
            <Text style={{width: 100}}>Location = {props.toilet.address}</Text>
            {/* <Text style={{width: 100}}>Rating = {props.toilet.rating}</Text>    */}
            <Rating Rating = {props.toilet.ratings.overallRating}/>
            {/*FIX THIS^*/}
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

