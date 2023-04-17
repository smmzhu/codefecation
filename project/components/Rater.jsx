import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

export default function Rater(props) {
    const [defaultRating, setDefaultRating] = useState(props.Rating);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
  
    const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  
    const CustomRaterBar = () => {
        return(
          <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => {setDefaultRating(item); props.onRatingChange(item);}}>
                  <Image
                    style={styles.starImageStyle}
                    source={
                      item <= defaultRating
                        ? {uri: starImageFilled}
                        : {uri: starImageCorner}}/>
                </TouchableOpacity>
              );
            })}
            </View>
        );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.textStyle}> Please Rate Us!</Text> */}
        <CustomRaterBar /> 
        {/* <Text style={styles.textStyle}>
            {defaultRating + ' / ' + maxRating.length}
        </Text> */}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => alert(defaultRating)}
        >
          <Text>Get Selected Value</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 20,
      // marginHorizontal: 50,
      // marginVertical: 50,
      justifyContent: 'center',
      // alignItems: 'center',
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 23,
      marginTop: 20, // 20
    },
    customRatingBarStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 30, // was 30
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
      borderRadius: 10,
    }
});

