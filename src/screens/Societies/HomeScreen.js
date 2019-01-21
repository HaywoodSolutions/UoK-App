import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../styles/SliderEntry.style';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";
import InquireArticle from '../../components/InquireArticle';
import { getSocietyList } from "../../DataRequests/Societies";

import Carousel from 'react-native-snap-carousel';

import styles from "../../styles/main.style";

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sportSocs: [], academicSocs: [], refreshing: true };
    this.getSocieties = this.getSocieties.bind(this);
  }

  componentDidMount() {
    this.getSocieties();
  }
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<FontAwesome name="star-o" size={28} color={tintColor}/>)
  };
  
  
  getSocieties() {
    getSocietyList()
      .then(societies => {
        this.processSocieties(societies);
    })
      .catch((e) => {
        this.setState({ refreshing: false })
    });
  }
  
  filterSocieties(societies, type) {
    var list = [];
    for (var society of societies) {
      console.log(society);
      if (society.type === type)
        list.push(society);
    }
    return list;
  }
  
  processSocieties(societies) {
    this.setState({
      sportSocs: this.filterSocieties(societies, "physical-activity"),
      academicSocs: this.filterSocieties(societies, "academic"),
      refreshing: false
    })
  }
  
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.getSocieties()
    );
  }

  _renderItem ({item, index}) {
    return <SliderEntry data={item} even={true} />;
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
                <Text style={[styles.title, {textAlign: 'center'}]}>{"Sports"}</Text>
                <Text style={[styles.text, {textAlign: 'center'}]}>{"Kick the year off with a great start!"}</Text>
              </View>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.sportSocs}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                itemWidth={itemWidth}
              />
              <View style={styles.container}>
                <Text style={[styles.title, {textAlign: 'center'}]}>{"Achademic"}</Text>
                <Text style={[styles.text, {textAlign: 'center'}]}>{"Meet people who may not be on your course"}</Text>
              </View>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.academicSocs}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                itemWidth={itemWidth}
              />
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