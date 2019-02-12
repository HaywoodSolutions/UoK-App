import React from 'react';
import { WebView, View, StyleSheet, ScrollView, Text, Image, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

export default class NominationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onMessage = this.onMessage.bind(this);
    const { navigation } = this.props;

    this.state = {
      noninationID: navigation.getParam('noninationID', ''),
      nominationData: {},
      loaded: false
    }
  }
  
  onMessage(event) {
    this.setState({
      nomination: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }


  render() {
    const { backgroundStyle } = styles;
    
    let jsCode = `
$(function() {
  const PostMessage = function(data) {
    if (document.hasOwnProperty('postMessage')) {
        document.postMessage(data, '*');
      } else if (window.hasOwnProperty('postMessage')) {
        window.postMessage(data, '*');
      }
  };
})

const listing = {
  description: $(".container.main-content .row .col-md-8").first().contents().filter(function() {
    return this.nodeType == 3;
  }).text().trim(),
  title: $(".container.main-content .row .col-md-8 h2").html().replace(/<[^>]*>/g, "").trim(),
}

postMessage(JSON.stringify(listing));
    `;
    
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <WebView
                  source={{uri: 'https://kentunion.co.uk/elections/nominate/'+this.state.noninationID}}
                  onNavigationStateChange={this.navigationStateChangedHandler}
                  scalesPageToFit={false}
                  injectedJavaScript={jsCode}
                  onMessage={this.onMessage}
                  javaScriptEnabled={true}
                  ref={c => {
                    this.WebView = c;
                  }}
                />
              ) :
              (
                <ScrollView style={{flex: 1}}>
                  <Image
                      source={require('../../../assets/electionsNominateCover.png')}
                      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width * 0.6 }}
                    />

                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View
                  style={{
                    flex: 1,
                    padding: 15,
                   backgroundColor: 'white'
                  }}
                >
                  <View style={{
                    marginBottom: 15}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgb(240,244,247)',
                        borderRadius: 15,
                        overflow: 'hidden',
                        minHeight:20,
                        marginBottom: 15
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          padding: 15,
                          minHeight:20
                        }}
                      >
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{this.state.nomination.title}</Text>
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{this.state.nomination.description}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{
                    marginBottom: 15}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgb(240,244,247)',
                        borderRadius: 15,
                        overflow: 'hidden',
                        minHeight:20,
                        marginBottom: 15
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          padding: 15,
                          minHeight:20
                        }}
                      >
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{"Your Reason for Standing (Manifesto)"}</Text>
                        <TextInput
                          editable = {true}
                          maxLength = {15000}
                          multiline = {true}
                          numberOfLines = {5}
                          onChangeText={(manifesto) => this.setState({manifesto})}
                          value={this.state.manifesto}
                          style={{maxHeight: 200}}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{
                    marginBottom: 15}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgb(240,244,247)',
                        borderRadius: 15,
                        overflow: 'hidden',
                        minHeight:20,
                        marginBottom: 15
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          padding: 15,
                          minHeight:20
                        }}
                      >
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{"Photo"}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{
                    marginBottom: 15}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'rgb(240,244,247)',
                        borderRadius: 15,
                        overflow: 'hidden',
                        minHeight:20,
                        marginBottom: 15
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          padding: 15,
                          minHeight:20
                        }}
                      >
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{"Please provide the student IDs of the two students who support your nomination."}</Text>
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{"Proposer #1"}</Text>
                        <TextInput
                          editable = {true}
                          maxLength = {8}
                          onChangeText={(proposer1) => this.setState({proposer1})}
                          value={this.state.proposer1}
                          keyboardType='numeric'
                        />
                        <Text
                          style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                          }}
                        >{"Proposer #2"}</Text>
                        <TextInput
                          editable = {true}
                          maxLength = {8}
                          onChangeText={(proposer2) => this.setState({proposer2})}
                          value={this.state.proposer2}
                          keyboardType='numeric'
                        />
                      </View>
                    </View>
                  </View>
                </View>
                  </TouchableWithoutFeedback>
              </ScrollView>
            )
          }
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});