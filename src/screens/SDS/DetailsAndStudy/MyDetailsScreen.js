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
      detailsObj: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }

  render() {
    const { backgroundStyle } = styles;
    
        let code = `
let trim = function(str) {
  return str.trim().replace("<strong>", "").replace("</strong>", "").replace("<br>", ""); //.replace(/(<[a-zA-Z]+>|<\/[a-zA-Z]+>)/g, '').trim();
}

let children = $("#studentpage table.student tr.whitebg td p, #studentpage table.student tr td p.black80");
let detailsObj = {
  name: trim($(children[0]).html()),
  login: trim($(children[1]).html()),
  faculty: trim($(children[2]).html()),
  school: trim($(children[3]).html()),
  programOfStudy: trim($(children[4]).html()),
  campus: trim($(children[5]).html()),
  stage: trim($(children[6]).html()),
  registrationStatus: trim($(children[7]).html()),
  studyMode: trim($(children[8]).html()),
  studyLevel: trim($(children[9]).html()),
  academicAdviser: trim($(children[10]).html())
};
PostMessage(JSON.stringify(detailsObj));`;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                    uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws6r1'}
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
                            >{"Name: "+ this.state.detailsObj.name}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Login: "+ this.state.detailsObj.login}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Faculty: "+ this.state.detailsObj.faculty}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"School: "+ this.state.detailsObj.school}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Programme of Study: "+ this.state.detailsObj.programOfStudy}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Campus: "+ this.state.detailsObj.campus}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Stage: "+ this.state.detailsObj.stage}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Registration Status: "+ this.state.detailsObj.registrationStatus}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Study Mode: "+ ((this.state.detailsObj.studyMode == "FT") ? "Full Time" : ((this.state.detailsObj.studyMode == "PT") ? "Part Time" : this.state.detailsObj.studyMode))}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Study level: "+ this.state.detailsObj.studyLevel}</Text>
                            <Text
                              style={{
                                color: '#040404',
                                fontWeight: '600',
                                fontSize: 14
                              }}
                            >{"Academic Adviser: "+ this.state.detailsObj.academicAdviser}</Text>
                          </View>
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
    backgroundColor: '#fff'
  },
});