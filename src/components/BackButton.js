import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import {Entypo} from '@expo/vector-icons';

const BackButton = function(navigation) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack(null);
      }}>
      <View style={{marginLeft: 20}}>
        <Entypo name="chevron-thin-left" size={23} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

export default BackButton;