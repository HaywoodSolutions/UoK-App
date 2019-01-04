import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import {EvilIcons} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { BusStops, BusRoutes } from "../lib/BusConstants";
import Article from '../components/Article';

class StageCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null,
      fromID: null,
      stops: {}
    }
  }
  
  getStops(currentStopCode) {
    let stationList = {};
    for (let routeID in BusRoutes) {
      let index = BusRoutes[routeID].stops.indexOf(currentStopCode);
      if (index != -1) {
        let array = BusRoutes[routeID].stops.slice(index, BusRoutes[routeID].stops.length - 1);
        for (var stop of array) {
          stationList[stop] = BusStops[stop];
        }
      }
    }
    return stationList;
  }

  getStartingStops() {
    let stationList = {};
    for (let routeID in BusRoutes) {
      let stops = BusRoutes[routeID].stops;
      for (let stopID in stops) {
        let stop = stops[stopID];
        if (stops[-1] != stop) {
          stationList[stop] = BusStops[stop];
        }
      }
    }
    return stationList;
  }
  
  componentDidMount() {
    this.setState({
      mode: this.props.navigation.state.params.mode,
      fromID: (this.props.navigation.state.params.mode == "to") ? this.props.navigation.state.params.fromID : null,
      stops: (this.props.navigation.state.params.mode == "to") ? this.getStops(this.props.navigation.state.params.fromID) : this.getStartingStops()
    });
  }
  
  selectedLocation(locationID) {
    this.props.navigation.state.params.returnData(locationID);
    this.props.navigation.goBack();
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
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
        <View style={styles.halfPopup}>
          <ScrollView style={styles.container}>
            {Object.keys(this.state.stops).map((key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.selectedLocation(key)
                  }}
                  key={key}>
                  <View style={styles.result}>
                    <Text>{((this.state.stops[key] && this.state.stops[key].title) ? this.state.stops[key].title : "Cannot found key ("+key+")")}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios:{
        paddingTop: 10
      }
    })
  },
  result: {
    padding: 10,
    margin: 5,
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderColor: '#BBB',
    borderStyle: 'solid',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  dismissPopup: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  container: {
    padding: 10,
    marginBottom: 10
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
  halfPopup: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: "#ffffff",
      height: "60%",
      width: '100%',
      justifyContent:"center",
      flex: 1
  },
  popup: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#ffffff",
    flex: 1,
    margin: 5
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
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(StageCoach);