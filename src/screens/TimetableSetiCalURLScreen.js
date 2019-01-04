import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Dimensions, AsyncStorage} from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import { saveNote } from '../actions';
import {Button, Input} from '../components';
import Slideshow from "../components/Slideshow"
import {THEME_COLOR} from "../lib/Constants";
import { setTimetableURL } from '../DataRequests/SetTimetableURL';


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
  
  saveTimetableURL() {
    setTimetableURL(this.state.timetableURL).then(() => {
      alert("Updated timetable id");
      this.props.navigation.goBack();
    }).catch((error) => {
      alert("Failed to update " + error);
    });
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

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').width * 1.243;

    return (
        <View style={backgroundStyle}>
          <ScrollView style={styles.popup}>
            <Input
              placeholder='Enter your iCal Code'
              style={noteStyle}
              value={this.state.timetableURL}
              onChangeText={(value) => this.setState({
                timetableURL: value
              })}
            />
            <Button
                title={loading ? '' : 'Save your Timetable iCal'}
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
                onPress={() => this.saveTimetableURL(note)}
                loading={loading}
            />
            <Text
                style={{
                  fontSize: 16
                }}
            >
              {'Where do I find it?'}
            </Text>
            <Slideshow style={{marginBottom: 10, marginTop: 10}}
                  width={Width}
                  height={Height}
                  containerStyle={{
                    width: Width,
                    height: Height
                   }}
                  indicatorSelectedColor={THEME_COLOR}
                  dataSource={[
                    { image: require("../img/iCal-Step1.png"),
                      title: 'Step 1: Go you your timetabling page'},
                    { image: require("../img/iCal-Step2.png"),
                      title: 'Step 2: Open settings'},
                    { image: require("../img/iCal-Step3.png"),
                      title: 'Step 3: Copy the Calendar feed URL'}
                  ]}
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
