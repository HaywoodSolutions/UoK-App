import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'

export default class PrintingCreditsView extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '', height: 0};
    
    this.state.jsCode = `
const PostMessage = function(data) {
  if (document.hasOwnProperty('postMessage')) {
      document.postMessage(data, '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(data, '*');
    }
};
    ` + props.insertJavaScript;
  }

  navigationStateChangedHandler = ({url}) => {
    if (url.indexOf('https://epay.kent.ac.uk/printcredits/') != -1) {
      this.WebView.injectJavaScript(`
        document.getElementById("wpm-footer").style.display = "none";
        document.getElementById("client-header").style.display = "none";
        document.getElementsByClassName("no-heading")[0].style.display = "none";
      `);
    } else if (url.indexOf('https://epay.kent.ac.uk/payment-options') != -1) {
      this.WebView.injectJavaScript(`
        document.getElementById("wpm-footer").style.display = "none";
        document.getElementById("client-header").style.display = "none";
      `);
    } else if (url.indexOf('https://epay.kent.ac.uk/payment') != -1) {
      this.WebView.injectJavaScript(`
        document.getElementById("wpm-footer").style.display = "none";
        document.getElementById("client-header").style.display = "none";
      `);
    } else if (url.indexOf('https://epay.kent.ac.uk/payment-method-selection') != -1) {
      this.WebView.injectJavaScript(`
        document.getElementById("wpm-footer").style.display = "none";
        document.getElementById("client-header").style.display = "none";
      `);
    } else if (url.indexOf('https://epay.kent.ac.uk/payment-method-selected') != -1) {
      this.WebView.injectJavaScript(`
        document.getElementById("wpm-footer").style.display = "none";
        document.getElementById("client-header").style.display = "none";
      `);
    }
  }
  
  getHiddenStyle() {
    if (this.props.hidden) {
      return {
        maxHeight: 0
      }
    } else return {}
  }
  
  render() {
    return (
      <WebView
        onMessage={this.props.onMessage}
        source={{uri: this.props.uri}}
        onNavigationStateChange={this.navigationStateChangedHandler}
        scalesPageToFit={false}
        injectedJavaScript={this.state.jsCode}
        javaScriptEnabled={true}
        style={[styles.backgroundStyle, this.getHiddenStyle()]}
        ref={c => {
          this.WebView = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});