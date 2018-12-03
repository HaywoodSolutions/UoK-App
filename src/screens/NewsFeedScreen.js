import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import Article from '../components/Article';
import { getNewsFeed } from "../DataRequests/NewsFeed";


class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }
  
  fetchNews() {
    getNewsFeed()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }
  
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
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

    return (
        <View style={backgroundStyle}>
          <Text
              style={{
                fontWeight: '600',
                fontSize: 20,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 0
              }}
          >
            {'KentFlix'}
          </Text>
          <Text
              style={{
                fontWeight: '600',
                fontSize: 10,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 0
              }}
          >
            {'News Feed'}
          </Text>
          <View  style={backgroundStyle}>
            <ScrollView style={styles.popup}>
              <FlatList
                  data={this.state.articles}
                  renderItem={({ item }) =>  <Article article={item} />}
                  keyExtractor={item => item.title}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
            </ScrollView>
          </View>
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