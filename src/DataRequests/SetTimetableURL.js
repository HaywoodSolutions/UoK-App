import firebase from 'firebase';

export async function setTimetableURL(timtableID) {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const uid = firebase.auth().currentUser.uid;
  
  const userDoc = firestore.collection('users').doc(uid);
  
  return userDoc.update({
    timtableID: timtableID
  });
}