import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();
    const [topp, setTopp] = useState(height*0.12);
    
    let amtToilets=props.bathroomList.length;
    if (amtToilets<1) {
      amtToilets=10; //Decided upon initial card list size.
    }

    const getNumToiletCards = (num) => {
      if(num>0){
        const newTopp = width * 0.7 * num + num * 20 + 90;
        setTopp(newTopp);
        console.log("newTopp", newTopp);
      }
    }

    useEffect(() => {
      console.log(amtToilets);
      getNumToiletCards(amtToilets);
    }, []);

    return (
        <SlidingUpPanel 
          height = {topp}
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
  