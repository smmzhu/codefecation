import React, {Component} from "react";
import { Text, View, TextInput, FlatList } from 'react-native';

const DATA = [
    {
      id: "1",
      title: "Data Structures",
    },
    {
      id: "2",
      title: "STL",
    },
    {
      id: "3",
      title: "C++",
    },
    {
      id: "4",
      title: "Java",
    },
    {
      id: "5",
      title: "Python",
    },
    {
      id: "6",
      title: "CP",
    },
    {
      id: "7",
      title: "ReactJs",
    },
    {
      id: "8",
      title: "NodeJs",
    },
    {
      id: "9",
      title: "MongoDb",
    },
    {
      id: "10",
      title: "ExpressJs",
    },
    {
      id: "11",
      title: "PHP",
    },
    {
      id: "12",
      title: "MySql",
    },
];

const Item = ({ title }) => {
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
};

const renderItem = ({ item }) => <Item title={item.title} />;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "enter",
    };
    this.arrayholder = DATA;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}


// const SearchBar = ({props}) => {
//     const [text, onChangeText] = React.useState('Useless Text');
//     return (
//         <View>
//             <TextInput
//                 onChangeText={onChangeText}
//                 value={text}
//             />  
//             <FlatList data={""} />
//         </View>
//     );
// };

export default SearchBar;
