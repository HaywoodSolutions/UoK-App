import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Dimensions } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import ScaledImage from "../components/ScaledImage";
import { getInquireFeed } from "../DataRequests/Inquire";

const ITEMS_PER_PAGE = 10;

class InquireViewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rawFeed: [], article: [], refreshing: true };
    const { navigation } = this.props;
    this.articleTitle = navigation.getParam('articleTitle', '');
    this.fetchFeed = this.fetchFeed.bind(this);
  }

  componentDidMount() {
    this.fetchFeed();
  }
  
  fetchFeed() {
    getInquireFeed().then(feed => {
        let newFeed = [];
        for (let i in feed.items) {
          if (feed.items[i].title  == this.articleTitle)
            return feed.items[i];
        }
        return null;
      })
      .then(article => {
        if (article == null) {
          this.props.navigation.goBack(null);
        } else {
          article.content = this.processText(article.content);
          article.authors = "Author(s): "+article.author;
          article.publishedAt = "Published at "+article.pubDate.substr(0,16);
          this.setState({
            article: article,
            refreshing: false
          });
        }
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
  
  processText(text) {
    text = text.replace(/[\r\n]+/g, `

`);
    text = text.replace(/((<div>)|(<\/div>))/g, "");
    text = text.split(/((<img src="[a-z://.0-9_~]+)">)/g);
    let result = [];
    let key = 0;
    for(var i = 0; i < text.length; i++) {
      if (text[i].match(/((<img src="[a-z://.0-9_~]+)">)/g)) {
        result.push(<View 
                key={key}  style={{marginBottom: 7.5, marginTop: 2.5}}>
              <ScaledImage
                uri={text[i].replace(/((<img src=")|(">))/g, "")}
                width={Dimensions.get('window').width - 25} 
              />
            </View>);
        key++;
        i = i + 1;
      } if (!text[i].match(/((<img src="[a-z://.0-9_~]+))/g) && text[i].replace(/^\s+|\s+$/g, "").length > 0) {
        result.push(<View 
                key={key} style={{marginBottom: 2.5, marginTop: 2.5}}>
            <Text>{text[i]}</Text>
              </View>);
                    
        key++;
      }
    }
    return result;
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
            <ScrollView style={styles.popup}>
              <Text style={styles.title}>{this.state.article.title}</Text>
              <Text style={styles.authors}>{this.state.article.authors}</Text>
              <View style={styles.articleContent}>{this.state.article.content}</View>
              <Text style={styles.date}>{this.state.article.publishedAt}</Text>
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
  articleContent: {
    margin: 0,
    padding: 0
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
      padding: 10,
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
  },
  title: {
    marginBottom: 2.5,
    paddingBottom: 0,
    fontSize: 20,
    fontWeight: '600'
  },
  authors: {
    marginBottom: 5,
    fontSize: 15,
    color: '#b2bec3'
  },
  date: {
    marginTop: 10,
    fontSize: 15,
    color: '#b2bec3'
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