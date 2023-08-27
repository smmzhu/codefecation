import React, { Component, useState} from 'react';
import {Pressable, Keyboard, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAvoidingView } from 'react-native';
import { Button as PaperButton } from "react-native-paper";

export default function ForgotPassword({navigation}){
    const [email, setEmail] = React.useState('');
    
    const passwordReset = async (email) => {
        const auth = await firebase.auth();
        console.log(email);
        await auth.sendPasswordResetEmail(email).then(() => {
            console.log('Password reset email sent!');
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
        navigation.navigate('Login');
        Alert.alert('Password reset email sent!');
    }
      
    return(
        <LinearGradient 
            colors={['#FF9482', '#7D77FF']} 
            start={{ x: -0.2, y: -0.2}} 
            end={{ x: 0.6, y: 0.6}}
            style={styles.containerView}
            >
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? -200 :0}>
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <View style={styles.inputStyle}>
            <TextInput
                style={styles.text}
                placeholder="Email"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            </View>
            <PaperButton
                style={{
                width: 300,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
                backgroundColor: "#5f37fe",
                }}
                labelStyle={styles.text}
                mode="contained" 
                onPress={() => passwordReset(email)}
            >
            Send Reset Email
            </PaperButton>
            <Text 
            style={styles.loginText}
            onPress={() => navigation.navigate('Login')}>
            Return to Login
            </Text>        
        </Pressable> 
        </KeyboardAvoidingView>  
        </LinearGradient>             
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    },

    containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // background: 'rgb(255,148,130)',
    // backgroundImage: 'linear-gradient(90deg, rgba(255,148,130,1) 0%, rgba(125,119,255,1) 100%)'
    }, 
    inputStyle: {
    width:"100%",
    backgroundColor:"rgba(255, 255, 255, 0.3)", 
    borderRadius:22,
    height:60,
    marginBottom:15,
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:20,
    paddingRight:20,
    dropShadow: 10,
    // borderColor: "#FFF",
    // borderWidth: 2,
    },
    loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
    },
    preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
    },
    text: {
    width: 250,
    fontSize: 18,
    // lineHeight: 21,
    textAlign: "center",
    fontFamily: "Comfortaa",
    },
});