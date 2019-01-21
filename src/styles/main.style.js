import { StyleSheet, Platform, Dimensions } from 'react-native';
import {THEME_COLOR} from "../lib/Constants";

const IS_IOS = Platform.OS === 'ios';
const entryBorderRadius = 15;

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: THEME_COLOR
  },
  blackBackground: {
    flex: 1,
    backgroundColor: '#000'
  },
  popup: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#ffffff"
  },
  container: {
    padding: 15
  },
  card: {
    flex: 1,
    backgroundColor: 'rgb(240,244,247)',
    borderRadius: entryBorderRadius,
    overflow: 'hidden',
    minHeight:20,
    marginBottom: 15
  },
  cardThemed: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    borderRadius: entryBorderRadius,
    overflow: 'hidden',
    minHeight:20,
    marginBottom: 15
  },
  cardBody: {
    flex: 1,
    padding: 15,
    minHeight:20
  },
  title: {
    color: '#040404',
    fontWeight: '600',
    fontSize: 14,
    height: 16
  },
  text: {
    color: '#8D8D8D',
    fontSize: 13,
    height: 15
  },
  input: {
    backgroundColor: '#fff'
  },
  bgVideo: {
    flex: 1
  },
  
  weekSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 70,
    justifyContent: 'space-between',
    padding: 5,
  },
  weekSelectorButton: {
    backgroundColor: THEME_COLOR,
    height: 50,
    width: 50
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'rgb(240,244,247)',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    height: Dimensions.get('window').width  * 0.4
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageTop: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'rgb(240,244,247)'
  },
  modal: {
    position: 'absolute',
    zIndex: 1,
    margin: 0, 
    backgroundColor: 'white', 
    height: 150, 
    flex: 1,
    bottom: 0,
    width: Dimensions.get('window').width,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    padding: 15
  },
  textCenter: {
    textAlign: 'center'
  }
});