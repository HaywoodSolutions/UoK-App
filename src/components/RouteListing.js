import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons';

export default class RouteListing extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route: props.routeData
    };
  }

  getRouteIcons() {
    return (
      <View>
        {Object.keys(this.state.route.route_parts).map((key) => {
         if (this.state.route.route_parts[0].mode == "bus") {
          return (
            <View key={key} style={styles.routeIcon}>
              <Text style={styles.routeIconText}>{this.state.route.route_parts[0].line_name}</Text>
            </View>
          );
        } else if (this.state.route.route_parts[0].mode == "foot") {
          return (
            <MaterialIcons key={key} name="directions-walk" size={23} color={"grey"} />
          );
        }
        })}
      </View>
    );
  }

  render() {    
    const time = this.state.route.duration.replace(/0/g, "").split(":");
    let min = time[1].length >= 1 ? time[1] + " min" : "";
    let hour = time[0].length >= 1 ? time[0] + " hour" : "";
    let timeOfJourney = hour.length >= 1 ? hour + " " + min : min;

    return (
          <View style={styles.result}>
            <View style={styles.row}>
              <View styles={styles.rowLeft}>
                {this.getRouteIcons()}
              </View>
              <Text style={{fontWeight: 'bold'}}>{timeOfJourney}</Text>
            </View>
            <Text>{this.state.route.departure_time + " - " + this.state.route.arrival_time}</Text>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  rowLeft: {
    paddingRight: 10,
    width: 300
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  result: {
    padding: 5,
    margin: 5,
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderColor: '#BBB',
    borderStyle: 'solid',
  },
  routeIcon: {
    padding: 2.5,
    backgroundColor: 'grey',
    borderRadius: 2
  },
  routeIconText: {
    color: 'white'
  }
});

/*
{
  "arrival_time": "14:33",
  "departure_time": "14:18",
  "duration": "00:15:00",
  "route_parts": [
    {
      "arrival_time": "14:33",
      "coordinates": [
        [
          1.0754,
          51.275,
        ],
        ...
      ],
      "departure_time": "14:18",
      "destination": "",
      "duration": "00:15:00",
      "from_point_name": "Canterbury, Queens Avenue",
      "line_name": "",
      "mode": "foot",
      "to_point_name": "Canterbury, Canterbury East Railway Station",
    }
  ]
}
*/