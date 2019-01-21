import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, Image, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import firebase from 'firebase';

import SDSWebView from "../components/SDSWebView";

class Lectures extends React.Component {
  constructor() {
    super();
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modules: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    const modulesRef = firestore.collection('modules');
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    modulesRef.get().then(querySnapshot => {
      let modules = [];
      querySnapshot.forEach(doc => {
        modules.push(doc.data());
      });
      this.setState({
        modules: ds.cloneWithRows(modules),
      });
    })
    .catch((error) => {
      this.setState({
        modules: ds.cloneWithRows(["failed"])
      });
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
    const navigation = this.props.navigation;
    
    var code = `

document.onload = function() {
  $("[target='_blank']").hide();
};

/* Get Categorys */

var coursesObj = [];
$(".kcolist .category:has(.title-item a)").each((i,elm) => {
  let title = $(elm).find(".title-item a").toArray();
  for (var i in title) {
    title[i] = $(title[i]).html().trim();
  }

  let courses = $(elm).find(".kcolist1 .course").toArray();
  for (var i in courses) {
    courses[i] = {
      title: $(courses[i]).find(".title a").attr("title"),
      description: $(courses[i]).find(".course_description").html().replace('&nbsp;', '').trim()
    };
  };
  
  let obj = {
    title: title,
    courses: courses
  }
  coursesObj.push(obj);
});
console.log(coursesObj);

`;
    return (
        <View style={backgroundStyle}>
          <ScrollView>
             <SDSWebView
                  uri={'https://moodle.kent.ac.uk/2018/my/'}
                  insertJavaScript={code}
                  onMessage={this.onMessage}
                  hidden={false}
                />
            <ListView contentContainerStyle={styles.list}
              onLayout={this.onLayout}
              enableEmptySections={true}
              dataSource={this.state.modules}
              removeClippedSubviews={false}
              renderRow={(rowData) => <TouchableOpacity
                        onPress={() => {
                          navigation.push('ViewModule', {
                            moduleID: rowData.moduleID
                          });
                        }}
                         key={rowData.moduleID} 
                      ><View style={styles.card}><Image
                source={{
                  uri: rowData.coverURL
                }}
                style={{
                  width: Dimensions.get('window').width - 25,
                  height: Dimensions.get('window').width / 1.9,
                  resizeMode: 'cover'
                }}/>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{rowData.moduleID + ": " + rowData.name}</Text>
                  <Text style={styles.cardDesc}>{rowData.description}</Text>
                </View>
              </View></TouchableOpacity>}
            />
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
      marginTop: 75,
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
  cardTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 19,
    marginTop: 5,
    marginBottom: 10
  },
  cardDesc: {
    flex: 1,
    color: '#A5A5A5',
    fontSize: 15
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