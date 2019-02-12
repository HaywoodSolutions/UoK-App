import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progress: {},
      loaded: false
    }
    
    this.onMessage = this.onMessage.bind(this)
  }
  
  onMessage(event) {
    this.setState({
      progress: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }

  render() {
    const { backgroundStyle } = styles;
    
        let code = `
progressObj = [];
$("#studentpage table.student tr.whitebg").each(function(i, val) {
  let children = $(this).find("td p");
  progressObj.push({
    programOfStudy: $(children[0]).html().replace("&nbsp;","").trim(),
    session: $(children[1]).html().replace("&nbsp;","").trim(),
    month: $(children[2]).html().replace("&nbsp;","").trim(),
    result: $(children[3]).html().replace("&nbsp;","").trim(),
    restultDate:  $(children[4]).html().replace("&nbsp;","").trim()
  });
})
PostMessage(JSON.stringify(progressObj));`;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                    uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws6r4'}
                    insertJavaScript={code}
                    navigate={this.props.navigation.push}
                    onMessage={this.onMessage}
                    hidden={true}
                  />
              ) :
              (
                <ScrollView
                  style={{
                    flex: 1,
                    padding: 15
                  }}
                >
                  <View style={{
                    marginBottom: 15}}>
                    {Object.keys(this.state.progress).map((progressID) => {
                     return (
                       <View
                         key={progressID}
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
                            >{"Program Of Study: " + this.state.progress[progressID].programOfStudy}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Session: " + this.state.progress[progressID].session}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Month: " + this.state.progress[progressID].month}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Result: " + this.state.progress[progressID].result}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Result Date: " + this.state.progress[progressID].restultDate}</Text>
                          </View>
                        </View>
                      );
                    })}
                  
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
    backgroundColor: '#fff'
  },
});