import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import InquireArticle from '../components/InquireArticle';
import { getInquireFeed } from "../DataRequests/Inquire";

const ITEMS_PER_PAGE = 10;

class InquireViewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rawFeed: [], feed: [], page: 1, refreshing: true };
    const { navigation } = this.props;
    this.rawCategory = navigation.getParam('categoryName', '');
    this.category = this.rawCategory.toLowerCase();
    this.fetchFeed = this.fetchFeed.bind(this);
  }

  componentDidMount() {
    this.fetchFeed();
  }
  
  fetchFeed() {
    getInquireFeed().then(feed => {
        let newFeed = [];
        for (let i in feed.items) {
          if (feed.items[i].title.toLowerCase().indexOf(this.category) != -1 || feed.items[i].description.toLowerCase().indexOf(this.category) != -1)
            newFeed.push(feed.items[i]);
        }
        return newFeed;
      })
      .then(feed => {
        this.setState(
          { rawFeed: feed, feed: feed.slice(0, ITEMS_PER_PAGE), page: 1, refreshing: false }
        );
    })
    .catch((e) => {
        this.setState({ refreshing: false });
    });
  }
  
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchFeed()
    );
  }
            
  loadMore() {
    const { page, feed, rawFeed } = this.state;
    if (feed.length > 0) {
      const start = page * ITEMS_PER_PAGE;
      const end = (page+1)*ITEMS_PER_PAGE-1;

      const newData = rawFeed.slice(start, end);
      this.setState({feed: [...feed, ...newData], page: page + 1});
    }
  }

  render() {
    
    const { navigate } = this.props.navigation;
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
            <ScrollView style={styles.popup}>
              <FlatList
                  data={this.state.feed}
                  renderItem={({ item }) => (<TouchableOpacity
                        onPress={() => {
                          navigate('ViewArticle', {
                            articleTitle: item.title
                          });
                        }}>
                         <InquireArticle article={item} />
                        </TouchableOpacity>)}
                  keyExtractor={item => item.guid}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                  onEndReached={() => this.loadMore()}
                />
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

export default SessionScreen = connect(mapStateToProps, {})(InquireViewCategory);