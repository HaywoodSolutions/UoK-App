import firebase from 'firebase';

export async function setTimetableURL(timetableURL) {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const uid = firebase.auth().currentUser.uid;
  
  const userDoc = firestore.collection('users').doc(uid);
  
  return userDoc.update({
    timetableURL: timetableURL
  });
}