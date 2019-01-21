import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      deadlines: {},
      loaded: false
    }
    
    this.onMessage = this.onMessage.bind(this)
  }
  
  onMessage(event) {
    this.setState({
      deadlines: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }

  render() {
    const { backgroundStyle } = styles;
    
        let code = `
let trim = function(str) {
  return str.trim().replace("<strong>", "").replace("</strong>", ""); //.replace(/(<[a-zA-Z]+>|<\/[a-zA-Z]+>)/g, '').trim();
}

    let deadlinesObj = [];
    $("#studentpage table.student tr.studentgreyout, #studentpage table.student tr.white").each(function(i, val) {
      let children = $(val).find("td.ruled p");
      deadlinesObj.push({
        code: trim($(children[0]).html()),
        moduleTitle: trim($(children[1]).html()),
        assessmentTitle: trim($(children[2]).html()),
        dueDate: trim($(children[3]).html()),
        collectionType: trim($(children[4]).html()),
        dateSet: trim($(children[5]).html()),
        setBy: trim($(children[6]).html())
      })
    })
PostMessage(JSON.stringify(deadlinesObj));`;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                    uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws5r13eg'}
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
                  {Object.keys(this.state.deadlines).map((deadlineKey) => {
                   return (
                     <View
                         key={deadlineKey}
                      style={{
                          flex: 1,
                          minHeight:20,
                      }}
                     >
                      <Text
                        style={{
                          color: '#040404',
                          fontWeight: '600',
                          marginBottom: 10
                        }}
                      >{this.state.deadlines[deadlineKey].dueDate}</Text>
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
                            >{this.state.deadlines[deadlineKey].code, this.state.deadlines[deadlineKey].moduleTitle}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{this.state.deadlines[deadlineKey].assessmentTitle}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Due:",this.state.deadlines[deadlineKey].collectionType}</Text>
                          </View>
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