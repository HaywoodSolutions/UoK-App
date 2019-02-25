import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";
import { Constants } from 'expo';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import MoodleView from "../../components/MoodleView";
import { getLectures } from "../../DataRequests/LectureRecordings";
import styles from "../../styles/main.style";

import { List, ListItem } from "react-native-elements";

const SecondRoute = () => (
  <View style={[style.scene, { backgroundColor: '#673ab7' }]} />
);

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
        index: 0,
        routes: [
          { key: 'first', title: 'Contacts' },
          { key: 'second', title: 'Lectures' },
        ],
      lectureData: [],
      loaded: false,
      sections: [],
      module: {
        contacts: [],
        assessments: [],
        lectureRecordingFeed: {
          mp4: null,
          mp3: null
        }
      }
    }
    this.onMessage = this.onMessage.bind(this);
  }
  
  _renderContactScene = () => {
    return (
      <View style={[style.scene]}>
        <View
          style={{
            marginBottom: 15
          }}
        >
          {Object.keys(this.state.moduleData.contacts).map((contactID) => {
            return (
              <ListItem
                key={contactID}
                roundAvatar
                title={`${this.state.moduleData.contacts[contactID].name} (${this.state.moduleData.contacts[contactID].role})`}
                subtitle={this.state.moduleData.contacts[contactID].email}
                avatar={{ uri: this.state.moduleData.contacts[contactID].imageURL }}
              />                       
            );
          })}
        </View>
      </View>
    );
  };

  _renderLectureScene = () => {
		let weekCount = 0;
		let lastWeekDate = 0;
		let noPerWeek = 0;
		let prevWeek;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[style.scene]}>
        <View style={{margin: 15}}>
          {Object.keys(this.state.lectureData).map((lectureID) => {
						function getParsedDate(date){
							date = String(date).split(' ');
							var days = String(date[0]).split('-');
							var hours = String(date[1]).split(':');
							return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
						}
						const date = getParsedDate(this.state.lectureData[lectureID].pubDate);
						let lectureNo = parseInt(lectureID) + 1;

    				const thisWeek = parseInt((new Date(this.state.lectureData[lectureID].pubDate).getTime() + 432000000)/604800000);

						const durationText = Number.parseInt(this.state.lectureData[lectureID].enclosure.duration/60)+":"+((this.state.lectureData[lectureID].enclosure.duration%60>9)?this.state.lectureData[lectureID].enclosure.duration%60:"0"+this.state.lectureData[lectureID].enclosure.duration%60);
						const minText = Number.parseInt(this.state.lectureData[lectureID].enclosure.duration/60) + " MIN";
						
            return (
							<TouchableWithoutFeedback
									onPress={() => {
										navigate('ViewLecture', {lectureData: this.state.lectureData[lectureID]})
									}}
									key={lectureID}
								>
									<View
										style={{
											flex: 1,
											backgroundColor: '#1D1C22',
											marginBottom: 11,
											borderRadius: 7.5
										}}
									>
										<View
											style={{
												flex: 1,
												margin: 15,
											}}
										>
											<Text style={{color: '#ffffff'}}>{"ad",this.state.lectureData[lectureID].title}</Text>
											<Text style={{color: '#ffffff'}}>{"Lecture " + lectureNo}</Text>
											<Text style={{color: '#ffffff'}}>{minText}</Text>
										</View> 
									</View>  
							</TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  onMessage(event) {
   const module = JSON.parse(event.nativeEvent.data);
    getLectures(module.lectureRecordingFeed).then((lectures) => {
      this.setState({
        loaded: true,
        moduleData: module,
        lectureData: lectures
      });
    });
  }
                                  
  render() {    
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }
    const navigation = this.props.navigation;
    
    var code = ``;
    return (
      <View style={[styles.background, {backgroundColor: '#fff'}]}>
        {
          (!this.state.loaded) ?
            (
              <MoodleView
                uri={'https://moodle.kent.ac.uk/2018/course/view.php?id=717'}
                insertJavaScript={code}
                onMessage={this.onMessage}
                hidden={false}
              />
            ) :
            (
              <View
                style={{
                  flex: 1,
                  position: 'relative',
                  backgroundColor: '#000'
                }}
              >
                <ScrollView
                  style={{
                    flex: 1,
                  position: 'relative',
                  }}
                >
                  
                  <Image 
                    source={require('../../../assets/LectureBackground.jpg')}
                    style={{
                    	position: 'absolute',
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').width
                    }}
                  />
                  <View
                    style={{
                     	flex: 1,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').width + 100,
                    	position: 'relative'
                    }}
                  >
                    <View
                        style={{
                          flex: 1,
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').width / 2,
                    			position: 'absolute',
													bottom: 0,
													padding: 15
                        }}
                      >
                        <Text style={{
                          color: '#fff',
													fontSize: 50,
													textAlign: 'center'
                        }}>CO510</Text>
												<Text style={{
                          color: '#fff',
													fontSize: 20,
													textAlign: 'center'
                        }}>An introduction to the intellectual enterprises of computer science and the art of programming.</Text>
                    </View>
                  </View>
                  <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                      first: this._renderContactScene,
                      second: this._renderLectureScene
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{
                      flex: 1,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height - Constants.statusBarHeight - 100
                    }}
                    renderTabBar={props =>
                      <TabBar
                        {...props}
                        style={{
                          backgroundColor: '#000'
                        }}
                        indicatorStyle={{
                          backgroundColor: '#DB1826'    
                        }}
                        pressColor={'#000'}
                      />
                    }
                    scrollEnabled={true}
                  />
              </ScrollView>
            </View>
          )
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  scene: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight - 100,
    backgroundColor: '#000000'
  }
});
const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(Course);