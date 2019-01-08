import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";

import {Button, Input} from '../../components';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../../lib/Constants";

const ITEMS_PER_PAGE = 10;

export default class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      articleTitle: "",
      articleSubTitle: "",
      articleDescription: ""
    }
  }

  render() {
    return (
      <View style={styles.backgroundStyle}>
        <ScrollView style={styles.popup}>
          <Text style={{marginHorizontal: 10, fontSize: 20}}>Title</Text>
          <Input
            placeholder='Enter the article title'
            style={styles.noteStyle}
            value={this.state.articleTitle}
            onChangeText={(value) => this.setState({
              articleTitle: value
            })}
          />
          <Text style={{marginHorizontal: 10, fontSize: 20}}>SubTitle</Text>
          <Input
            multiline={true}
            numberOfLines={2}
            placeholder='Enter the article Sub Title'
            style={[styles.noteStyle, {height: 80, padding: 5, flexWrap: 'wrap', alignItems: 'flex-start'}]}
            value={this.state.articleSubTitle}
            onChangeText={(value) => this.setState({
              articleSubTitle: value.replace(/\n|\r/g, "")
            })}
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
  noteStyle: {
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
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