import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,KeyboardAvoidingView, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();
    const [topp, setTopp] = useState(width * 0.7 * 3 + 3 * 40+30);
    const getNumToiletCards = (num) => {
      if(num>0){
        const newTopp = width * 0.7 * num + num * 20 + 30;
        setTopp(newTopp);
      }
    }
    // fix this so that you can stop in middle and also keep the search bar on the top
    return (
        <SlidingUpPanel 
          height = {topp + 130} 
          width = {width}
          draggableRange = {{top:topp,bottom:100}}
          backgroundColor='white'>
            <View style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}>
              <SearchBar refreshFlag={props.refreshFlag} navigation = {props.navigation} style={styles.searchBar} toiletListSize={getNumToiletCards}/>
                <StatusBar style="auto" />
            </View>
        </SlidingUpPanel>
    );
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  });
  