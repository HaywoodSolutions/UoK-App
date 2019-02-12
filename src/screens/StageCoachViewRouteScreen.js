import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, Dimensions } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { getInquireFeed } from "../DataRequests/Inquire";

const ITEMS_PER_PAGE = 10;

class StageCoachViewRoute extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      routeData: navigation.getParam('route', {})
    };
  }
  
  generateRouteParts() {
    var parts = [];

    for (let i=0; i<this.state.routeData.route_parts.length; i++){
      let partData = this.state.routeData.route_parts[i];
        parts.push(
            <View key={i} style={{margin: 5}}>
                <Text style={styles.title}>{partData.arrival_time}</Text>
                <Text style={styles.title}>{partData.departure_time}</Text>
                <Text style={styles.title}>{partData.destination}</Text>
                <Text style={styles.title}>{partData.duration}</Text>
                <Text style={styles.title}>{partData.from_point_name}</Text>
                <Text style={styles.title}>{partData.line_name}</Text>
                <Text style={styles.title}>{partData.mode}</Text>
                <Text style={styles.title}>{partData.to_point_name}</Text>
            </View>
        )
    }
    return parts;
}
  
  render() {
    const { backgroundStyle, noteStyle } = styles;
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }

    return (
        <View style={backgroundStyle}>
            <ScrollView style={styles.popup}>
              <Text style={styles.title}>{this.state.routeData.arrival_time}</Text>
              <Text style={styles.title}>{this.state.routeData.departure_time}</Text>
              <Text style={styles.title}>{this.state.routeData.duration}</Text>
              {this.generateRouteParts()}
           </ScrollView>
        </View>
    );
  }
}
/*{
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
}*/

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    ...Platform.select({
      ios:{
        paddingTop: 10
      }
    })
  },
  articleContent: {
    margin: 0,
    padding: 0
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
  },
  scrollStyle: {
    flex: 1
  },
  noteStyle: {
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  list: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      marginTop: 25,
      marginLeft: 10,
      marginRight: 10,
      flex: 1
  },
  popup: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: "#ffffff",
      padding: 10,
      flex: 1
  },
  item: {
      margin: 3,
      padding: 10,
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: THEME_COLOR,
      color: '#000000',
      fontSize: 19
  },
  title: {
    marginBottom: 2.5,
    paddingBottom: 0,
    fontSize: 20,
    fontWeight: '600'
  },
  authors: {
    marginBottom: 10,
    fontSize: 15,
    color: '#b2bec3'
  },
});

export default StageCoachViewRoute;