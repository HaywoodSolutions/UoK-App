import React from 'react';
import {WebView, View, Text, StyleSheet, Platform, ScrollView, Dimensions, AsyncStorage} from 'react-native';
import {connect} from "react-redux";
import { saveNote } from '../actions';
import {Button, Input} from '../components';
import Slideshow from "../components/Slideshow"
import {THEME_COLOR} from "../lib/Constants";
import { setTimetableURL } from '../DataRequests/SetTimetableURL';


class TimetableSettings extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
    
    this.onMessage = this.onMessage.bind(this);
  }
                                  
  onMessage(event) {
    this.setState({
      loaded: true
    });
    this.saveTimetableURL(event.nativeEvent.data);
  }

  
  saveTimetableURL(timetableURL) {
    setTimetableURL(timetableURL).then(() => {
      alert("Synced Timetable");
      this.props.navigation.goBack();
    }).catch((error) => {
      console.log("Failed to update " + error);
    });
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url == 'https://www.kent.ac.uk/student/my-study/') {
      console.log(url)
      this.WebView.injectJavaScript(`
$(function() {
let PostMessage = function(data) {
  if (document.hasOwnProperty('postMessage')) {
      document.postMessage(data, '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(data, '*');
    }
}
var elements = document.cookie.split('=');
var obligations= elements[1].split('%');
let timetableID = obligations[obligations.indexOf('22timetable') + 3].substring(2);
PostMessage(timetableID);
});
`)
    }
  }
/*const PostMessage = function(data) {
  if (document.hasOwnProperty('postMessage')) {
      document.postMessage(data, '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(data, '*');
    }
}
    $(function() { PostMessage($(".calendar-link").html()); });`);*/
  
                                  
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
    let code = `
$(".banner").hide() ;`;
    return (
      
        <View style={backgroundStyle}>
          <WebView
              source={{uri: "https://sso.id.kent.ac.uk/idp/module.php/core/loginuserpass.php?AuthState=https%3A%2F%2Fsso.id.kent.ac.uk%2Fidp%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fwww.kent.ac.uk%252Fstudent%252Fdashboard%252F_sp%252Fmodule.php%252Fsaml%252Fsp%252Fmetadata.php%252Fdefault-sp%26RelayState%3Dhttps%253A%252F%252Fwww.kent.ac.uk%252Fstudent%252Fmy-study%252Frelay%252F"}}
              scalesPageToFit={false}
              injectedJavaScript={code}
              onNavigationStateChange={this.navigationStateChangedHandler}
              javaScriptEnabled={true}
              style={{flex: 1, height: 400}}
              onMessage={this.onMessage}
              ref={c => {
                this.WebView = c;
              }}
            />
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
