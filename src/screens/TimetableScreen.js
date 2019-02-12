import React from 'react';
import {View, Text, Platform, ScrollView, ListView, SectionList, FlatList, AsyncStorage } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';
import {Button} from '../components';
import TimeTableSlot from '../components/TimeTableSlot';

import { getTimeTable } from "../DataRequests/TimeTable";

import styles from "../styles/main.style";


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
        currentWeekData: JSON.parse(data).sort(function(a, b) {
            return a.key > b.key;
        }),
        refreshing: false
      });
      console.log(data);
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
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }

    let currentDay = null;
    const navigation = this.props.navigation;
    return (
        <View style={styles.background}>
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
            <ScrollView
                  style={{
                    flex: 1,
                    padding: 15
                  }}
                >
                  <View style={{
                    marginBottom: 15}}>
                  {Object.keys(this.state.currentWeekData).map((eventID) => {
                   return (
                     <View
                      key={eventID}
                      style={{
                          flex: 1,
                          minHeight:20,
                      }}
                     >
                      <TimeTableSlot onPress={() => {
                        this.props.navigation.navigate('ViewEvent', {
                          event: this.state.currentWeekData[eventID]
                        });
                      }} session={this.state.currentWeekData[eventID]} />
                      </View>
                    );
                  })}
                  
                </View>
            </ScrollView>
          </View>
        </View>
    );
  }
}

export default Timetable;
