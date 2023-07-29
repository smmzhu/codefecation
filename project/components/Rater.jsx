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
        <CustomRaterBar /> 
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 0,
      marginLeft: '18%',
      marginRight: '18%',
      // marginHorizontal: 50,
      // marginVertical: 50,
      justifyContent: 'center',
      // alignItems: 'center',
    },
    customRatingBarStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10, // was 30
    },
    starImageStyle: {
      width: 40,
      height: 40,
      resizeMode: 'cover'
    },
});