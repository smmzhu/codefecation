import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

export default function Rating(props) {
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
  useEffect(() =>{
    if (props.toilet != "none" && props.toilet != undefined){
      setDefaultRating(props.toilet.ratings.overallRating);
    }
  },[props.toilet]);
  
    const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                // onPress={() => setDefaultRating(item)}
                            >
                                <Image
                                    style={styles.starImageStyle}
                                    source={
                                        item <= defaultRating
                                            ? {uri: starImageFilled}
                                            : {uri: starImageCorner}
                                    }
                                />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <CustomRatingBar /> 
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 10,
      marginTop: 10,
      justifyContent: 'center'
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 23,
      marginTop: 20,
    },
    customRatingBarStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 0, // was 30
    },
    starImageStyle: {
      width: 40,
      height: 40,
      resizeMode: 'cover'
    },
    buttonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      padding: 15,
      backgroundColor: 'green',
    }
});