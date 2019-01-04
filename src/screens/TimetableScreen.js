import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, SectionList, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';
import {Button} from '../components';
import TimeTableSlot from '../components/TimeTableSlot';

import { getTimeTable } from "../DataRequests/TimeTable";


class Timetable extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWeekData: [],
      selectedWeek: 0,
      weekNames: [],
      rawWeeks: {},
      selectedWeekName: "",
      refreshing: true
    };
  }
  
  getCurrentWeek() {
    var t2 = new Date().getTime();
    var t1 = new Date("Mon Dec 29 1969 00:00:00").getTime();
    return parseInt((t2-t1)/(24*3600*1000*7));
  }
  
  nextWeek() {
    this.setState(
      {
        currentWeekData: [],
        refreshing: true
      },
      () => this.loadWeek(this.state.selectedWeek + 1)
    );
  }
  
  previousWeek() {
    this.setState(
      {
        currentWeekData: [],
        refreshing: true
      },
      () => this.loadWeek(this.state.selectedWeek - 1)
    );
  }
  
  loadWeek(weekNo) {
    const weekName = this.state.weekNames[weekNo];
    this.setState({
      selectedWeek: weekNo,
      selectedWeekName: weekName
    });
    this.refreshWeek(weekNo);
  }
  
  refreshWeek(weekNo) {  
    return AsyncStorage.getItem("TimetableStoreage:"+weekNo).then((data) => {
      this.setState({
        currentWeekData: JSON.parse(data),
        refreshing: false
      });
    })
  }

  fetchTimeTable() {
     getTimeTable().then(data => {
       if (data.storedURL) {
         this.setState(
            {
              weekNames: data.timetable.weekNames,
              refreshing: true
            },
            () => this.loadWeek(this.getCurrentWeek())
          );
          for (var weekID in data.timetable.rawWeeks) {
            AsyncStorage.setItem("TimetableStoreage:"+weekID, JSON.stringify(data.timetable.rawWeeks[weekID]));
            console.log(weekID);
          }
          this.loadWeek(this.getCurrentWeek());
        } else {
         this.props.navigation.navigate("SetURL");
        }
      })
      .catch(() => this.setState({ refreshing: false }));
  }
  
  componentDidMount() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchTimeTable()
    );
  }
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<Entypo name="calendar" size={32} color={tintColor}/>)
  };
                                  
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchTimeTable()
    );
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
          <View style={styles.popup}>
            <View style={styles.weekSelector}>
               <Button
                  title={(<Entypo name="chevron-left" size={28} color={"white"} />)}
                  style={{
                    height: 60,
                    marginLeft: 5,
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                  textStyle={{
                    fontSize: 20,
                    color: '#fff'
                  }}
                  buttonStyle={styles.weekSelectorButton}
                  loadingColor={THEME_COLOR}
                  onPress={() => this.previousWeek()}
                  loading={loading}/>
              <View style={{
                justifyContent: 'center', 
                height: 60}}>
                <Text
                      style={{
                        fontSize: 20,
                        color: THEME_COLOR,
                        paddingTop: 0
                      }}
                  >
                  {'Week'} {this.state.selectedWeekName}
                </Text>
              </View>
              <Button
                  title={(<Entypo name="chevron-right" size={28} color={"white"} />)}
                  style={{
                    height: 60,
                    marginRight: 5,
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                  textStyle={{
                    fontSize: 20,
                    color: '#fff'
                  }}
                  buttonStyle={styles.weekSelectorButton}
                  loadingColor={THEME_COLOR}
                  onPress={() => this.nextWeek()}
                  loading={loading}/>
            </View>
            <ScrollView>
              <FlatList
                data={this.state.currentWeekData}
                renderItem={({ item, index }) =>  <TouchableOpacity
                        onPress={() => {
                          navigate('ViewEvent', {
                            event: item
                          });
                        }}
                         key={item.key} 
                      >
                        <TimeTableSlot session={item} />
                      </TouchableOpacity> }
                keyExtractor={(item, index) => item.key}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh.bind(this)}
                style={{
                    marginBottom: 10
                  }}
              />
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
  weekSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 70,
    justifyContent: 'space-between',
    padding: 5,
  },
  weekSelectorButton: {
    backgroundColor: THEME_COLOR,
    height: 50,
    width: 50
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
      marginTop: 0,
      marginLeft: 5,
      marginRight: 5,
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

export default Timetable;
