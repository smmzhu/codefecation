import React, {Component} from "react";
import { Image, Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

// assume props is an array of objects with the following structure:
// {
//     name: "toilet name",
//     location: "toilet location",
//     rating: "toilet rating",
// }

const ToiletCard = (props) => {
    return (
        <View style={styles.container}   >
            <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            <Button title={props.toilet.name} onPress={() => console.log(props.toilet.name)}/>
            <Text>{props.toilet.location.latitude}</Text>
            <Text>{props.toilet.location.longitude}</Text>
            <Text>{props.toilet.rating}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 300,
    },
    location:{
        fontSize: 15,
    },
    rating:{
        fontSize: 15,
    },
});


export default ToiletCard;

