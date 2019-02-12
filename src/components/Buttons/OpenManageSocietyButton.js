import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Button = function(navigation) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("ManageSociety", {
          societyID: this.state.societyID,
          society: this.state.society
        });
      }}>
      <View style={{marginRight: 20}}>
        <MaterialIcons name="settings" size={26} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

export default Button;