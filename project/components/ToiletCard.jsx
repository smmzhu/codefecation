import React, {Component} from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Rating from './Rating';
import Tag from "./Tag.jsx";

const ToiletCard = (props) => {
    const {height, width} = useWindowDimensions();
    return (
            <TouchableOpacity
            style={styles.container}
            width={width*.87}
            height={(width*.7)}
            onPress={() => props.navigation.navigate('Bathroom', {
                bathroomID: props.toilet.bathroomID,
                coords: props.toilet.coords,
                name: props.toilet.name,
                userLoc: props.userLoc,
                tags: props.toilet.tags,
                ratings: props.toilet.ratings,
                reviewSummary: props.toilet.reviewSummary,
                reviews: props.toilet.reviews,
                status: props.toilet.status,
                hours: props.toilet.hours,
            })}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
                <Text>{props.toilet.name}</Text>
                {/* <Button 
                    title={props.toilet.name}
                    color={'#79443b'}
                    onPress={() => props.navigation.navigate('Bathroom', {
                        coords: props.toilet.coords,
                        name: props.toilet.name,
                        tags: props.toilet.tags,
                        ratings: props.toilet.ratings,
                        reviews: props.toilet.reviews,
                    })}/> */}

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
            </TouchableOpacity>
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
        justifyContent: 'center',
      },
});


export default ToiletCard;
