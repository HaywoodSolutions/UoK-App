import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      attendances: {},
      loaded: false
    }
    
    this.onMessage = this.onMessage.bind(this)
  }
  
  onMessage(event) {
    this.setState({
      attendances: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }

  render() {
    const { backgroundStyle } = styles;
    
    let code = `
    let attendanceObj = {};
    let currentCode = null;
    let currentType = null;
    $("#studentpage table.student .student th[colspan='7'] p, #studentpage table.student .studentlight th[colspan='7'] p, #studentpage table.student tr:not(.student):not(.studentlight)").each(function(i, val) {
      let content = $(val).html();
      if ($(this).parent().parent().hasClass("student") && content.indexOf("<") == -1) {
        if (currentCode != content)
          currentCode = content;
        attendanceObj[content] = {};
      } else if ($(this).parent().parent().hasClass("studentlight")) {
        if (currentType != content)
          currentType = content;
        attendanceObj[currentCode][content] = [];
      } else {
        let children = $(val).find("td.ruled p");
        let absances = $(val).find("td.ruled form input[type='submit']").val();
        attendanceObj[currentCode][currentType].push({
          year: $(children[1]).html().replace("&nbsp;", ""),
          event: $(children[2]).html().replace("&nbsp;", ""),
          day: $(children[3]).html().replace("&nbsp;", ""),
          staff: $(children[4]).html().replace("&nbsp;", ""),
          numberOfRecordedEvents: $(children[5]).html().replace("&nbsp;", ""),
          absences: parseInt(absances)
        })
      }
    })
PostMessage(JSON.stringify(attendanceObj));`;
    
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                  uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws8r1'}
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
                  {Object.keys(this.state.attendances).map((courseKey) => {
                   return (
                     <View
                         key={courseKey}
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
                      >{courseKey}</Text>
                      {Object.keys(this.state.attendances[courseKey]).map((classKey) => {
                        return (
                          <View key={classKey}
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
                              >{classKey}</Text>
                              {Object.keys(this.state.attendances[courseKey][classKey]).map((detailsKey) => {
                                return (
                                  <Text key={detailsKey}
                                    style={{
                                      color: '#8D8D8D',
                                      fontSize: 13
                                    }}
                                  >{"("+ this.state.attendances[courseKey][classKey][detailsKey].absences + "/" + this.state.attendances[courseKey][classKey][detailsKey].numberOfRecordedEvents + ") absences for " + this.state.attendances[courseKey][classKey][detailsKey].event + " on " + this.state.attendances[courseKey][classKey][detailsKey].day + " with " + this.state.attendances[courseKey][classKey][detailsKey].staff}</Text>
                                );                          
                              })}
                            </View>
                          </View>
                        );
                      }
                      )}
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