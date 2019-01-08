import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../styles/SliderEntry.style';
import styles, { colors } from '../../styles/index.style';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";
import InquireArticle from '../../components/InquireArticle';
import { getSocietyList } from "../../DataRequests/Societies";

import Carousel from 'react-native-snap-carousel';

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { societies: [], refreshing: true };
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
        this.setState({
          societies,
          refreshing: false
        });
    })
      .catch((e) => {
        this.setState({ refreshing: false })
    });
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
    const { backgroundStyle, noteStyle } = styles;
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
        <View style={backgroundStyle}>
            <ScrollView style={styles.popup}>
              <Text style={[styles.title, styles.titleDark]}>{"Sports"}</Text>
                <Text style={[styles.subtitle, styles.titleDark]}>{"Kick the year off with a great start!"}</Text>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.societies}
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