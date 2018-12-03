import React from 'react';
import { View, Dimensions } from 'react-native';
import moment from 'moment';

export default class InquireCategory extends React.Component {
  render() {
    const {
      name,
      urlToImage,
      color
    } = this.props.category;
    const { noteStyle, featuredTitleStyle } = styles;
    return (
      <View style={styles.container}>
        <View style={styles.fixedRatio} />
      </View>
    );
  }
}

const styles = {
  container: {
    width: Dimensions.get('window').width * 0.5,
    aspectRatio: 1,
    backgroundColor: '#CCC'
  },
  fixedRatio: {
    backgroundColor: 'rebeccapurple',
    flex: 1
  },
};