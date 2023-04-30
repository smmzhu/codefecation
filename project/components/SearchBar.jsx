import React, {Component, useEffect} from "react";
import { StyleSheet,KeyboardAvoidingView, Text, View, TextInput, FlatList, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import ToiletCard from './ToiletCard.jsx';
import Tag from './Tag.jsx';
import TagSearchSelector from "./TagSearchSelector.jsx";

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


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.bathroomList,
      error: null,
      searchValue: "",
      tagList: [],
      height: 420,
    };

    this.arrayholder = this.props.bathroomList;
  }
  getTagList = (taglist) => {
    // console.log(taglist);
    this.setState({tagList: taglist})
  }

  // changes search value to text input
  updateSearchValue = (text) => {
    this.setState({searchValue: text});
  }

  searchFunction = (text, tags) => {

    // filter all without text in name, 

    const updatedData = this.arrayholder.filter((item) => {
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

    this.props.toiletListSize(finalData.length);
    this.setState({ data: finalData });
  };

  onLayout = (event)=> {
    let layout = event.nativeEvent.layout; //btw it spits out x,y,width,height normally
    this.props.setHeight(layout.height + 100)
  }

  render() {
    if (this.props.bathroomList != this.state.data){
      this.state.data = this.props.bathroomList;
    }
    return (
      <View style={styles.container}>
        <View onLayout = {this.onLayout}>
          <View style={styles.inputBar}>
              <KeyboardAvoidingView behavior="position" style={styles.container}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search Here..."
                  lightTheme
                  round
                  value={this.state.searchValue}
                  //onChangeText={(text) => this.searchFunction(text)}
                  onChangeText={(text)=>this.updateSearchValue(text)}
                  autoCorrect={false}
                />
              </KeyboardAvoidingView>
              <TagSearchSelector getTagList={this.getTagList}/>

              <TouchableOpacity style={styles.button} onPress={() =>{this.searchFunction(this.state.searchValue,this.state.tagList)}}>
                <Text>Search</Text>
              </TouchableOpacity>

            </View>
            {this.state.data.map((item) => {return item ? <ToiletCard key = {item.bathroomID} toilet={item} navigation = {this.props.navigation}/> : null})}
          </View>
      </View>
    );
  }
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

export default SearchBar;
