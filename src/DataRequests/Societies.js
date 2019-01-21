import firebase from 'firebase';

export async function getSocietyList() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const societyListRef = firestore.collection('societies');
  return societyListRef.get().then(querySnapshot => {
    let data = [];
    querySnapshot.forEach(function(doc) {
        let society = doc.data();
        data.push({
          societyID: doc.id,
          name: society.name,
          title: society.name,
          subtitle: society.description,
          description: society.description,
          illustration: society.coverURL,
          coverURL: society.coverURL,
          logoURL: society.logoURL,
          type: society.type
        })
    });
    return data;
  });
}

export async function getSocietyCategoryList(type) {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const societyListRef = firestore.collection('societies').where('type', '==', type);
  return societyListRef.get().then(querySnapshot => {
    let data = [];
    querySnapshot.forEach(function(doc) {
        let society = doc.data();
        data.push({
          societyID: doc.id,
          name: society.name,
          title: society.name,
          subtitle: society.description,
          description: society.description,
          illustration: society.coverURL,
          coverURL: society.coverURL,
          logoURL: society.logoURL,
          type: society.type
        })
    });
    return data;
  });
}


export async function getSociety(societyID) {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const societyRef = firestore.collection('societies').doc(societyID);
  return societyRef.get().then(doc => {
    let society = doc.data();
    return society;
  });
}