import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../lib/Constants";

export const TimeTableSlot = ({ title, day, starts, ends, location }) => {
  if (starts > 12) {
    starts -= 12;
    starts = starts + "pm";
  } else starts = starts + "am";
  
  if (ends > 12) {
    ends -= 12;
    ends = ends + "pm";
  } else ends = ends + "am";
  
  return (
    <View style={styles.slotContainer}>
      <Text style={styles.time}>
        {starts} - {ends}
      </Text>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.location}>
        {location}
      </Text>
    </View>
  );
};

const styles = {
  slotContainer: {
    backgroundColor: THEME_COLOR,
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  time: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    height: 20
  },
  title: {
    color: '#fff',
    fontSize: 20,
    height: 20
  }, 
  location: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    height: 20
  },
};
