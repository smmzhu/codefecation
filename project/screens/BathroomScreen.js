import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import Rater from '../components/Rater.jsx';
import Rating from '../components/Rating.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import Review from '../components/Review.jsx';
import ShowMap from '../components/ShowMap.jsx';
import Tag from '../components/Tag.jsx';


const BathroomScreen = ({ route, navigation }) => {
    const {coords, name, tags, ratings, reviews} = route.params; //assume that bathroom ratings is a json
    // ratings = ratings.json();
    // reviews = reviews.json();

    return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('RateBathroom', {name: name, ratings: ratings})}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{"Leave a Review!"}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.body}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Overall Rating</Text>
                <Rating Rating = {ratings.overallRating}/>
            </View>
            <View style={styles.tagsContainer}>
                <Text style={styles.sectionTitle}>Tags:</Text>
                {bathroomTags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cleanliness Rating</Text>
                {/* REPLACE WITH REAL CLEANLINESS RATING */}
                <Rating Rating = {ratings.cleanRating}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Boujeeness Rating</Text>
                {/* REPLACE WITH REAL BOUJEE RATING */}
                <Rating Rating = {ratings.boujeeRating}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <Text style={styles.text}>
                  <View style = {{padding: 10}}>
                    {reviews.map((eachReview)=>(<Review review = {eachReview} key = {eachReview.reviewID}/> ))}
                  </View>
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Map</Text>
                <View style={styles.map}>
                  <ShowMap longitude={coords.long} latitude={coords.lat} />
                </View>
            </View>
        </View>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
    // <View style={styles.container}>
    //   <Text style={styles.text}>{name}</Text>
    //     <View style={styles.rater}>
    //         <Rater Rating = {ratings}/>
    //     </View>
    //     <View style={{marginTop: 10}}>
    //         <Button title="Go back" onPress={() => navigation.goBack()} />
    //     </View>
    // </View>
  );
};

export default BathroomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    // container: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 5,
    // },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        paddingVertical: 60,
      },
      buttonContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        backgroundColor: '#F5A623'
     },
     buttonText: {
        color: 'black',
        fontSize: 15,
      },
      body: {
        flex: 1,
        padding: 20,
      },
      footer: {
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '60%',
        flexWrap: 'wrap',
        textAlign: 'left',
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        fontSize: 16,
        marginBottom: 10,
      },
    // text: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginTop: 50,
    // },
      review: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
      },
      reviewText: {
        fontSize: 16,
      },

    // view: {
    //     padding: 50,
    // },
    ratings: {
        marginTop: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
    tagText: {
        fontSize: 16,
      },
    returnButton: {
      marginTop: 20,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#F5A623',
      borderRadius: 5,
      opacity: 1,
    },
    returnButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    }
});
