import React from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import {connect} from "react-redux";
import {Button, Input} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../../styles/main.style";

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        refreshing: true,
        meetingName: '',
        date: '',
        time: '',
        people: [],
        notifyPeople: true
    };
  }
                         
  render() {
    const { backgroundStyle } = styles;
    const {
      error
    } = this.props;

    if (error) {
      alert(error);
    }

    return (
      <View style={[backgroundStyle,{padding: 15}]}>
        <KeyboardAwareScrollView>
          <View style={{flex: 1}}>
            <Text style={[styles.h2, styles.mb3, {textAlign: 'center'}]}>Schedule Meeting</Text>
            <Text style={[styles.h4, styles.mb1]}>Name</Text>
            <Input
              placeholder='Groupwork Meeting'
              style={[styles.input, styles.mb2]}
              onChangeText={(meetingName) =>  this.setState({meetingName})}
            />
            <Text style={[styles.h4, styles.mb1]}>When</Text>
            <Input
              placeholder='dfgh'
              style={[styles.input, styles.mb2]}
              onChangeText={(date) =>  this.setState({date})}
            />
            <Text style={[styles.h4, styles.mb1]}>Time</Text>
            <Input
              placeholder='dfgh'
              style={[styles.input, styles.mb2]}
              onChangeText={(time) =>  this.setState({time})}
            />
            <Text style={[styles.h4, styles.mb1]}>People to invite</Text>
            <Input
              placeholder='dfgh'
              style={[styles.input, styles.mb2]}
              onChangeText={(people) =>  this.setState({people})}
            />
            <Text style={[styles.h4, styles.mb1]}>Notify people of this meeting?</Text>
            <Input
              placeholder='dfgh'
              style={[styles.input, styles.mb2]}
              onChangeText={(notifyPeople) =>  this.setState({notifyPeople})}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(NewsFeed);