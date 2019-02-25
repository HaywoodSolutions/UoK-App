import firebase from 'firebase';

export async function getMeetings() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const meetingsRef = firestore.collection('meetings');
  
  return meetingsRef.get().then(querySnapshot => {
    let meetings = [];
    querySnapshot.forEach(doc => {
        meetings.push(doc.data());
    });
    return meetings;
  });
}