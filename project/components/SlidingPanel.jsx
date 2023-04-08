import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
// import useWindowDimensions from '../hooks/getWindowDims.jsx';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();
    // const {height, width} = {height: 1250, width: 1080};
    var rating1 = 5;

    return (
        <SlidingUpPanel height = {height} draggableRange = {{top: height-60, bottom: 100}} backgroundColor='white'>
            <View style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}>
              <SearchBar/>
              {/* <View style={styles2.container}>
                <Rating Rating = {rating1}/>
              </View>
              <View style={styles2.container}>
                <SearchBar/>
              </View> */}

                <StatusBar style="auto" />
            </View>
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
  });
  
  const styles2 = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   //backgroundColor: '#f00',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    container: {
      // flex: 1,
      // //backgroundColor: '#f00',
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '75%',
      height: '30%',
    },
  });