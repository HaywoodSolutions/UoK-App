import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {THEME_COLOR} from "../lib/Constants";
import InquireCategory from '../components/InquireCategory';
import { getInquireFeed } from "../DataRequests/Inquire";
import GridView from 'react-native-gridview';


export default class Inquire extends React.Component {
  constructor(props) {
    super(props);
  }
           
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<FontAwesome name="cubes" size={28} color={tintColor}/>)
  };
  
  render() {
    const { backgroundStyle, noteStyle } = styles;
    const categories = [
      {
        name: "Opinion",
        urlToImage: require('../../assets/opinion.jpg'),
        searchTerm: "opintion"
      },
      {
        name: "Lifestyle",
        urlToImage: require('../../assets/lifestyle.jpg'),
        searchTerm: "life"
      },
      {
        name: "Culture",
        urlToImage: require('../../assets/culture.jpg'),
        searchTerm: "culture"
      },
      {
        name: "Entertainment",
        urlToImage: require('../../assets/entertainment.jpg'),
        searchTerm: "entertainment"
      },
      {
        name: "Science",
        urlToImage: require('../../assets/science.jpg'),
        searchTerm: "science"
      },
      {
        name: "Technology",
        urlToImage: require('../../assets/technology.jpg'),
        searchTerm: "tech"
      },
      {
        name: "Sport",
        urlToImage: require('../../assets/sport.jpg'),
        searchTerm: "sport"
      },
      {
        name: "Cartoons",
        urlToImage: require('../../assets/cartoons.jpg'),
        searchTerm: "cartoon"
      },
      {
        name: "Photography",
        urlToImage: require('../../assets/photography.jpg'),
        searchTerm: "photo"
      },
    ];
    const { navigate } = this.props.navigation;
    return (
        <View style={backgroundStyle}>
          <View style={styles.popup}>
            <ScrollView>
              <View style={styles.container}>
                {
                  categories.map((category, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => {
                          navigate('CategoryContent', {
                            categoryName: category.searchTerm
                          });
                        }}
                      >
                        <Image
                          style={styles.itemIcon}
                          source={category.urlToImage}
                        />
                        <Text style={styles.ItemTitle}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
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
  title: {
    width: Dimensions.get('window').width - 10,
    height: 50,
    margin: 10,
    marginBottom: 0,
    fontSize: 25
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      padding: 5
    },
    item: {
        width: Dimensions.get('window').width * 0.5 - 25,
        height: Dimensions.get('window').width * 0.5 - 25,
        margin: 10,
        borderColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center'        
    },
    itemIcon: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: Dimensions.get('window').width * 0.5 - 25,
      height: Dimensions.get('window').width * 0.5 - 25,
      resizeMode: 'cover'
    },
    ItemTitle: {
      fontSize: 25,
      color: '#fff',
      fontWeight: '600'
    }
});