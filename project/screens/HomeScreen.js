import * as React from 'react';
import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableOpacity, Text, View, Button, SafeAreaView, Alert, Image } from 'react-native';
import MiniInfoBox from '../components/miniInfoBox.jsx';
import SlidingPanel from "../components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
import Map from '../components/Map.jsx';
import userLocation from '../hooks/getUserPos.jsx';
import firebase from '../database/firebase';
import {getBathroomFromDB} from '../database/databaseFuncs';

function HomeScreen({ navigation }) {
  const [refreshFlag, setRefreshFlag] = React.useState(false);

  const handleRefresh = () => {
    // console.log("Refresh button pressed");
    // Update the refresh flag to trigger a re-render of the component
    setRefreshFlag(!refreshFlag);
  };
    const [currPtInfoActive, setCurrPtInfoActive] = useState("none");
    const [lastPtInfo, setLastPtInfo] = useState("none");
    const [activeFlag, setActiveFlag] = useState(false); //this goes up if the currpt goes from none to something, then it goes back to false
    const [userLoc, setUserLoc] = useState({latitude: 34.404834, longitude: -119.844177,})
    const [bathroomList, setBathroomList] = useState([]);

    useEffect(() => {
      async function dbFunc() {
        const db = await firebase.firestore();
        // const bathroom = await getBathroomFromDB(db, "bathroom_001"); //test get bathroom from db
        const bathroomIDs = ["bathroom_001", "bathroom_002", "bathroom_003", "bathroom_004", "bathroom_005", "bathroom_006", "bathroom_007", "bathroom_008", "bathroom_009", "bathroom_010"]; //replace with like closest 10 bathrooms
        for (bathroomID of bathroomIDs) {
          let bathroomObj = await getBathroomFromDB(db, bathroomID);
          bathroomList.push(bathroomObj);
          console.log(bathroomID);
        }
        // console.log(bathroom);
        setBathroomList(bathroomList);
        // console.log(bathroomList);
      };
      dbFunc().then(() => console.log("dbFunc() ran")).catch((err)=>{console.log(err)});
  },[bathroomList]);
      
    useEffect(
      () => {(async () => {
        const locObj = await userLocation();
        setUserLoc({latitude: locObj.latitude, longitude: locObj.longitude});
      })()}
    , []);

    const createTwoButtonAlert = () =>
    Alert.alert('Are you sure to logout?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', 
      onPress: () => logOut()},
    ]);

    const logOut = () => {
      navigation.navigate('Login');
    }

    return (
      <SafeAreaView style={stylesMap.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 1 }}>
        <Button title={'Sign Out'} onPress={createTwoButtonAlert} />

        <TouchableOpacity 
        style={styles.RefreshButton}
        onPress={handleRefresh}
        //</View>onPress={() => this.forceUpdate(0)}
        >
          <Image source={require('../assets/ploopIcon.png')} style={styles.logoView}/>
          <Text>Refresh Map</Text>
        </TouchableOpacity>

        <Button 
        title="Can't Find a Bathroom?"
        onPress={() => {navigation.navigate('BathroomRequest', {navigation: navigation, userLoc: userLoc})}}
        />
        </View>
        <Map bathroomList = {bathroomList} userLoc = {userLoc} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} lastPtInfo = {lastPtInfo} setLastPtInfo = {setLastPtInfo}/>
        <MiniInfoBox toilet = {lastPtInfo} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>
        {/*<MiniInfoBox tags={lastPtInfo.tags} name = {lastPtInfo.name} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>*/}
        <StatusBar style="auto" />
        {/* <StatusBar refreshFlag={refreshFlag} style="auto" /> */}
        <SlidingPanel color = '#9f8170' navigation = {navigation} bathroomList={bathroomList}>

        </SlidingPanel>
      </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoView: {
      width: 50,
      height: 50,
      marginBottom: 0,
      marginTop: 0,
      resizeMode: 'contain',
     },
    RefreshButton: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#9f8170',
      borderRadius: 10,
      borderColor: '#000',
    },
  });

const stylesMap = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    marker: {
      width: 50,
      height: 50,
    },
  });
