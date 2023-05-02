import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,KeyboardAvoidingView, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';
import { LinearGradient } from 'expo-linear-gradient';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();
    const [topp, setTopp] = useState(width * 0.7 * 3 + 3 * 40+30);
    const [heightt, setHeightt] = useState(height);
    const [toilets, setToilets] = useState(props.bathroomList);
    const getNumToiletCards = (num) => {
      if(num>0){
        const newTopp = width * 0.7 * num + num * 20 + 30;
        setTopp(newTopp);
      }
    }

    useEffect(() => {
      setToilets(props.bathroomList);
    }, [props.bathroomList]);

    useEffect(() => {
      setHeightt(heightt);
    }, [heightt]);
    
    // fix this so that you can stop in middle and also keep the search bar on the top
    return (
        <SlidingUpPanel 
          height = {heightt} 
          width = {width}
          draggableRange = {{top:heightt,bottom:100}}
          backgroundColor='white'>
            <LinearGradient 
            colors={['#6b70fe', 'white']} 
            start={{ x: 0.5, y: 1}} 
            end={{ x: 0.5, y: -0.5}}
            style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}
            >
              <SearchBar userLoc={props.userLoc} bathroomList = {props.bathroomList} refreshFlag={props.refreshFlag} navigation = {props.navigation} style={styles.searchBar} toiletListSize={getNumToiletCards} setHeight = {setHeightt}/>
                <StatusBar style="auto" />
            </LinearGradient>
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
  