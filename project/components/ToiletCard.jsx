import React, {Component, useEffect} from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Rating from './Rating';
import Tag from "./Tag.jsx";
import {getDistanceFromLatLonInKm, isTimeInRange} from "./ComputationalEarthSciences";

const ToiletCard = (props) => {
    const {height, width} = useWindowDimensions();
    const [open, setOpen] = React.useState(false);
    const [numRev, setNumRev] = React.useState(0);

    useEffect(() => {
        const time = new Date();
        if (isTimeInRange(time, props.toilet.hours) == false) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
        setNumRev(props.toilet.reviews.length);
    }, []);

    const distance = getDistanceFromLatLonInKm(props.userLoc.latitude, props.userLoc.longitude, props.toilet.coords.lat, props.toilet.coords.long);

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
                {/* <Image source={require('../assets/toiletIcon.png')} style={{width: 50, height: 50, alignSelf: "center"}}/> */}
                <View style = {{flexDirection: 'row', justifyContent: "flex-start", margin: 10}}>
                    <Text style = {styles.modalText}>{props.toilet.name}</Text>
                    {open && (
                        <View style={styles.opentag}>
                        <Text style={styles.tagText}>open</Text>
                        </View>
                    )}
                    {!open && (
                        <View style={styles.closedtag}>
                        <Text style={styles.tagText}>closed</Text>
                        </View>
                    )}
                </View>
                <View style = {{flexDirection: 'row', marginHorizontal: 10, marginBottom: 10}}>
                    <Rating Rating={0} toilet = {props.toilet} style={{marginTop: 5, marginBottom: 5}} />
                    {numRev < 2 ? <Text style={styles.numReviews}>({numRev} review)</Text> : <Text style={styles.numReviews}>({numRev} reviews)</Text>}
                </View>
                <View style = {{margin: 10, marginLeft: 15}}>
                    <Text style = {styles.distance}>{distance.toFixed(2)} km • {props.toilet.hours}</Text>
                </View>
                <View style={styles.tagContainer}>
                    {props.toilet.tags && props.toilet.tags.map((tag) => (
                        <Tag tag={tag} key={tag}/>
                    ))}
                </View>
            </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#rgba(255,255,255,0.5)',
        borderRadius: 10,
        margin: 7,
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
        justifyContent: 'flex-start',
        margin: 10
      },
    modalText: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 0,
        fontFamily: "Comfortaa",
        maxWidth: '69%',
        flexWrap: 'wrap',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    opentag: {
        marginTop: 0,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#66ffc2',
        borderRadius: 5,
        opacity: 1,
    },
    closedtag: {
        marginTop: 0,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ff9999',
        borderRadius: 5,
        opacity: 1,
    },
    tagText: {
        fontSize: 16,
        fontFamily: "Comfortaa",
    },
    numReviews: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Comfortaa",
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    distance:{
        fontSize: 16,
        fontFamily: "Comfortaa",
    },
    statusText:{
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Comfortaa",
    },
});


export default ToiletCard;
