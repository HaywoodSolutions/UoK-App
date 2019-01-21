import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import {THEME_COLOR} from "../lib/Constants";
import moment from 'moment';

import styles from "../styles/main.style"

export default class TimeTableSession extends React.Component {
  render() {
    const {
      day,
      startHour,
      endHour,
      title,
      location,
      key,
      startDate
    } = this.props.session;
    const startAMPM = (startHour < 13) ? startHour + "AM" : (startHour - 12) + "PM";
    const endAMPM = (endHour < 13) ? endHour + "AM" : (endHour - 12) + "PM";
    
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        key={key} 
      >
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.title}>{day} {startAMPM} {"-"} {endAMPM}</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.title}>{"Location:"} {location.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}