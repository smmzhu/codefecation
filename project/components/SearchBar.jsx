import React, {Component, useEffect} from "react";
import { StyleSheet,KeyboardAvoidingView, Text, View, TextInput, FlatList, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import ToiletCard from './ToiletCard.jsx';
import Tag from './Tag.jsx';
import TagSearchSelector from "./TagSearchSelector.jsx";
import ploopLogo from '../assets/ploopIcon.png';

// const TOILETS = [
//     {
//       "bathroomID": "bathroom_001",
//       "coords": {
//         "lat": 34.404834,
//         "long": -119.844177,
//       },
//       "name": "Public Urination Tub",
//       "address": "123 Main St, New York, NY",
//       "tags": [
//         "Female",
//         "Smells good"
//       ],
//       "ratings": {
//         "overallRating": 4.5,
//         "cleanRating": 5,
//         "boujeeRating": 3.5
//       },
//       "reviews": [
//         {
//           "reviewID": "review_001",
//           "userID": "user_001",
//           "overallRating": 4,
//           "cleanRating": 5,
//           "boujeeRating": 3,
//           "reviewText": "This bathroom was super clean and smelled great! The only downside was that it didn't have any fancy amenities."
//         },
//         {
//           "reviewID": "review_002",
//           "userID": "user_002",
//           "overallRating": 5,
//           "cleanRating": 5,
//           "boujeeRating": 5,
//           "reviewText": "Wow, this bathroom was amazing! It had everything I needed and more. I would definitely come back here again."
//         }
//       ]
//     },
//     {
//       "bathroomID": "bathroom_002",
//       "coords": {
//         "lat": 34.404834,
//         "long": -119.844177
//       },
//       "name": "Campus Point",
//       "address": "456 Elm St, New York, NY",
//       "tags": [
//         "Male",
//         "Non-gendered"
//       ],
//       "ratings": {
//         "overallRating": 3,
//         "cleanRating": 2,
//         "boujeeRating": 4
//       },
//       "reviews": [
//         {
//           "reviewID": "review_003",
//           "userID": "user_003",
//           "overallRating": 3,
//           "cleanRating": 2,
//           "boujeeRating": 4,
//           "reviewText": "This bathroom was just okay. It wasn't very clean and it didn't have any special features."
//         }
//       ]
//     },
//     {
//       "bathroomID": "bathroom_003",
//       "coords": {
//         "lat": 34.404834,
//         "long": -119.844177,
//       },
//       "name": "The Lavatory",
//       "address": "789 Oak St, New York, NY",
//       "tags": [
//         "Female",
//         "Smells good"
//       ],
//       "ratings": {
//         "overallRating": 4,
//         "cleanRating": 4,
//         "boujeeRating": 4
//       },
//       "reviews": [
//         {
//           "reviewID": "review_004",
//           "userID": "user_004",
//           "overallRating": 4,
//           "cleanRating": 4,
//           "boujeeRating": 4,
//           "reviewText": "This bathroom was very nice and clean. I appreciated the attention to detail and the pleasant fragrance."
//         }
//       ]
//     }
// ];

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
                <TextInput
                  style={styles.textInput}
                  placeholder="Search Here..."
                  lightTheme
                  round
                  value={searchValue}
                  //onChangeText={(text) => this.searchFunction(text)}
                  onChangeText={(text)=>updateSearchValue(text)}
                  autoCorrect={false}
                />
              </KeyboardAvoidingView>
              <TagSearchSelector getTagList={getTagList}/>

              <TouchableOpacity style={styles.button} onPress={() =>{searchFunction(searchValue,tagList)}}>
                <Text>Search</Text>
              </TouchableOpacity>

            </View>
            <CardList data = {subData} navigation = {props.navigation}/>            
          <Image source={ploopLogo} style = {styles.logoView}/>
        </View>
      </View>
    );
}

function CardList(props){
  return(
    <View >
      {props.data.map((item) => {return item ? <ToiletCard key = {item.bathroomID} toilet={item} navigation = {props.navigation}/> : null})}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    width: '90%',
  },
  inputBar: {
    flexDirection: 'row',
    height: 80,
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
    width: '50%',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#79443b',
    width: '20%',
    height: '100%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 10,
},

});
// export default SearchBar;
