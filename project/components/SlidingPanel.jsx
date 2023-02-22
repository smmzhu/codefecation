import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
// import useWindowDimensions from '../hooks/getWindowDims.jsx';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();
    // const {height, width} = {height: 1250, width: 1080};
    return (
        <SlidingUpPanel height = {height} draggableRange = {{top: height, bottom: 100}} backgroundColor='blue'>
            <View style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}>
                <SearchBar/>
                <Text>oh hey you found the stupid ass panel</Text>
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
    container: {
      flex: 1,
      //backgroundColor: '#f00',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });