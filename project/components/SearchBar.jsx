import React, {Component} from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import ToiletCard from './ToiletCard';

const TOILETS = [
  {
    name: "Engineering Science Building",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 4.5,
    id:"1",
    location: "Santa Barbara",  
  },
  {
    name: "Storke Tower",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 4.5,
    id:"2",
    location: "Santa Barbara",
  },
  {
    name: "Arbor ",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 4.5,
    id:"3",
    location: "Santa Barbara",    
  },
];

const renderItem = ({ item }) => <ToiletCard toilet={item} />;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: TOILETS,
      error: null,
      searchValue: "enter",
    };
    this.arrayholder = TOILETS;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
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
          style={styles.flatList}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '5%',
  },
  textInput: {
    width: '150%',
    height: '5%',
    backgroundColor: 'white',
    borderColor: '#79443b',
    borderWidth: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  flatList: { 
    width: '150%',
    height: '5%',
    backgroundColor: '#79443b',
    borderColor: '#79443b',
    borderWidth: 10,
    borderRadius: 10,
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