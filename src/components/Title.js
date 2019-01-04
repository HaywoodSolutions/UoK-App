import React from 'react';
import { View, Text } from 'react-native';

export const Title = ({title}) => {
  return (
    <View>
      <Text
          style={{
            fontWeight: '600',
            fontSize: 20,
            alignSelf: 'center',
            color: '#fff',
            paddingTop: 0
          }}
      >
        {'KentFlix'}
      </Text>
      <Text
          style={{
            fontWeight: '600',
            fontSize: 10,
            alignSelf: 'center',
            color: '#fff',
            paddingTop: 0
          }}
      >
        {title}
      </Text>
    </View>
  );
};