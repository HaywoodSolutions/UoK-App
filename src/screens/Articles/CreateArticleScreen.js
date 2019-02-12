import React from 'react';
import {View, Text, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from '../../styles/index.style';
import {Button, Input} from '../../components';

export default class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      articleTitle: "",
      articleSubTitle: "",
      articleDescription: "",
      articlePublic: false
    }
  }

  onChange(value) {
    this.setState({value});
  }
  
  render() {
    return (
      <View style={styles.backgroundStyle}>
        <ScrollView style={styles.popup}>
          <Text style={styles.title}>Title</Text>
          <Input
            placeholder='Enter the article title'
            value={this.state.articleTitle}
            onChangeText={(value) => this.setState({
              articleTitle: value
            })}
          />
          <Text style={styles.title}>SubTitle</Text>
          <Input
            numberOfLines={2}
            placeholder='Enter the article Sub Title'
            style={{height: 80, padding: 5, flexWrap: 'wrap', alignItems: 'flex-start'}}
            value={this.state.articleSubTitle}
            onChangeText={(value) => this.setState({
              articleSubTitle: value.replace(/\n|\r/g, "")
            })}
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                if (keyValue === "Enter") 
                  this.setState({
                  articleSubTitle: this.state.articleSubTitle.replace(/\n|\r/g, "")
                })
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.articlePublic}
              onValueChange={() => this.setState({ articlePublic: !this.state.articlePublic })}
            />
            <Text style={{marginTop: 5}}>{"Public"}</Text>
          </View>
          <Button
            title={'Create Article'} />
        </ScrollView>
      </View>
    );
  }
}