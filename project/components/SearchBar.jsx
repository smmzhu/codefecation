import React, {Component, useEffect} from "react";
import { StyleSheet,KeyboardAvoidingView, Text, View, TextInput, FlatList, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import ToiletCard from './ToiletCard.jsx';
import Tag from './Tag.jsx';
import TagSearchSelector from "./TagSearchSelector.jsx";
import ploopLogo from '../assets/ploopIcon.png';
import {Button as PaperButton} from 'react-native-paper';

export default function SearchBar(props) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(props.bathroomList);
  const [subData, setSubData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [tagList, setTagList] = React.useState([]);
  const [height, setHeight] = React.useState(420);
  const arrayholder = props.bathroomList;

  const getTagList = (taglist) => {
    setTagList(taglist);
  }

  // changes search value to text input
  const updateSearchValue = (text) => {
    setSearchValue(text);
  }

  const searchFunction = (text, tags) => {

    // filter all without text in name, 

    const updatedData = arrayholder.filter((item) => {
      const name_data = `${item.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return (name_data.indexOf(text_data) > -1 );
    });
    const finalData =[];
    // filter all without tags
    updatedData.filter((item) => {
      let temp = true;
      for(let i = 0; i < tags.length; i++){
        if(!(item.tags.includes(tags[i]))){
          temp=false;
        }
      }
      if(temp){
        finalData.push(item);
      }
    })

    props.toiletListSize(finalData.length);
    setSubData(finalData);
  };    

  const onLayout = (event)=> {
    let layout = event.nativeEvent.layout; //btw it spits out x,y,width,height normally
    props.setHeight(layout.height);
  }
  // if (this.props.bathroomList != this.state.data){
  //   this.setState({ data: this.props.bathroomList });
  // }
  useEffect(() => {
    setData(props.bathroomList);
    setSubData(props.bathroomList);
  }, [props.bathroomList]);

    return (
      <View style={styles.container}>
        <View onLayout = {onLayout}>
          <View style={styles.inputBar}>
              <KeyboardAvoidingView behavior="position" style={styles.container}>
                {/* <TextInput
                  style={styles.textInput}
                  placeholder="Search Here..."
                  lightTheme
                  round
                  value={searchValue}
                  onChangeText={(text)=>updateSearchValue(text)}
                  autoCorrect={false}
                /> */}
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.text}
                    placeholder="Search Here..."
                    value={searchValue}
                    onChangeText={(text)=>updateSearchValue(text)}
                    autoCorrect={false}
                  />   
                </View>
              </KeyboardAvoidingView>
              <TagSearchSelector getTagList={getTagList}/>

              <PaperButton 
                style={styles.button} 
                labelStyle={styles.text}
                mode="contained" 
                onPress={() =>{searchFunction(searchValue,tagList)}}>
                <Text>Search</Text>
              </PaperButton>
              {/* <TouchableOpacity style={styles.button} onPress={() =>{searchFunction(searchValue,tagList)}}>
                <Text>Search</Text>
              </TouchableOpacity> */}

            </View>
            <CardList userLoc={props.userLoc} data = {subData} navigation = {props.navigation}/>            
          <Image source={ploopLogo} style = {styles.logoView}/>
        </View>
      </View>
    );
}

function CardList(props){
  return(
    <View >
      {props.data.map((item) => {return item ? <ToiletCard userLoc={props.userLoc} key = {item.bathroomID} toilet={item} navigation = {props.navigation}/> : null})}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputBar: {
    flexDirection: 'row',
    height: 80,
    width: 330,
  },
  logoView: {
    width: 200,
    height: 200,
    marginBottom: 75,
    marginTop: 75,
    alignSelf: "center",
    resizeMode: 'stretch',
  },
  textInput: {
    width: '90%',
    height: 80,
    backgroundColor: 'white',
    borderColor: '#79443b',
    borderWidth: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  flatList: { 
    width: '100%',
    height: '100%',
    backgroundColor: '#79443b',
    borderColor: '#79443b',
    borderWidth: 0,
    borderRadius: 0,
    textAlign: 'center',
    flexGrow: 0,
  },
  button: {
    alignSelf: 'center',
    width: 75,
    height: '75%',
    borderRadius: 10,
    justifyContent: 'center',

    backgroundColor: '#FFFFFF',
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.1,  
    shadowRadius: 1,  
  },
  inputView:{
    width:"100%",
    backgroundColor:"#FFFFFF", 
    borderRadius:22,
    height:60,
    justifyContent:"center",
    alignItems:"center",
    dropShadow: 10,
    // borderColor: "#FFF",
    // borderWidth: 2,

    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.1,  
    shadowRadius: 1,  
  },
  text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
    color: "#C7C7C7",
  },
});
// export default SearchBar;
