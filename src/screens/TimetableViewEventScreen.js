import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, Dimensions } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { getInquireFeed } from "../DataRequests/Inquire";

const ITEMS_PER_PAGE = 10;

class TimetableViewEvent extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.eventData = navigation.getParam('event', {});
    console.log( this.eventData);
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
              <Text style={styles.title}>{this.eventData.title}</Text>
              <Text style={styles.authors}>{this.eventData.location}</Text>
              <View style={styles.articleContent}>{this.eventData.startDate}</View>
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

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(TimetableViewEvent);