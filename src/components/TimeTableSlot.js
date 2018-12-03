import React from 'react';
import { View } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import {THEME_COLOR} from "../lib/Constants";
import moment from 'moment';

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
    const { noteStyle } = styles;
    const startAMPM = (startHour < 13) ? startHour + "AM" : (startHour - 12) + "PM";
    const endAMPM = (endHour < 13) ? endHour + "AM" : (endHour - 12) + "PM";

    return (
        <Card key={key} containerStyle={{ backgroundColor: THEME_COLOR, margin: 10 }}>
          <Text style={{ marginBottom: 0, color: '#fff' }}>{title}</Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{"Location:"} {location.toUpperCase()}</Text>
            <Text style={noteStyle}>{day} {startAMPM} {"-"} {endAMPM}</Text>
          </View>
        </Card>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#fff',
    fontSize: 10
  }
};