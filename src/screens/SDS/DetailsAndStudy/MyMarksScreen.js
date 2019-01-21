import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      marks: {},
      loaded: false
    }
    
    this.onMessage = this.onMessage.bind(this)
  }
  
  onMessage(event) {
    this.setState({
      marks: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
  }

  render() {
    const { backgroundStyle } = styles;
    
        let code = `
currentYear = "";
currentModule = "";
marks= {};
$("#studentpage table.student tr").each(function(i, val) {
	let content = ($(this).find("p")).html().trim();
	section: if (content.indexOf("Modules Started in:") != -1) {
		currentYear = content.trim().replace("Modules Started in: ", "");
		marks[currentYear] = {};
	} else if (content.indexOf("Attempt") != -1 || content.indexOf("Module") != -1) {
		break section;
    } else if (content.indexOf(":") != -1) {
		let children = ($(this).find("th p"));
		currentModule = $(children[0]).html().trim();
		marks[currentYear][currentModule] = {
			name: $(children[2]).html().trim(),
			note: $(children[1]).html().trim(),
			creditValue: $(children[3]).html().trim(),
			creditLevel: $(children[4]).html().trim(),
			creditAchieved: $(children[5]).html().trim(),
			attempts: {}
		};
    } else if (content.indexOf("Awaiting Marks") != -1) {
		marks[currentYear][currentModule].resultsState = "Awaiting Marks Record";
    } else if (content.indexOf("-") != -1) {
		let children = ($(this).find("td p"));
		let attempt = $(children[0]).html().trim();
		console.log($(children[3]));
		marks[currentYear][currentModule].attempts[attempt] = {
			assessmentPattern: $(children[1]).html().trim().replace("<em>","").replace("</em>",""),
			coursework: $(children[3]).siblings("form.student").children("input[type='submit']").val().trim(),
			exam: $(children[4]).html().trim(),
			project: $(children[5]).html().trim(),
			passFail: $(children[6]).html().trim(),
			final: $(children[7]).html().trim(),
		};
    }
});
PostMessage(JSON.stringify(marks));`;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                    uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws5f12ef'}
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
                  {Object.keys(this.state.marks).map((year) => {
                   return (
                     <View
                         key={year}
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
                      >{year}</Text>
                      {Object.keys(this.state.marks[year]).map((course) => {
                        return (
                          <View
                            key={course}
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
                            >{course, this.state.marks[year][course].name}</Text>
                            {
                              (this.state.marks[year][course].resultsState && this.state.marks[year][course].resultsState.indexOf("Awaiting Marks") != -1) ?
                                (
                                  <View style={{flex: 1}}>
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
                                        >{"Awaiting Marks Record"}</Text>
                                      </View>
                                    </View>
                                  </View>
                                ) :
                                (
                                  <View style={{flex: 1}}>
                                    {Object.keys(this.state.marks[year][course].attempts).map((assessmentID) => {
                                      return (
                                         <View key={assessmentID}
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
                                                <View style={{flex: 1}}>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Assessment Pattern: " + this.state.marks[year][course].attempts[assessmentID].assessmentPattern}</Text>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Coursework: " + this.state.marks[year][course].attempts[assessmentID].coursework}</Text>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Exam: " + this.state.marks[year][course].attempts[assessmentID].exam}</Text>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Final: " + this.state.marks[year][course].attempts[assessmentID].final}</Text>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Pass Final: " + this.state.marks[year][course].attempts[assessmentID].passFail}</Text>
                                                  <Text
                                                    style={{
                                                      color: '#040404',
                                                      fontWeight: '600',
                                                      fontSize: 14
                                                    }}
                                                  >{"Project: " + this.state.marks[year][course].attempts[assessmentID].project}</Text>
                                                </View>
                                            </View>
                                          </View>
                                        );
                                      })}
                                    </View>
                                  )}
                            </View>
                          );
                        })}
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