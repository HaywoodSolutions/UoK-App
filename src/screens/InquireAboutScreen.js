import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import InquireArticle from '../components/InquireArticle';
import { getInquireFeed } from "../DataRequests/Inquire";
import Slideshow from 'react-native-slideshow';

const ITEMS_PER_PAGE = 10;

class Inquire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      interval: null
    };
  }
  
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === 4 ? 0 : this.state.position + 1
        });
      }, 5000)
    });
  }
    
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<FontAwesome name="info" size={28} color={tintColor}/>)
  };
  

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
              <View style={{padding: 10}}>
              <Text style={styles.title}>{"About InQuire"}</Text>
              <Slideshow style={{marginBottom: 10, marginTop: 10}}
                  position={this.state.position}
                  dataSource={[
                    { image: require("../../assets/InquireExexutiveTeam1819.jpg"),
                      title: 'Executive Team 2018/19'},
                    { image: require("../../assets/InquireWebsiteTeam1819.jpg"),
                      title: 'Website Team 2018/19'},
                    { image: require("../../assets/InquireNewspaperTeam1819.jpg"),
                      title: 'Newspaper Team 2018/19'},
                    { image: require("../../assets/InquireSubEditors1819.jpg"),
                      title: 'Sub-Editors 2018/19'},
                    { image: require("../../assets/InquireMeetings.jpg"),
                      title: 'Meetings'}
                  ]}
                  onPositionChanged={position => this.setState({ position })}
                />
              <Text style={{marginTop: 10}}>{"InQuire Media Group is the University of Kent Canterbury’s student news group, written by Kent students for Kent students.\n"}</Text>
              <Text>{`Distributed in print format across 9 locations on the Canterbury campus and online at inquiremedia.co.uk, InQuire is written by students, for students.\n\nWe are the central hub for student and university news. We cover student news, opinion, lifestyle, entertainment, culture, science, sport and photography.\n\nForming in 1965, the student newspaper was originally named InCant. It remained this until 1985 when it become Kred and then InQuire in 2007. In 2008 we released our website InQuire Media, expanding our reach into the digital world.\n\nInQuire Media is run completely by student volunteer editors who oversee and publish all content and advertising on the website.The publication provides a platform for students of the University of Kent to gain valuable experience in journalism, photography and multimedia. We also endeavour to inform and entertain our audience with quality articles, reliable information and breaking exclusives.\n\nWe work closely with the University of Kent and Kent Union to create special editions, such as Black History Month and This Kent Girl Can, and have expanded our committee to cover all student groups.`}</Text>
</View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    ...Platform.select({
      ios:{
        paddingTop: 10
      }
    })
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
  },
  scrollStyle: {
    flex: 1
  },
  noteStyle: {
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  list: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      marginTop: 25,
      marginLeft: 10,
      marginRight: 10,
      flex: 1
  },
  title: {
    marginBottom: 2.5,
    paddingBottom: 0,
    fontSize: 20,
    fontWeight: '600'
  },
  popup: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: "#ffffff",
      flex: 1
  },
  item: {
      margin: 3,
      padding: 10,
      flex: 1,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: THEME_COLOR,
      color: '#000000',
      fontSize: 19
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(Inquire);