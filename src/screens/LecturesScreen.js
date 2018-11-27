import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';

class Lectures extends React.Component {
  constructor() {
    super();
    
   /* const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    const data = {
      note: note,
      uploadTime: firebase.firestore.FieldValue.serverTimestamp()
    };

    const userRef = firestore.collection('users').doc(uid);
    userRef.collection('notes').doc().set(data)
    .then((docRef) => {
      dispatch({
        type: SUBMIT_INFO_SUCCESS,
        payload : {
          note: '',
          loading: false
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: SUBMIT_INFO_FAIL,
        payload: {
          loading: false,
          error
        }
      });
    });*/
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