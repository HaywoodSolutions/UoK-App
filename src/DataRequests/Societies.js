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
          description: society.description,
          coverURL: society.coverURL,
          logoURL: society.logoURL,
        })
    });
    return data;
  }).then(data => {
    const list = [];
    for (var society of data) {
      list.push({
        title: society.name,
        subtitle: society.description,
        illustration: society.coverURL
      })
    }
    return list;
  });
}