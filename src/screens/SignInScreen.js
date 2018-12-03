import React from 'react';
import {View, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from '../components';
import {authUser, emailChanged, passwordChanged} from '../actions';
import {THEME_COLOR} from "../lib/Constants";
import { Video } from 'expo';

class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
    header: null
  };

  render() {

    const { backgroundStyle, inputStyle, labelStyle } = styles;

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
        <View style={backgroundStyle}>
          <Video
            source={require('../../videos/bg.mp4')}
            resizeMode="cover"
            shouldPlay
            isMuted={true}
            shouldPlay
            isLooping    
            style={styles.video}
          />
          <SafeAreaView   style={styles.content}>
            <Text
                style={{
                  fontWeight: '600',
                  fontSize: 30,
                  alignSelf: 'center',
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: 10
                }}
            >
              {'KentFlix'}
            </Text>
            <Text
              style={labelStyle}>
              Email
            </Text>
            <Input
                placeholder='ab123@kent.ac.uk'
                style={inputStyle}
                value={email}
                onChangeText={(email) => this.props.emailChanged(email)}
            />
            <Text style={labelStyle}>
              Password
            </Text>
            <Input
                placeholder='password'
                style={inputStyle}
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => this.props.passwordChanged(password)}
            />
            <Button
                title={loading ? '' : 'Sign In'}
                style={{
                  height: 60,
                  margin: 10,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                textStyle={{
                  fontSize: 20,
                  color: THEME_COLOR
                }}
                buttonStyle={{
                  backgroundColor: '#fff'
                }}
                loadingColor={THEME_COLOR}
                onPress={() => this.props.authUser(email, password, navigation)}
                loading={loading}/>
          </SafeAreaView >
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
        paddingTop:10
      }
    })
  },
  content: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'stretch',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  inputStyle: {
    backgroundColor: '#fff',
    padding: 5,
    height: 50,
    margin: 10
  },
  labelStyle: {
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'flex-start',
    color: 'white',
    paddingLeft: 10
  }
});

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
