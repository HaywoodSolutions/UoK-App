import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Image, TouchableHighlight } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { Card, Header } from 'react-native-elements';
import { getRadioPlaying } from "../DataRequests/RadioPlaying";

import { Video, Audio } from 'expo';

const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';

import CustomHeader from "../components/CustomHeader";

class StudentRadio extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    
    this.playbackInstance = null;
    this.state = {
        shouldPlay: false,
        isPlaying: false,
        isLoading: true,
        volume: 1.0,
    };
  }

  componentDidMount() {
    this._ismounted = true;
    Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    this._loadNewPlaybackInstance(false);
    
    this.timer = setInterval(() => {
      getRadioPlaying().then((status) => {
        console.log(status);
        this.setState({
          now: status.now,
          current: status.current,
          next: status.next
        });
      });
      console.log('I do not leak!');
    }, 5000);
  }
  
  componentWillUnmount() {
    this.playbackInstance.stopAsync().then(() => {
      console.log('******** sound unloaded ********');
    }).catch((e) => {
      console.log(e);
    })
    clearInterval(this.timer); 
  }
  
  async _loadNewPlaybackInstance(playing) {
      if (this.playbackInstance != null) {
          await this.playbackInstance.unloadAsync();
          this.playbackInstance.setOnPlaybackStatusUpdate(null);
          this.playbackInstance = null;
      }

      const source = { uri: "http://stream.csrfm.com/stream.mp3" };
      const initialStatus = {
          shouldPlay: playing,
          rate: 1,
          volume: this.state.volume,
      };

      const { sound, status } = await Audio.Sound.create(
          source,
          initialStatus,
          () => {}
      );
      this.playbackInstance = sound;
      this._updateScreenForLoading(false);
  }
  
  _updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				isPlaying: false,
				isLoading: true,
			});
		} else {
			this.setState({
				isLoading: false,
			});
		}
	}
         
    _onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			this.setState({
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				volume: status.volume,
			});
			if (status.didJustFinish) {
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);
		this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				//this.playbackInstance.pauseAsync();
                this._onStopPressed();
			} else {
				this.playbackInstance.playAsync();
			}
            this.setState({
				isPlaying: !this.state.isPlaying,
			});
		}
	};

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
		}
	};

	_onVolumeSliderValueChange = value => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setVolumeAsync(value);
		}
	};


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
                  <TouchableHighlight
                      onPress={this._onPlayPausePressed}
                      disabled={this.state.isLoading}
                    >
                    {this.state.isPlaying ? (
                        <MaterialIcons
                            name="pause"
                            size={75}
                            color="#fff"
                        />
                    ) : (
                        <MaterialIcons
                            name="play-arrow"
                            size={75}
                            color="#fff"
                        />
                    )}

		          </TouchableHighlight>
                </View>
              </View>
            </View>
            
          </ScrollView>
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
    backgroundColor: '#CB2228'
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
    alignItems:"center"
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