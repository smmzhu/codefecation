import * as React from 'react';
import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableOpacity, Text, View, Button, SafeAreaView, Alert, Image, KeyboardAvoidingView, RefreshControl, ScrollView, FlatList} from 'react-native';
import MiniInfoBox from '../components/miniInfoBox.jsx';
import SlidingPanel from "../components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
import Map from '../components/Map.jsx';
import userLocation from '../hooks/getUserPos.jsx';
import firebase from '../database/firebase';
import {getBathroomFromDB} from '../database/databaseFuncs';
import kNearestToilets from '../database/geoquerying.js';
import backButton from '../assets/backButton.png';
import {Button as PaperButton} from 'react-native-paper';
import ploopName from '../assets/ploopName.png';
import addToiletButton from '../assets/addToiletButton.png';
import { LinearGradient } from 'expo-linear-gradient'

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

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      setCurrPtInfoActive("none");
      setLastPtInfo("none");
      setActiveFlag(false);
      setBathroomList([]);
      (async () => {
        const locObj = await userLocation();
        setUserLoc({latitude: locObj.latitude, longitude: locObj.longitude});
        const db = await firebase.firestore();
        await kNearestToilets(db, 7, [locObj.latitude, locObj.longitude], 5*1000).then((res) => {
          setBathroomList(res);
        });
      })()
    }, []);

    useEffect(
      () => {(async () => {
        const locObj = await userLocation();
        setUserLoc({latitude: locObj.latitude, longitude: locObj.longitude});
        const db = await firebase.firestore();
        await kNearestToilets(db, 7, [locObj.latitude, locObj.longitude], 5*1000).then((res) => {
          setBathroomList(res);
        });
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
      
        <View style={stylesMap.container}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> 
            <LinearGradient 
              colors={['#6b70fe', '#a7a9fe']} 
              start={{ x: 0.5, y: 1.2}} 
              end={{ x: 0.5, y: 0}}
              style={{backgroundColor: "transparent", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, height: 100}}
            >
            <PaperButton onPress={createTwoButtonAlert} style = {{backgroundColor:"transparent", height: 50, width: 50, justifyContent: "center", alignSelf: "flex-end", resizeMode: "contain", marginBottom: 5, marginRight: 15}}>
              <Image source={backButton} style={styles.logoView}/>
            </PaperButton>
            <Image source = {ploopName} style = {styles.nameView}/>
            <PaperButton onPress={() => {navigation.navigate('BathroomRequest', {navigation: navigation, userLoc: userLoc})}} style = {{backgroundColor:"transparent", height: 50, width: 50, justifyContent: "center", alignSelf: "flex-end", resizeMode: "contain", margin: 1, marginBottom: 5, flexGrow: 2}} >
              <Image source={addToiletButton} style={styles.logoView}/>
            </PaperButton>
            {/* <Button 
            title="Can't Find a Bathroom?"
            onPress={() => {navigation.navigate('BathroomRequest', {navigation: navigation, userLoc: userLoc})}}
            /> */}
            </LinearGradient>
          <Map bathroomList = {bathroomList} userLoc = {userLoc} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} lastPtInfo = {lastPtInfo} setLastPtInfo = {setLastPtInfo}/>
          </ScrollView>
          <MiniInfoBox userLocation={userLoc} toilet = {lastPtInfo} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>

          {/*<MiniInfoBox tags={lastPtInfo.tags} name = {lastPtInfo.name} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>*/}
          <StatusBar style="auto" />
          {/* <StatusBar refreshFlag={refreshFlag} style="auto" /> */}
          <SlidingPanel userLoc={userLoc} color = '#9f8170' navigation = {navigation} bathroomList={bathroomList}>

          </SlidingPanel>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :0}/>
        </View>
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
      width: 40,
      height: 40,
      // marginBottom: 0,
      // marginTop: 0,
      margin: 5,
      resizeMode: 'contain',
     },
     nameView:{
      width: 30,
      height: 50,
      marginBottom: 5,
      marginTop: 0,
      resizeMode: "contain",
      alignSelf: "flex-end",
      flexGrow: 3,
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
      width: '100%',
      height: '100%',
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
