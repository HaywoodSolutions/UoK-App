import React from 'react';
import {View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';

import styles from "../../styles/main.style";

import { getSociety } from "../../DataRequests/Societies";

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    
    this.state = { refreshing: true, societyID: navigation.getParam('societyID', ''), society: navigation.getParam('society', {}) };
    this.getSociety = this.getSociety.bind(this);
    this.openManageSociety = this.openManageSociety.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.state.params ==='undefined' || navigation.state.params.title === 'undefined' ? ('View Society'): navigation.state.params.title,
      headerRight: (
        <TouchableOpacity
          onPress={() => params.handleThis() }>
          <View style={{marginRight: 20}}>
            <MaterialIcons name="settings" size={26} color={"white"} />
          </View>
        </TouchableOpacity>
      )
    }
  };
                                  
  componentDidMount() {
    this.props.navigation.setParams({
      title: this.state.society.name,
      handleThis: this.openManageSociety
    });
    this.getSociety();
  }

  openManageSociety() {
    this.props.navigation.navigate('ManageSociety', {societyID: this.state.societyID, society: this.state.society })
  }

  getSociety() {
    getSociety(this.state.societyID)
      .then(society => {
        this.props.navigation.setParams({ title: society.name });
        this.setState({
          society: society,
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
                <Text style={[styles.title, {textAlign: 'center'}]}>{"This society hasn't customised their page yet"}</Text>
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