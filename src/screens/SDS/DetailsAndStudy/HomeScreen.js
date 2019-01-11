import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, FlatList } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../../lib/Constants";

class Lectures extends React.Component {
  constructor() {
    super();
    this.state = {
      icons: [
        {
          name: "My Attendance",
          page: "MyAttendance"
        },
        {
          name: "My Deadlines",
          page: "MyDeadlines"
        },
        {
          name: "My Details (Name, Faculty, Department etc)",
          page: "MyDetails"
        },
        {
          name: "My Letters",
          page: "MyLetters"
        },
        {
          name: "My Marks",
          page: "MyMarks"
        },
        {
          name: "My Modules - Details",
          page: "MyModules"
        },
        {
          name: "My Progress (Stage decision or award)",
          page: "MyProgress"
        },
        {
          name: "My Academic Adviser / Supervisor Notes",
          page: "MyAcademicAdviser"
        },
        {
          name: "My Transcript",
          page: "MyTranscript"
        },
        {
          name: "SMS Text Facility",
          page: "SMSTextFacility"
        },
      ]
    };
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
          <ScrollView style={styles.list}>
            <FlatList
                data={this.state.icons}
                renderItem={({ item }) =>   <Text key={item.name} style={styles.item} onPress={() => this.props.navigation.navigate(item.page)}>{item.name}</Text>}
                keyExtractor={item => item.name}
                refreshing={this.state.refreshing}
              />
              
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: THEME_COLOR
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
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
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      flex: 1
  },
  item: {
      backgroundColor: '#FFF',
      margin: 3,
      padding: 10,
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#ffffff',
      color: '#000000',
      overflow: 'hidden',
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

export default SessionScreen = connect(mapStateToProps, {})(Lectures);