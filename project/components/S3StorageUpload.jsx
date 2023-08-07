import Amplify from '@aws-amplify/core';
import {Storage, Auth} from 'aws-amplify';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker
import Video from 'react-native-video';
import awsconfig from '../src/aws-exports';
import { Button as PaperButton } from 'react-native-paper';
Amplify.configure(awsconfig);

function AuthAWS() {
  // To derive necessary data from the provider
  const {
    token, // the token you get from the provider
    domainOrProviderName, // Either the domain of the provider(e.g. accounts.your-openid-provider.com) or the provider name, for now the library only supports 'google', 'facebook', 'amazon', 'developer'
    expiresIn, // the time in ms which describes how long the token could live
    user,  // the user object you defined, e.g. { username, email, phone_number }
    identity_id // Optional, the identity id specified by the provider
  } = getFromProvider(); // arbitrary function

  Auth.federatedSignIn(
    domain,
    {
        token,
        identity_id, // Optional
        expires_at: expiresIn * 1000 + new Date().getTime() // the expiration timestamp
    },
    user
  ).then(cred => {
      // If success, you will get the AWS credentials
      console.log(cred);
      return Auth.currentAuthenticatedUser();
  }).then(user => {
      // If success, the user object you passed in Auth.federatedSignIn
      console.log(user);
  }).catch(e => {
      console.log(e)
  });
}

const S3StorageUpload = forwardRef((props, ref) => {
  
  const [asset, setAsset] = useState([]);
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  // AuthAWS();

  const selectFile = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then(res => {
      if (!res.canceled) {
        setProgressText('');
        delete res.cancelled;
        delete res.type;
        delete res.uri;
        const temp = [...asset, res];
        console.log(temp);
        setAsset(temp);
      }
      else{
        Alert.alert('Cancelled');
      }});
  };

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    // console.log(response);
    const blob = await response.blob();
    return blob;
  };

  useImperativeHandle(ref, () => ({
    async uploadResource(){
      if (isLoading) return;
      setisLoading(true);
      let keyList = [];
      for (let i = 0; i < asset.length; i++) {
        const img = await fetchResourceFromURI(asset[i].assets[0].uri);
        const key = await Storage.put(asset[i].assets[0].uri, img, {
          level: 'public',
          contentType: asset[i].assets[0].type,
          region: 'us-west-1',
          progressCallback(uploadProgress) {
            setProgressText(
              `Progress: ${Math.round(
                (uploadProgress.loaded / uploadProgress.total) * 100,
              )} %`,
            );
            console.log(
              `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
            );
          },
        })
          .then(res => {
            // console.log(res);
            setProgressText('Upload Done: 100%');
            // setAsset(null);
            setisLoading(false);
            keyList.push(res.key);
            Storage.get(res.key)
              .then(result => console.log("ins result"))//console.log(result))
              .catch(err => {
                setProgressText('Upload Error');
                console.log(err);
              });
          })
          .catch(err => {
            setisLoading(false);
            setProgressText('Upload Error');
            console.log(err);
          });
      }
      // console.log(keyList);
      return keyList;
    }
  }));

  

  return (
    <View style={styles.container}>
      <PaperButton
        style={[styles.button, {color: isLoading ? 'grey' : '#fff'}]}
        labelStyle={styles.subText}
        mode="contained" 
        onPress={selectFile}
      >
        Upload {asset.length != 0 ? 'Another ' : ''}Image
      </PaperButton>
      {console.log(asset.length)}
      {asset.map((item, index)=>
        (<View key = {item.assets[0].uri}>
          {item.assets[0].type.split('/')[0] === 'image' ? (
            <Image
              style={styles.selectedImage}
              source={{uri: item.assets[0].uri}}
            />
          ) : (
            <Video
              style={styles.selectedImage}
              source={{uri: item.assets[0].uri}}
            />
          )}
          <TouchableOpacity 
            onPress={() => {
              if (isLoading) return;
              asset.splice(index, 1);
              const temp = [...asset];
              setAsset(temp);
            }}
            >
            <Text
              style={[
                styles.cancelButton,
                {color: isLoading ? 'grey' : 'blue'},
              ]}
              >
              Remove Selected Image
            </Text>
          </TouchableOpacity>
        </View>)
      )}
      <Text>{progressText}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  cancelButton: {
    color: 'blue',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
      // width: '80%',
      // height: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      backgroundColor: '#9A9AFE',
  },
  subText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Comfortaa",
    color: "#000",
  },
});

export default S3StorageUpload;