import React from 'react';
import { View, Text, Button } from 'react-native';

const TestBathroomScreen = ({navigation}) => {
  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 50}}>Test Bathroom</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TestBathroomScreen;
