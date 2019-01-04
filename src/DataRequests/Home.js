import firebase from 'firebase';

export async function getCustomHomePage() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const uid = firebase.auth().currentUser.uid;
  
  const menuScreenRef = firestore.collection('user').doc(uid).collection('private').doc("menuScreen");
  return menuScreenRef.get().then(doc => {
    const menuScreen = doc.data();
    return menuScreen.icons;
  });
}