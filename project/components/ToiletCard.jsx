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
                address: props.toilet.address,
                userLoc: props.userLoc,
                tags: props.toilet.tags,
                ratings: props.toilet.ratings,
                reviewSummary: props.toilet.reviewSummary,
                reviews: props.toilet.reviews,
                status: props.toilet.status,
                hours: props.toilet.hours,
            })}>
                <Image source={require('../assets/toiletIcon.png')} style={{width: 50, height: 50}}/>
                <Text>{props.toilet.name}</Text>
                <View style={styles.tagContainer}>
                    {props.toilet.tags.map((tag) => (
                        <Tag tag={tag} key={tag}/>
                        ))}
                </View>
                <Text style={{width: 100}}>Location = {props.toilet.address}</Text>
                <Rating Rating = {props.toilet.ratings.overallRating}/>
            </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#rgba(255,255,255,0.5)',
        borderRadius: 10,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
    
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,          
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
