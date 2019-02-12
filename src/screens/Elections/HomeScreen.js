import React from 'react';
import { WebView, View, StyleSheet, ScrollView, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

export default class TechSupportHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onMessage = this.onMessage.bind(this);
    this.state = {
      elections: [],
      loaded: false
    }
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url.indexOf('https://sso.id.kent.ac.uk') != -1) {
      this.WebView.stopLoading();
      this.props.navigation.navigate("SignIn");
    }
  }
  
  onMessage(event) {
    this.setState({
      elections: JSON.parse(event.nativeEvent.data),
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
  let list = [];
  $(".table.table-striped tbody tr").each(function(e,a) {
    $(a).find("td").each(function(c,b){
      switch(c) {
        case 0:
          list[e] = {
            name: $(b).text()
          };
          break;
        case 1:
          list[e].closeDate = $(b).text();
          break;
        case 2:
          list[e].id = $(b).find("a").attr("href").replace("/elections/nominate/","");
          break;
      }
    })
  })

  PostMessage(JSON.stringify(list));
})
    `;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <WebView
                  source={{uri: 'https://kentunion.co.uk/elections/list'}}
                  onNavigationStateChange={this.navigationStateChangedHandler}
                  scalesPageToFit={false}
                  injectedJavaScript={jsCode}
                  onMessage={this.onMessage}
                  javaScriptEnabled={true}
                  ref={c => {
                    this.WebView = c;
                  }}
                  style={{height: 0}}
                />
              ) :
              (
                <ScrollView style={{flex: 1}}>
                  <Image
                      source={require('../../../assets/electionsNominateCover.png')}
                      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width * 0.6 }}
                    />
                  <View
                    style={{
                      flex: 1,
                      padding: 15
                    }}
                  >
                  <View style={{
                    marginBottom: 15}}>
                    {Object.keys(this.state.elections).map((electionKey) => {
                      return (
                        <TouchableWithoutFeedback
                          key={electionKey}
                          onPress={() => {
                            this.props.navigation.navigate("Nomination", {noninationID: this.state.elections[electionKey].id})
                          }}
                        >
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
                              >{this.state.elections[electionKey].name}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{"Apply By: " + this.state.elections[electionKey].closeDate}</Text>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    }
                  )}
                  </View>
                </View>
              </ScrollView>
            )
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});