import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import SliderEntry from '../../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../../styles/SliderEntry.style';
import {connect} from "react-redux";
import {THEME_COLOR} from "../../../lib/Constants";
import { Entypo } from '@expo/vector-icons';
import {Button, Input} from '../../../components';

import styles from "../../../styles/main.style";

import { getSociety, updateSocietyPage } from "../../../DataRequests/Societies";

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    
    this.state = {
      refreshing: true,
      societyID: navigation.getParam('societyID', ''),
      society: navigation.getParam('society', {}),
      page: [],
      visible: false,
      editTitleVisible: false,
      update: false
    };
    this.getSociety = this.getSociety.bind(this);
    
    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.getSociety();
      }
    );
  }

  componentDidMount() {
    this.getSociety();
  }
  
  getSociety() {
    getSociety(this.state.societyID)
      .then(society => {
        if (!society.page)
          society.page = [];
        this.setState({
          society: society,
          page: society.page,
          refreshing: false
        });
      })
      .catch((e) => {
        this.setState({
          refreshing: false
        });
      });
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    if (this.state.page[index].type == "title") {
       return (
          <TouchableOpacity
            style={{ 
              minHeight: 1, 
              backgroundColor: isActive ? 'blue' : item.backgroundColor
            }}
            onLongPress={move}
            onPressOut={moveEnd}
          >
            <Text style={[styles.title]}>{this.state.page[index].content}</Text>
          </TouchableOpacity>
        );
    } else if (this.state.page[index].type == "text") {
       return (
          <TouchableOpacity
            style={{ 
              minHeight: 1, 
              backgroundColor: isActive ? 'blue' : this.state.page[index].backgroundColor
            }}
            onLongPress={move}
            onPressOut={moveEnd}
          >
            <Text style={[styles.text]}>{this.state.page[index].content}</Text>
          </TouchableOpacity>
        );
    }
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
          <View style={styles.popup}>
            <View style={[styles.container, {flex: 1}]}>
              <DraggableFlatList
                shouldComponentUpdate={this.state.update}
                data={this.state.page}
                extraData={this.state.page}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                scrollPercent={5}
                onMoveEnd={({ data }) => {
                  this.setState({ page: data });
                  updateSocietyPage(this.state.societyID, this.state.page);
                }}
              />
            </View>
          </View>
        </View >
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