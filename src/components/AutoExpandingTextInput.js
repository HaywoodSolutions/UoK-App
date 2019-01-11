import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class AutoExpandingTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '', height: 0};
  }
  
  render() {
    return (
      <TextInput
        {...this.props}
        multiline={this.props.multiline ? this.props.multiline : true}
        onChangeText={(text) => {
            this.setState({ text })
        }}
        onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height + 10})
        }}
        style={[this.props.style, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
        blurOnSubmit={!this.props.multiline ? !this.props.multiline : true}
      />
    );
  }
}