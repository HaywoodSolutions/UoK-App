import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';

class Lectures extends React.Component {
  constructor() {
    super();
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      messages: ds.cloneWithRows([
        {name: 'LectureView',
         page: 'Lectures'},
        {name: 'Timetable',
         page: 'Timetable'}]),
    };
  }
  
  static navigationOptions = {
    title: 'KentFlix',
    headerStyle: {
      backgroundColor: THEME_COLOR,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30
    },
  };
                                  
  render() {
    const { backgroundStyle, noteStyle } = styles;
    const {
      loading,
      error,
      note
    } = this.props;

    return (
        <View style={backgroundStyle}>
          <Text
              style={{
                fontWeight: '600',
                fontSize: 30,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 10
              }}
          >
            {'KentFlix'}
          </Text>
          <ScrollView>
            <ListView contentContainerStyle={styles.list}
              onLayout={this.onLayout}
              enableEmptySections={true}
              dataSource={this.state.messages}
              renderRow={(rowData) => <Text style={styles.item} onPress={() => this.props.navigation.navigate(rowData.page)}>{rowData.name}</Text>}
            />
          </ScrollView>
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
      marginTop: 25,
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