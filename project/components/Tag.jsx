import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Tag(props) {
    return(
        <View style={styles.tag}>
            <Text>{props.tag}</Text>
       </View>
    );
}

const styles = StyleSheet.create({
      tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
});