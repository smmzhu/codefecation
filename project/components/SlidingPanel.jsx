import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useWindowDimensions } from 'react-native';
import SearchBar from './SearchBar';

export default function SlidingPanel(props) {
    const {height, width} = useWindowDimensions();

    return (
        <SlidingUpPanel height = {height} draggableRange = {{top: height-60, bottom: 100}} backgroundColor='white'>
            <View style={{flex: 1, backgroundColor: props.color, alignItems: 'center', justifyContent: 'center',}}>
              <SearchBar/>
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
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '75%',
      height: '30%',
    },
  });