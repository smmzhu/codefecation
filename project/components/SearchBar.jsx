import React, {Component} from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Image, Button } from 'react-native';
import ToiletCard from './ToiletCard.jsx';
import Tag from './Tag.jsx';

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

const renderItem = ({item, navigation}) => <ToiletCard key = {item.bathroomID} toilet={item} navigation = {navigation}/>;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: props.bathroomList,
      error: null,
      searchValue: "",
    };
    this.arrayholder = props.bathroomList;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const name_data = `${item.name.toUpperCase()})`;
      var tag_data;
      for(let i = 0; i < item.tags.length; i++){
        tag_data += `${item.tags[i].toUpperCase()})`;
      }
      const text_data = text.toUpperCase();
      return (name_data.indexOf(text_data) > -1 || tag_data.indexOf(text_data) > -1 );
    });
    this.props.toiletListSize(updatedData.length);
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
              nestedScrollEnabled={true}
              style={styles.flatList}
              data={this.state.data}
              renderItem={(item) => renderItem({...item, navigation: this.props.navigation})}
              keyExtractor={(item) => item.bathroomID}
        />
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
    flex: 1,
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
  }

});

export default SearchBar;

// const renderItem = ({ item }) => <ToiletCard title={item.title} />;
// class SearchBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       data: DATA,
//       error: null,
//       searchValue: "enter",
//     };
//     this.arrayholder = DATA;
//   }

//   searchFunction = (text) => {
//     const updatedData = this.arrayholder.filter((item) => {
//       const item_data = `${item.title.toUpperCase()})`;
//       const text_data = text.toUpperCase();
//       return item_data.indexOf(text_data) > -1;
//     });
//     this.setState({ data: updatedData, searchValue: text });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Search Here..."
//           lightTheme
//           round
//           value={this.state.searchValue}
//           onChangeText={(text) => this.searchFunction(text)}
//           autoCorrect={false}
//         />
//         <FlatList
//           style={styles.flatList}
//           data={this.state.data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     );
//   }
// }
