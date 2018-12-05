import React from 'react';
import { View } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class InquireArticle extends React.Component {
  render() {
    const {
      description,
      author,
      categories,
      content,
      guid,
      pubDate,
      thumbnail,
      title
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
    let shortDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
    return (
      <View>
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{
            uri: thumbnail || defaultImg
          }}
        >
      <View>
          <Text style={{ marginBottom: 10 }}>
            {shortDescription || 'Read More..'}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{author}</Text>
            <Text style={noteStyle}>{pubDate}</Text>
          </View>
      </View>
        </Card></View>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
};