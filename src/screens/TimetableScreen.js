import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, SectionList, FlatList } from 'react-native';
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
      currentWeek: 0,
      selectedWeek: 0,
      weekNames: [],
      rawWeeks: {},
      selectedWeekName: "",
      refreshing: true
    };
  }
  
  nextWeek() {
    this.setState(
      {
        currentWeekData: [],
        refreshing: true
      },
      () => this.loadWeek(1)
    );
  }
  
  previousWeek() {
    this.setState(
      {
        currentWeekData: [],
        refreshing: true
      },
      () => this.loadWeek(-1)
    );
  }
  
  loadWeek(weekNo) {
    const newWeekNo= this.state.selectedWeek + weekNo;
    const weeksessions = this.state.weekNames[newWeekNo];
    this.setState({
      selectedWeek: newWeekNo,
      selectedWeekName: weeksessions
    });
    let that = this;
    setTimeout(function(){that.refreshWeek()}, 100);
  }
  
  refreshWeek() {    
    const data = (this.state.rawWeeks[this.state.selectedWeek]) ? this.state.rawWeeks[this.state.selectedWeek].sort(function(a, b){return b.key < a.key}) : [];
    
    this.setState({
      currentWeekData: data,
      refreshing: false
    });
    console.log(this.state.rawWeeks[this.state.selectedWeek]);
  }

  fetchTimeTable() {
     getTimeTable().then(timetable => {
          this.setState({
            rawWeeks: timetable.rawWeeks,
            weekNames: timetable.weekNames,
            currentWeek: timetable.currentWeek,
            selectedWeek: timetable.currentWeek
          }, () => this.loadWeek(0))
       })
      .catch(() => this.setState({ refreshing: false }));
  }
  
  componentDidMount() {
    this.setState({
      currentWeekData: [],
      refreshing: true
    });
    this.fetchTimeTable();
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

    return (
        <View style={backgroundStyle}>
          <View style={styles.popup}>
            <View style={styles.weekSelector}>
               <Button
                  title={loading ? '' : '<'}
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
                  title={loading ? '' : '>'}
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
                renderItem={({ item }) =>  <TimeTableSlot key={item.key} session={item} />}
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

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(Timetable);
