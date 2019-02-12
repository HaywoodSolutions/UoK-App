import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../styles/SliderEntry.style';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";

import styles from "../../styles/main.style";

import { getSocietyCategoryList } from "../../DataRequests/Societies";

class SocietiesViewCategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    
    this.state = { societies: [], refreshing: true, type: navigation.getParam('type', '') };
    this.getSocieties = this.getSocieties.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params ==='undefined' || navigation.state.params.title === 'undefined' ? ('Societies'): navigation.state.params.title
   });
                                  
  componentDidMount() {
    let type = this.state.type;
    this.props.navigation.setParams({ title: type.substr(0,1).toUpperCase() + type.substr(1, type.length) + " Societies" });
    this.getSocieties();
  }
  
                                  
  getSocieties() {
    getSocietyCategoryList(this.state.type)
      .then(societies => {
        this.setState({
          societies: societies,
          refreshing: false
        });
      })
      .catch((e) => {
        this.setState({
          refreshing: false
        });
      });
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

    return (
        <View style={styles.background}>
            <ScrollView style={styles.popup}>
              <View style={styles.container}>
                {Object.keys(this.state.societies).map((id) => {
                  let society = this.state.societies[id];
                  return (
                    <TouchableWithoutFeedback
                      key={id}
                      onPress={() => {
                        navigate('ViewSociety', {societyID: society.societyID, society: society})
                      }}
                    >
                      <View style={styles.card}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: society.coverURL }}
                            style={styles.imageTop}
                          />
                        </View>
                        <View style={styles.cardBody}>
                          <View style={{flex: 1, flexDirection: "row"}}>
                            <View style={{flex: 1, flexDirection: "column"}}>
                              <Text style={[styles.title, {textAlign: 'center'}]}>{society.name}</Text>
                              <Text style={[styles.text, {textAlign: 'center'}]}>{society.subtitle}</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Entypo name="chevron-thin-right" size={23} color={"#8D8D8D"} />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
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

export default SessionScreen = connect(mapStateToProps, {})(SocietiesViewCategoryScreen);