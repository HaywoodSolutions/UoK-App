import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";
import Article from '../../components/Article';
import { getMeetings } from "../../DataRequests/Meetings";
import Timestamp  from 'react-timestamp';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meetings: [], refreshing: true };
    this.fetchMeetings = this.fetchMeetings.bind(this);
  }

  componentDidMount() {
    this.fetchMeetings();
  }
  
  fetchMeetings() {
    getMeetings()
      .then(meetings => this.setState({ meetings, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }
  
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchMeetings()
    );
  }
                                  
  render() {
    const { backgroundStyle } = styles;
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }

    return (
        <View style={backgroundStyle}>
          <ScrollView
                style={{
                flex: 1,
                padding: 15
                }}
            >
                <View style={{
                marginBottom: 15}}>
                {Object.keys(this.state.meetings).map((meetingKey) => {
                return (
                    <View
                        key={meetingKey}
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
                        >{this.state.meetings[meetingKey].name}</Text>
                        </View>
                        <Text
                            style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                            }}
                        >
                            <Timestamp component={Text} time={this.state.meetings[meetingKey].startDate} utc={false} format='full' style={{
                            color: '#040404',
                            fontWeight: '600',
                            fontSize: 14
                            }} />
                        </Text>
                        </View>
                    </View>
                );
                })}
                
                </View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: THEME_COLOR
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

export default SessionScreen = connect(mapStateToProps, {})(NewsFeed);