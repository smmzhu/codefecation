import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Tag(props) {
    return(
        <View style={styles.tag}>
            <Text style={styles.text}>{props.tag}</Text>
       </View>
    );
}

const styles = StyleSheet.create({
      tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 7,
        marginBottom: 5,
        backgroundColor:'#9A9AFE',
      },
      text: {
        fontSize: 14,
        fontFamily: "Comfortaa",
      },
});