import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

export default class TechSupportHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url !== 'https://sds.kent.ac.uk/student/student_page.php') {
      //this.WebView.stopLoading();
    }
  }

  render() {
    const { backgroundStyle } = styles;
    
    let jsCode = `
function insertAfter(newElement,targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
insertAfter(document.querySelectorAll('body>table>tbody>tr>td')[0],document.querySelector('.pageheadstudent'))

document.querySelector('#kent-bar').style.display = 'none';

document.querySelectorAll('body>table>tbody>tr>td>table')[0].style.display = 'none';

document.querySelectorAll('body>table>tbody>tr>td>table')[0].style.display = 'none';
document.querySelector('.page').style.display = "block";
document.querySelector('.page').style["boder-left"] = "none";
document.querySelector('.page').style.width = "100%";
document.querySelectorAll('table');

for (var each in document.querySelectorAll('table'))
  each.style.width = "100%";
    `;
    alert("We apologise while we work to make this for mobile use")
    
    return (
        <View style={backgroundStyle}>
          <WebView
              source={{uri: 'https://sds.kent.ac.uk/student/student_page.php?action=details_study&type=submenu'}}
              onNavigationStateChange={this.navigationStateChangedHandler}
              scalesPageToFit={false}
              injectedJavaScript={jsCode}
              javaScriptEnabled={true}
              ref={c => {
                this.WebView = c;
              }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});