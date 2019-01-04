import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, Image, Dimensions } from 'react-native';
import { Button } from '../components';
import { connect } from "react-redux";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { THEME_COLOR } from "../lib/Constants";
import firebase from 'firebase';

class Lectures extends React.Component {
  constructor() {
    super();
    
    this.state = {
      module: {}
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    const moduleRef = firestore.collection('modules').doc("CO510");
    
    moduleRef.get().then(doc => {
      this.setState({
        module: doc.data()
      });
    })
    .catch((error) => {});
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
      
          <ScrollView style={{
              flex: 1
            }}>
            <Image
              source={{
                uri: this.state.module.coverURL
              }}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width / 1.4,
                resizeMode: 'cover',
                  position: 'absolute'
              }}/>
            <View style={{
                flex: 1,
                marginTop: Dimensions.get('window').width / 1.4 + 20 }}>
                <Text style={styles.modalTitle}>{this.state.module.moduleID}</Text>
                <Text style={styles.modalSubTitle}>{this.state.module.name}</Text>
                
                <Button
                  title={'Watch Latest Lecture'}
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
                    backgroundColor: '#DB1828'
                  }}
                  disabled={false}
                  loadingColor={'#DB1828'}
                  onPress={() => {}}
                  loading={false}
              />
            </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#09000A',
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
  card: {
    margin: 3,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#232325',
    marginBottom: 10
  },
  cardBody: {
    margin: 15,
    marginBottom: 20,
    flex: 1,
    overflow: 'hidden',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 35,
    marginTop: 5,
    marginBottom: 10
  },
  modalSubTitle: {
    flex: 1,
    color: '#A5A5A5',
    textAlign: 'center',
    fontSize: 26,
    marginBottom: 20
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