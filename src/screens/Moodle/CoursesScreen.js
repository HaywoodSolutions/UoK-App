import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";

import MoodleView from "../../components/MoodleView";
import styles from "../../styles/main.style";

class Lectures extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      sections: []
    }
    this.onMessage = this.onMessage.bind(this);
  }
  
  onMessage(event) {
    this.setState({
      loaded: true,
      sections: JSON.parse(event.nativeEvent.data)
    });
    console.log(JSON.parse(event.nativeEvent.data));
  }
                                  
  render() {
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }
    
    const { navigate } = this.props.navigation;
    
    var code = ``;
    return (
      <View style={[styles.background, {backgroundColor: '#fff'}]}>
        {
          (!this.state.loaded) ?
            (
              <MoodleView
                uri={'https://moodle.kent.ac.uk/2018/my/'}
                insertJavaScript={code}
                onMessage={this.onMessage}
                hidden={false}
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
                {Object.keys(this.state.sections).map((sectionKey) => {
                 return (
                   <View key={sectionKey}
                       key={sectionKey}
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
                    >{this.state.sections[sectionKey].title.toString()}</Text>
                    
                     {Object.keys(this.state.sections[sectionKey].courses).map((courseKey) => {
                       return (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            navigate('Course', {moduleID: this.state.sections[sectionKey].courses[courseKey].id})
                          }}
                          key={courseKey}
                        >
                         <View style={styles.card}>
                          <View style={styles.cardBody}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                              <View style={{flex: 1, flexDirection: "column"}}>
                                <Text style={[styles.title, {textAlign: 'center'}]}>{this.state.sections[sectionKey].courses[courseKey].title}</Text>
                                <Text style={[styles.text, {textAlign: 'center'}]}>{this.state.sections[sectionKey].courses[courseKey].description}</Text>
                              </View>
                              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                              </View>
                            </View>
                          </View>
                        </View>
                        </TouchableWithoutFeedback>
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


const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(Lectures);