import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Image, TouchableHighlight } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import { Card, Header } from 'react-native-elements';
import { getRadioPlaying } from "../DataRequests/RadioPlaying";
import AlbumArt from '../components/AlbumArt';
import TrackDetails  from '../components/TrackDetails';
import Controls  from '../components/Controls';

import { Video, Audio } from 'expo';
Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
});

const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';

let playbackInstance = null;

import CustomHeader from "../components/CustomHeader";

class StudentRadioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
        shouldPlay: false,
        isPlaying: false,
        isLoading: true,
        volume: 1.0,
        now: {}
    };
  }

  componentDidMount() {
    this._ismounted = true;
    this.setState({
      isPlaying: playbackInstance != null
    });
    
    this._loadNewPlaybackInstance(false);
    getRadioPlaying().then((now) => {
      //console.log(status);
      this.setState({
        now: now,
      });
    });
    
    this.timer = setInterval(() => {
      getRadioPlaying().then((now) => {
        //console.log(status);
        this.setState({
          now: now,
        });
      });
    }, 5000);
  }
  
  componentWillUnmount() {
    console.log(this.state);
    if (!this.state.isPlaying) {
      playbackInstance.unloadAsync().then(a => {
        playbackInstance.setOnPlaybackStatusUpdate(null);
        playbackInstance = null;
      }).catch(e => {
        console.log(e);
      });
    }
    /*playbackInstance.stopAsync().then(() => {
      console.log('******** sound unloaded ********');
    }).catch((e) => {
      console.log(e);
    });*/
    clearInterval(this.timer);
  }
  
  async _loadNewPlaybackInstance(playing) {
      if (playbackInstance == null) {
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
        playbackInstance = sound;
      }
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
		if (playbackInstance != null) {
			if (this.state.isPlaying) {
				//playbackInstance.pauseAsync();
                this._onStopPressed();
			} else {
				playbackInstance.playAsync().catch(e => {
                  console.log(e);
                });
			}
            this.setState({
				isPlaying: !this.state.isPlaying,
			});
		}
	};

    _onPlayPressed = () => {
		if (playbackInstance != null) {
			if (!this.state.isPlaying) {
              playbackInstance.playAsync().catch(e => {
                  console.log(e);
              });
			}
            this.setState({
				isPlaying: true,
			});
		}
	};
    
    _onPausePressed = () => {
		if (playbackInstance != null) {
			if (this.state.isPlaying) {
              this._onStopPressed();
			}
            this.setState({
				isPlaying: false,
			});
		}
	};

	_onStopPressed = () => {
		if (playbackInstance != null) {
			playbackInstance.stopAsync().catch(e => {
              console.log(e);
            });
		}
	};

	_onVolumeSliderValueChange = value => {
		if (playbackInstance != null) {
			playbackInstance.setVolumeAsync(value);
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
          <View style={styles.popup}>
            <View style={styles.column}>
              <AlbumArt url="http://www.csrfm.com/logo.png" />
              <TrackDetails title={this.state.now.Title}
                artist={this.state.now.Artist} />
              <Controls 
                  paused={!this.state.isPlaying}
                  onPressPlay={this._onPlayPressed}
                  onPressPause={this._onPausePressed}
                  />
            </View>            
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
  column: {
    flex: 1,
    flexDirection: 'column',
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

export default SessionScreen = connect(mapStateToProps, {})(StudentRadioPlayer);