import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Image } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { Card, Header } from 'react-native-elements';

import CustomHeader from "../components/CustomHeader";

class StudentRadio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
         
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<MaterialIcons name="speaker" size={32} color={tintColor}/>)
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
                paddingTop: 0
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
            {'Student Radio'}
          </Text>
          <View style={backgroundStyle}>
            <ScrollView style={styles.popup}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Image style={styles.radioIcon} source={{uri: 'https://i3.radionomy.com/radios/400/2e487e3e-1d7b-4677-a6f9-f31e80d4ae01.png'}}/>
                  <Text style={styles.textStyle}> {"CANTERBURY'S COMMUNITY & STUDENT RADIO"} </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.radioPlayWrapper}>
                  <View style={styles.iconWrapper}>
                    <FontAwesome name="play" size={75} color={'#fff'}/>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
    );
  }
}

//http://www.csrfm.com/live/api/now/index.php
//http://www.csrfm.com/live/api/previous/index.php
//http://www.csrfm.com/live/api/next/index.php

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#CB2228',
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
  textStyle: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    color: '#fff',
    margin: 5
  },
  scrollStyle: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  iconWrapper: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    marginLeft: 15
  },
  radioIcon: {
    flex: 1,
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 10,
    marginLeft: 0
  },
  radioPlayWrapper: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderWidth: 25,
    borderColor: '#CB2228',
    borderStyle: 'solid',
    marginTop: 10,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  playIcon: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center'
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
      backgroundColor: "#242424",
      flex: 1
  },
  item: {
      margin: 3,
      padding: 10,
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: THEME_COLOR,
      color: '#fff',
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

export default SessionScreen = connect(mapStateToProps, {})(StudentRadio);