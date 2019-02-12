import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {updateNote, saveNote} from '../actions';
import {Button, Input} from '../components';
import {THEME_COLOR} from "../lib/Constants";

class TimetableSettings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timetableURL: ""
      };
    }
  
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<Entypo name="video" size={32} color={tintColor}/>)
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
          <ScrollView style={styles.popup}>
            <Input
              placeholder='Enter your iCal URL'
              style={noteStyle}
              numberOfLines={5}
              value={this.state.timetableURL}
              onChangeText={(value) => this.setState({
                timetableURL: value
              })}
            />
            <Button
                title={loading ? '' : 'Update iCal'}
                style={{
                  height: 60,
                  margin: 10,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                textStyle={{
                  fontSize: 20,
                  color: '#fff'
                }}
                buttonStyle={{
                  backgroundColor: THEME_COLOR
                }}
                disabled={loading}
                loadingColor={THEME_COLOR}
                onPress={() => this.props.saveNote(note)}
                loading={loading}
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
  popup: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: "#ffffff",
      flex: 1
  },
  noteStyle: {
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default TimetableSettings
