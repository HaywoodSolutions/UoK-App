import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, Picker, Button, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {THEME_COLOR, GENERIC_THEME_COLOR} from "../lib/Constants";
import Article from '../components/Article';
import { HeaderBackButton } from 'react-navigation';
import { getStageCoach } from "../DataRequests/StageCoach";
import RouteListing from "../components/RouteListing";
import { loadPcData, campuses } from "../DataRequests/PCAvailability";
import PercentageCircle from 'react-native-percentage-circle';

class StageCoach extends React.Component {      
  constructor(props) {
    super(props);
    this.state = {
      campus: campuses[0],
      buildings: [],
      building_order: []
    };
  }
  
  componentDidMount() {
    this.updatePCData(this.state.campus);
  }
  
  changeCampus(campusID) {
    this.setState({
      pcData: [],
      refreshing: true,
      campus: campusID
    });
    this.updatePCData(campusID);
  }
  
  updatePCData(campusID) {
    loadPcData(campusID)
      .then(data => {
        console.log(data);
        this.setState({ 
          buildings: data.buildings,
          building_order: data.building_order
        });
      })
      .catch(() => this.setState({ refreshing: false }));
  }
  
  render() {
    const { backgroundStyle, noteStyle } = styles;
    const {
      loading,
      error,
      note
    } = this.props;

    return (
        <View style={backgroundStyle}>
          <View style={styles.popup}>
            <ScrollView>
              <View>
                {Object.keys(this.state.buildings).map((buildingName) => {
                  let building = this.state.buildings[buildingName];
                  let output = [];
                  if (building.length > 0) {
                    output.push((
                        <View key={buildingName} style={styles.buildingHeader}>
                          <Text style={styles.buildingHeaderText}>{buildingName}</Text>
                        </View>
                      ));
                    for (var area of building) {
                      output.push((
                        <View key={area.name} style={styles.buildingResult}>
                          <View style={styles.buildingResultLeft}>
                            <Text style={styles.title}>{area.name}</Text>
                            <Text style={styles.subTitle}>{area.free + " / " + area.total + " PCs free"}</Text>
                          </View>
                          <View style={styles.buildingResultRight}>
                            <Text style={styles.bigText}>{area.free}</Text>
                          </View>
                        </View>
                      ));
                    }
                  }
                  return output;
                })}
              </View>
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
  buildingHeader: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: GENERIC_THEME_COLOR.secondary,
    height: 40
  },
  buildingHeaderText: {
    color: '#FFF',
    fontSize: 19
  },
  buildingResult: {
    flex: 1,
    flexDirection:'row'
  },
  buildingResultLeft: {
    flex: 1,
    flexDirection:'column',
    padding: 10
  },
  buildingResultRight: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    color: '#000',
    fontSize: 17,
    fontWeight: '600'
  },
  subTitle: {
    color: '#000',
    fontSize: 17
  },
  bigText: {
    color: '#000',
    fontSize: 35,
    fontWeight: '600'
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