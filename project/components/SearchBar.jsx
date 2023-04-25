import React, {Component} from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Image, Button } from 'react-native';
import ToiletCard from './ToiletCard.jsx';


const TOILETS = [
  {
    name: "Engineering Science Building",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 1.5,
    id:"1",
    location: "Santa Barbara",  
  },
  {
    name: "Storke Tower",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 2.5,
    id:"2",
    location: "Santa Barbara",
  },
  {
    name: "Arbor ",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 3.5,
    id:"3",
    location: "Santa Barbara",    
  },
  {
    name: "Ocean",
    coords: {
      latitude: 34.404834,
      longitude: -119.844177,
    },
    rating: 4.5,
    id:"4",
    location: "Santa Barbara",
},
];

const renderItem = ({item, navigation}) => <ToiletCard toilet={item} navigation = {navigation}/>;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: TOILETS,
      error: null,
      searchValue: "",
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
      <View>
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
              keyExtractor={(item) => item.id}
        />        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBar: {
    flex: 1,
  },
  textInput: {
    width: '100%',
    height: '5%',
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

