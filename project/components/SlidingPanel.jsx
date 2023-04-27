import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();

    let numToilet = props.bathroomList.length;
    console.log("numToilet: " + numToilet);
    console.log("width: " + width*0.7);
    console.log("test", (width * 0.7 * numToilet) + (10 * 40) + 90); //3220

    const [topp, setTopp] = useState(width * 0.7 * 10 + 10 * 40 + 90);
    const getNumToiletCards = (num) => {
      if(num>0){
        const newTopp = width * 0.7 * num + num * 20 + 90;
        setTopp(newTopp);
        console.log("newTopp", newTopp);
      }
    }

    const onLayout=(event)=> {
      const {x, y, height, width} = event.nativeEvent.layout; 
      console.log("x", x);
      console.log("y", y);
      console.log("height", height);
      console.log("width", width);
    }

    return (
      // <View onLayout={onLayout}>
        <SlidingUpPanel 
          height = {topp} //+ 130 
          width = {width}
          draggableRange = {{top:topp,bottom:height*0.12}}
          backgroundColor='white'
          >
                    <View style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}>
                      <SearchBar 
                        navigation = {props.navigation} 
                        style={styles.searchBar} 
                        toiletListSize={getNumToiletCards}
                        bathroomList = {props.bathroomList}
                        />
                        </View>
                        <StatusBar style="auto" />
        </SlidingUpPanel>
      // </View>
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
  