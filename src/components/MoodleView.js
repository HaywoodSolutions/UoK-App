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
    if (url.indexOf('https://moodle.kent.ac.uk/2018/my/') != -1) {
      this.WebView.injectJavaScript(`
$(function() {
  var coursesObj = [];
  $(".kcolist .category:has(.title-item a)").each((i,elm) => {
    let title = $(elm).find(".title-item a").toArray();
    for (var i in title) {
      title[i] = $(title[i]).html().trim();
    }

    let courses = $(elm).find(".kcolist1 .course").toArray();
    for (var i in courses) {
      courses[i] = {
        id: $(courses[i]).attr('data-id'),
        title: $(courses[i]).find(".title a").attr("title"),
        description: $(courses[i]).find(".course_description").html().replace('&nbsp;', '').trim()
      };
    };

    let obj = {
      title: title,
      courses: courses
    };
    coursesObj.push(obj);
  });
if (document.hasOwnProperty('postMessage')) {
      document.postMessage(JSON.stringify(coursesObj), '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(JSON.stringify(coursesObj), '*');
    }

});
      `);
    } else if (url.indexOf('https://moodle.kent.ac.uk/2018/course/view.php?id=') != -1) {
    this.WebView.injectJavaScript(`
document.getElementById('kent-bar').style.display = 'none';
document.getElementsByClassName('fixed-top')[0].style.display = 'none';
document.getElementById('page-footer').style.display = 'none';
document.getElementById('page').style.padding = '0px';
document.getElementById('page').style.marginTop = '0px';
document.getElementById('nav-drawer').style.display = 'none';
document.getElementsByClassName('container')[0].style.paddingRight = '0px';
document.getElementsByClassName('container')[0].style.paddingLeft = '0px';
document.body.style.overflowX = 'hidden';
document.body.style.marginTop = '0px';

$(function() {
  let module = {
	contacts: [],
	assessments: [],
    lectureRecordingFeed: null
  };

  var links = $(".block_panopto .listItem a[href^='http://player.kent.ac.uk/Panopto/Podcast/Podcast.ashx?courseid=']");
  module.lectureRecordingFeed = $(links[1]).attr('href').replace('http://player.kent.ac.uk/Panopto/Podcast/Podcast.ashx?courseid=', '').replace('&type=mp4', '');

  var title = "";
  $(".block_course_contacts .box").children().each(function() {
    if ($(this).prop("tagName") == "H5") {
      title = $(this).text().trim()
    } else if ($(this).hasClass("ccard")) {
      module.contacts.push({
        name: $(this).text().trim(),
        role: title,
        email: $(this).find("a[href^='mailto:']").attr("href").replace("mailto:", ""), 
        imageURL: $(this).find("img.userpicture").attr("src"), 
        online: $(this).find("img.status").attr("title") == "Active"
      });
    }
  });


  if (document.hasOwnProperty('postMessage')) {
    document.postMessage(JSON.stringify(module), '*');
  } else if (window.hasOwnProperty('postMessage')) {
    window.postMessage(JSON.stringify(module), '*');
  }
});

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