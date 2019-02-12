import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../styles/SliderEntry.style';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";

import styles from "../../styles/main.style";

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<FontAwesome name="star-o" size={28} color={tintColor}/>)
  };
  
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

    return (
        <View style={styles.background}>
            <ScrollView style={styles.popup}>
              <View style={styles.container}>
                <TouchableWithoutFeedback
                onPress={() => {
                  navigate('ViewSocietyCategory', {type: "academic"})
                }}
                >
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Academic"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Meet people who may not be on your course"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Cultural"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Meet likeminded people"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Faith and Belief"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Meet more people"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Performance"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Show your talent in an new way"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Physical Activity"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Kick the year off with a great start!"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Politics and Campaigning"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Get your voice heard"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.cardBody}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                      <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>{"Special Intrest"}</Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{"Kick the year off with a great start!"}</Text>
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
           </ScrollView>
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

export default SessionScreen = connect(mapStateToProps, {})(SocietiesHomeScreen);