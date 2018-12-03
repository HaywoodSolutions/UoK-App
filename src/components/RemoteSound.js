import React, { Component } from 'react'
import { Button } from 'react-native'
import Sound from 'react-native-sound'

class RemoteSound extends Component {
  constructor(props) {
    super(props);
    this.error = false;
    this.track = new Sound(this.props.AudioURL, null, (e) => {
      if (e) {
        console.log('error loading track:', e);
        this.error = true;
      }
    });
  }
  
  play() {
    if (!this.error)
        this.track.play();
  }

  pause() {
    if (!this.error)
        this.track.pause();
  }
  
  setVolume(vol) {
    if (!this.error)
        this.track.setVolume(val);
  }
  
  release() {
    this.track.release();
  }

  render() {
    return <Button title="play me" onPress={this.playTrack} />
  }
}

export default RemoteSound