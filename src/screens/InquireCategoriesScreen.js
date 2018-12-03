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
        urlToImage: "https://mogoartsmarketing.com/wp-content/uploads/2018/06/audience-828584_960_720-1288x724.jpg",
        searchTerm: "opintion"
      },
      {
        name: "Lifestyle",
        urlToImage: "https://eurozpravy.cz/pictures/photo/2017/04/18/running-573762-1920-0ac0b19f35.jpg",
        searchTerm: "life"
      },
      {
        name: "Culture",
        urlToImage: "https://i.ytimg.com/vi/1ccGvTIHFaQ/maxresdefault.jpg",
        searchTerm: "culture"
      },
      {
        name: "Entertainment",
        urlToImage: "https://www.dailyecho.co.uk/resources/images/7704451/?type=responsive-gallery-fullscreen",
        searchTerm: "entertainment"
      },
      {
        name: "Science",
        urlToImage: "http://www.imperial.ac.uk/news/image/mainnews2012/34847.jpg",
        searchTerm: "science"
      },
      {
        name: "Technology",
        urlToImage: "https://i1.wp.com/www.palo-alto-et-compagnie.com/wp-content/uploads/2016/11/lunettes-filtrantes-r%C3%A9alit%C3%A9.jpg?fit=480%2C720",
        searchTerm: "tech"
      },
      {
        name: "Sport",
        urlToImage: "https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2017/11/cross-lighting-title.jpg?resize=750%2C500&ssl=1",
        searchTerm: "sport"
      },
      {
        name: "Cartoons",
        urlToImage: "https://avatar.amuniversal.com/feature_avatars/recommendation_images/features/jbs/large_rec-201701251718.jpg",
        searchTerm: "cartoon"
      },
      {
        name: "Photography",
        urlToImage: "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/01/jason_matias_for_fstoppers_1.jpg",
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
                          source={{
                            uri: category.urlToImage
                          }}
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