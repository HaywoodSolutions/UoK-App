import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';
import {Button, TimeTableSlot} from '../components';

class Timetable extends React.Component {
  constructor() {
    super();
    this.getWeekNo = function (d2) {
      var t2 = d2.getTime();
      var t1 = new Date("Mon Dec 29 1969 00:00:00").getTime();
      return parseInt((t2-t1)/(24*3600*1000*7) - (4/7));
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    fetch('https://www.kent.ac.uk/student/my-study/app/data/weekDates.json')
      .then((response) => {
         return response.json();
      }).then((weeks) => {
        weeks = weeks.response;
        weeks = weeks.weekDates;
        weeks = weeks.week;
        var weekObj = [];
        for (var weekID in weeks) {
          var week = weeks[weekID];
          var weekNo = this.getWeekNo(new Date(week.week_beginning_date));
          weekObj[weekNo] = week.week_beginning;
        }
        return this.setState({
          currentWeek: this.getWeekNo(new Date()),
          weeks: weekObj
        });
      }).then(() => {

        fetch('https://www.kent.ac.uk/timetabling/ical/139463.ics')
          .then((response) => {
             return response.text();
          }).then((response) => {
              var lines = response.split("\n");
              var events = {}
              var events_i = 0;
              for (i = 0; i < lines.length; i++) {
                if (lines[i].includes('DTSTART')) {
                  var date = lines[i].split(":");
                  var dateObj = new Date();
                  dateObj.setFullYear(date[1].substr(0,4));
                  dateObj.setMonth(date[1].substr(4,2));
                  dateObj.setDate(date[1].substr(6,2));
                  dateObj.setHours(parseInt(date[1].substr(9,2)));
                  events[events_i] = {
                    weekNo: this.getWeekNo(dateObj),
                    day: dateObj.getDay(),
                    hour: dateObj.getHours(),
                  };
                } else if (lines[i].includes('DTEND')) {
                  var date = lines[i].split(":");
                  var dateObj = new Date();
                  dateObj.setHours(parseInt(date[1].substr(9,2)));
                  events[events_i]["ends"] = dateObj.getHours();
                } else if (lines[i].includes('SUMMARY')) {
                  var title = lines[i].split(":");
                  events[events_i]["title"] = title[1];
                } else if (lines[i].includes('LOCATION')) {
                  var location = lines[i].split(":");
                  events[events_i]["location"] = location[1];
                } else if (lines[i].includes('END:VEVENT')) {
                  events_i++;
                }
              }
              return events;
            }
          ).then((events) => {
              const thisWeek = this.getWeekNo(new Date());
              let events2 = [];
          
              const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              for (let i in events) {
                if (events[i].weekNo == thisWeek) {
                  events2[i] = events[i];
                  events2[i].day = days[events2[i].day];
                }
              }
              const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              return this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(events2)
              });
            }
          )
          .catch((error) => {
            alert(error);
          });
      });
  }
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<Entypo name="calendar" size={32} color={tintColor}/>)
  };
                                  
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
          <Text
              style={{
                fontWeight: '600',
                fontSize: 20,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 10
              }}
          >
            {'KentFlix'}
          </Text>
          <Text
              style={{
                fontWeight: '600',
                fontSize: 10,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 0
              }}
          >
            {'Timetable'}
          </Text>
          <View  style={backgroundStyle}>
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
                    {'Week W1'}
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
                    loading={loading}/>
              </View>
              <ScrollView>
                <ListView contentContainerStyle={styles.list}
                  onLayout={this.onLayout}
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
                  removeClippedSubviews={false}
                  renderRow={(item) => <TimeTableSlot
                                          title={item.title}
                                          starts={item.hour}
                                          ends={item.ends}
                                          location={item.location}
                                        />}
                />
              </ScrollView>
            </View>
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

export default SessionScreen = connect(mapStateToProps, {})(Timetable);