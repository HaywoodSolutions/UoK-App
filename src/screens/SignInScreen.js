import React from 'react';
import {View, Text, Platform, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from '../components';
import {authUser, emailChanged, passwordChanged} from '../actions';
import {THEME_COLOR} from "../lib/Constants";
import { Video } from 'expo';

import styles from "../styles/main.style";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false
    };
  }
  
  static navigationOptions = {
    title: 'Sign In',
    header: null
  };

  setFocus (hasFocus) {
    this.setState({hasFocus});
  }

  getStyle() {
    return {
      position: 'absolute',
      flex: 1,
      height: Dimensions.get('window').height,
      paddingTop: (!this.state.hasFocus ? (Dimensions.get('window').height / 2) : 0),
      width: Dimensions.get('window').width,
      backgroundColor: 'red'
    };
  }

  render() {

    const {
      loading,
      error,
      navigation
    } = this.props;

    if(error){
      alert(error);
    }

    return (
      <KeyboardAvoidingView style={[styles.screen, styles.background, {backgroundColor: '#000'}]} behavior="padding" enabled>
        <View style={[styles.popup, {position: 'relative', justifyContent: 'space-between', padding: 15}]}> 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={[styles.title, styles.h2, styles.mb2]}>
              {"Welcome to Kentflix!"}
            </Text>
            <Text
              style={[styles.subtitle, styles.h3, styles.mb4]}>
              {"Sign in to continue"}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={[styles.title, styles.h4, styles.mb1]}>
              Email
            </Text>
            <Input
                placeholder='ab123@kent.ac.uk'
                style={[styles.input, styles.mb1]}
                onChangeText={(email) => {this.props.emailChanged(email)}}
                onFocus={this.setFocus.bind(this, true)}
                onBlur={this.setFocus.bind(this, false)}
                keyboardType={"email-address"}
            />
            <Text style={[styles.title, styles.h4, styles.mb1]}>
              {"Password (Different to Kent Password)"}
            </Text>
            <Input
                placeholder='password'
                style={[styles.input, styles.mb1]}
                secureTextEntry={true}
                onChangeText={(password) => this.props.passwordChanged(password)}
                onFocus={this.setFocus.bind(this, true)}
                onBlur={this.setFocus.bind(this, false)}
            />
            <Text style={[styles.title, styles.h4, styles.textRight, styles.mb4]}>{'Forgot Password?'}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              title={loading ? '' : 'Sign In'}
              style={{
                height: 60,
                marginBottom: 10
              }}
              textStyle={{
                fontSize: 20,
                color: '#fff'
              }}
              buttonStyle={{
                backgroundColor: '#5F9EFC'
              }}
              loadingColor={THEME_COLOR}
              onPress={() => { this.props.authUser(this.props.email, this.props.password, navigation) }}
              loading={loading} />
          </View>
        </View>
      </KeyboardAvoidingView >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Auth.loading,
    error: state.Auth.error,
    password: state.Auth.password,
    user: state.Auth.user,
    email: state.Auth.email
  };
};

export default SignInScreen = connect(mapStateToProps, { authUser, emailChanged, passwordChanged })(SignIn);
