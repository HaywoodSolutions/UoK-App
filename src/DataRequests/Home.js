import firebase from 'firebase';

export async function getCustomHomePage() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const uid = firebase.auth().currentUser.uid;
  
  let renameScreens = {
    "Lectures": "Lecture View",
    "Timetable": "Timetable",
    "NewsFeed": "Newsfeed",
    "StudentRadio": "Student Radio",
    "StageCoach": "Buses",
    "Settings": "Settings",
    "PCAvailability": "PC Availablility",
    "Societies": "Societies",
    "TechSupport": "Tech Support",
    "Inquire": "Inquire Media",
    "SDS": "SDS",
    "Articles": "Articles",
    "CampusShuttle": "Campus Shuttle Bus",
    "PrintingCredits": "Printing Credits",
  }
  
  let myDepartment = "SoC";
  
  const menuScreenRef = firestore.collection('constants').doc("system");
  return menuScreenRef.get().then(doc => {
    const system = doc.data();
    const routes = [];
    
    for (let screenID in system.services) {
      if (system.services[screenID].global || system.services[screenID].departments[myDepartment])
        routes.push({
          page: screenID,
          name: renameScreens[screenID] ? renameScreens[screenID] : screenID
        });
    }
    routes.order
    return routes;
  });
}