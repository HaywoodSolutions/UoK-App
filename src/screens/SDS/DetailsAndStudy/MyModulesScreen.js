import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modules: {},
      loaded: false
    }
    
    this.onMessage = this.onMessage.bind(this)
  }
  
  onMessage(event) {
    this.setState({
      modules: JSON.parse(event.nativeEvent.data),
      loaded: true
    });
    console.log(event.nativeEvent.data);
  }

  render() {
    const { backgroundStyle } = styles;
    
        let code = `
year = null;
modulesObj = {};
$("#studentpage table.student tr:not(.student)").each(function(i, val) {
	if ($(this).hasClass("studentlight")) {
		year = $(this).find("td p").html().trim().replace("<strong>", "").replace("</strong>", "");
		modulesObj[year] = {};
    } else {
		let children = $(this).find("td p");
		let courseID = $(children[0]).html().replace("&nbsp;","");
		modulesObj[year][courseID] = {
			title: $(children[1]).html().replace("&nbsp;",""),
			category:$(children[2]).html().replace("&nbsp;","").trim(),
			campus:  $(children[3]).html().replace("&nbsp;",""),
			contribution:  $(children[4]).html().replace("&nbsp;",""),
			credits: $(children[5]).html().replace("&nbsp;",""),
			level: $(children[6]).html().replace("&nbsp;",""),
			status:  $(children[7]).html().replace("&nbsp;","").trim(),
			taughtIn:  $(children[8]).html().replace("&nbsp;",""),
			examinedIn: $(children[9]).html().replace("&nbsp;","")
        }
    }
})
PostMessage(JSON.stringify(modulesObj));`;
    
    return (
        <View style={backgroundStyle}>
          {
            (!this.state.loaded) ?
              (
                <SDSWebView
                  uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws5f1a'}
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
                  {Object.keys(this.state.modules).map((year) => {
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
                     {Object.keys(this.state.modules[year]).map((course) => {
                      return (
                        <View
                         key={course}
                          style={{
                              flex: 1,
                              minHeight:20,
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
                              >{course + " " + this.state.modules[year][course].title}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].category}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].campus}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].contribution}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].credits}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].level}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].status}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].taughtIn}</Text>
                              <Text
                                style={{
                                  color: '#040404',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}
                              >{this.state.modules[year][course].examinedIn}</Text>
                            </View>
                          </View>

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