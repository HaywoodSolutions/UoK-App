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
      email,
      password,
      navigation
    } = this.props;

    if(error){
      alert(error);
    }

    return (
      
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <View style={styles.blackBackground}>
            <View style={{
              alignItems: 'stretch',
              flex: 1
            }}>
              <Image
                resizeMode="cover"
                source={{uri: 'https://www.kent.ac.uk/qstep/images/Kent%20in%20the%20summer.jpg'}}
                style={styles.bgVideo}
              />
            </View>
            <View style={{
              alignItems: 'stretch',
              flex: 1,
              padding: 15,
              paddingBottom: 20,
              backgroundColor: '#fff'
            }}>
              <Text
                style={styles.title}>
                Email
              </Text>
              <Input
                  placeholder='ab123@kent.ac.uk'
                  style={styles.input}
                  value={email}
                  onChangeText={(email) => {this.props.emailChanged(email)}}
                  onFocus={this.setFocus.bind(this, true)}
                  onBlur={this.setFocus.bind(this, false)}
                  keyboardType={"email-address"}
              />
              <Text style={styles.title}>
                Password
              </Text>
              <Input
                  placeholder='password'
                  style={styles.input}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(password) => this.props.passwordChanged(password)}
                  onFocus={this.setFocus.bind(this, true)}
                  onBlur={this.setFocus.bind(this, false)}
              />
              <Button
                  title={loading ? '' : 'Sign In'}
                  style={{
                    height: 60,
                    marginBottom: 10
                  }}
                  textStyle={{
                    fontSize: 20,
                    color: THEME_COLOR
                  }}
                  buttonStyle={{
                    backgroundColor: '#fff'
                  }}
                  loadingColor={THEME_COLOR}
                  onPress={() => { this.props.authUser(email, password, navigation) }}
                  loading={loading}/>
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
