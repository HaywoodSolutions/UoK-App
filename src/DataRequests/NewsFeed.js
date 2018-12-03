import firebase from 'firebase';

export async function getNewsFeed() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const newsFeedRef = firestore.collection('NewsFeed');
  
  return newsFeedRef.get().then(querySnapshot => {
    let messages = [];
    querySnapshot.forEach(doc => {
      messages.push(doc.data());
    });
    return messages;
  });
}