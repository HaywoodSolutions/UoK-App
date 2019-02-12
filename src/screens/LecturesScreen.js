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
      messages: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    const messagesRef = firestore.collection('user').doc(uid).collection("notes");
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    messagesRef.get().then(querySnapshot => {
      let messages = [];
      querySnapshot.forEach(doc => {
        messages.push(doc.data());
      });
      this.setState({
        messages: ds.cloneWithRows(messages),
      });
    })
    .catch((error) => {
      this.setState({
        messages: ds.cloneWithRows(["failed"])
      });
    });
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
            {'Lectures'}
          </Text>
          <View  style={backgroundStyle}>
            <ScrollView style={styles.popup}>
              <ListView contentContainerStyle={styles.list}
                onLayout={this.onLayout}
                enableEmptySections={true}
                dataSource={this.state.messages}
                removeClippedSubviews={false}
                renderRow={(rowData) => <Text style={styles.item}>{rowData.note}</Text>}
              />
            </ScrollView>
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

export default SessionScreen = connect(mapStateToProps, {})(Lectures);