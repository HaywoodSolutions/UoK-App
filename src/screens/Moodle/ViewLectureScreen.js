import React from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import {connect} from "react-redux";
import { Constants, Video, ScreenOrientation } from 'expo';
import styles from "../../styles/main.style";
import VideoPlayer from 'react-native-video-controls';

class ViewLecture extends React.Component {
 constructor(props) {
    super(props);
    
    this.state = {
      lectureData: this.props.navigation.getParam('lectureData', {})
    };
	}
	
	componentWillMount() {
		ScreenOrientation.allow(ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
	}
	
	componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
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
		console.log(this.state.lectureData);
    
    var code = ``;
    return (
      <View style={[styles.background, {backgroundColor: '#000'}]}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: this.state.lectureData.link ? this.state.lectureData.link + "?mediaTargetType=videoPodcast" : "",
            },
            style: {
              flex: 1
            }
          }}
          playFromPositionMillis={0}
        />
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

export default SessionScreen = connect(mapStateToProps, {})(ViewLecture);