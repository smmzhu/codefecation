import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BathroomVerif = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = (value) => {
    setIsVerified(value);
  };

  return (
    <View>
      <Text>This restroom is not yet verified, is it a real restroom?</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={() => handleVerification(false)}>
          <Text style={{ fontSize: 30 }}>👎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleVerification(true)}>
          <Text style={{ fontSize: 30, marginLeft: 10 }}>👍</Text>
        </TouchableOpacity>
      </View>
      {isVerified && <Text>Thanks for verifying the restroom!</Text>}
    </View>
  );
};

export default BathroomVerif;