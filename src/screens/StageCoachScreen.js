import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, Picker, Button, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {THEME_COLOR} from "../lib/Constants";
import Article from '../components/Article';
import { HeaderBackButton } from 'react-navigation';
import { getStageCoach } from "../DataRequests/StageCoach";
import RouteListing from "../components/RouteListing";
import { BusStops } from "../lib/BusConstants";

class StageCoach extends React.Component {      
  constructor(props) {
    super(props);
    this.state = { refreshing: true, toLocationID: null, fromLocationID: null, times: [] };
  }
  
  returnToData(id) {
    this.setState({toLocationID: id});
    if (this.state.fromLocationID != null)
      this.updateList(this.state.fromLocationID, id);
  }
  
  returnFromData(id) {
    this.setState({fromLocationID: id});
    if (this.state.toLocationID != null)
      this.updateList(id, this.state.toLocationID);
  }
     
  updateList(fromLocationID, toLocationID) {
    this.setState({ times: [], refreshing: true });
    getStageCoach(fromLocationID, toLocationID)
      .then(times => this.setState({ times, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
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

    const { navigate } = this.props.navigation;
    return (
        <View style={backgroundStyle}>
          <View style={styles.inputRow}>
            <View style={styles.left}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.label}>To</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.select}
                onPress={() => {
                  navigate('SelectLocation', {
                    returnData: this.returnFromData.bind(this),
                    mode: "from"
                  });
                }}>
                <Text> {(this.state.fromLocationID == null) ? "Select Location" : BusStops[this.state.fromLocationID].title} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.select}
                onPress={() => {
                  if (this.state.fromLocationID != null)
                    navigate('SelectLocation', {
                      returnData: this.returnToData.bind(this),
                      mode: "to",
                      fromID: this.state.fromLocationID
                    });
                }}>
                <Text> {(this.state.toLocationID == null) ? "Select Location" : BusStops[this.state.toLocationID].title} </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popup}>
            <ScrollView>
              {Object.keys(this.state.times).map((key) => {
               return (
                  <TouchableOpacity key={key} 
                      onPress={() => {
                        this.props.navigation.navigate('ViewRoute', {
                          route: this.state.times[key]
                        });
                      }} 
                    >
                      <RouteListing routeData={this.state.times[key]}/>
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
    backgroundColor: THEME_COLOR,
    ...Platform.select({
      ios:{
        paddingTop: 10
      }
    })
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 125,
    padding: 5,
    marginLeft: 10
  },
  result: {
    padding: 5,
    margin: 5,
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderColor: '#BBB',
    borderStyle: 'solid',
  },
  label: {
    flex: 1,
    color: 'white',
    marginBottom: 10,
    textAlign: 'right',
    height: 30,
    borderRadius: 5,
    paddingTop: 10
  },
  select: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    height: 30,
    borderRadius: 5
  },
  right: {
    flex: 1,
    margin: 10,
  },
  left: {
    margin: 10,
    marginLeft: 0,
    marginRight: 5
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