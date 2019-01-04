import firebase from 'firebase';
import { AsyncStorage } from "react-native";

export async function getTimeTable() {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  
  const uid = firebase.auth().currentUser.uid;
  
  const userRef = firestore.collection('user').doc(uid);
  return userRef.get().then(doc => {
    const userData = doc.data();
    const timetableID = userData.timtableID;
    if (timetableID) {
      return loadTimeTable(timetableID);
    } else {
      return {
        storedURL: false
      };
    }
    return userData.timtable;
  });
}

function loadTimeTable(id) {
  const getWeekNo = function (d2) {
    var t2 = d2.getTime();
    var t1 = new Date("Mon Dec 29 1969 00:00:00").getTime();
    return parseInt((t2-t1)/(24*3600*1000*7));
  }
  
  return fetch('https://www.kent.ac.uk/student/my-study/app/data/weekDates.json')
    .then((response) => {
       return response.json();
    }).then((weeks) => {
      weeks = weeks.response;
      weeks = weeks.weekDates;
      weeks = weeks.week;
      var weekObj = {};
      for (var weekID in weeks) {
        const week = weeks[weekID];
        const weekNo = getWeekNo(new Date(week.week_beginning_date.replace(":000", "").replace("Feb4", "Feb 4")));
        weekObj[weekNo] = week.week_beginning;
      }
      return weekObj;
    }).then((weekObj) => {
      return fetch('https://www.kent.ac.uk/timetabling/ical/'+id+'.ics')
        .then((response) => {
           return response.text();
        }).then((response) => {
            var lines = response.split("\n");
            var events = {}
            var events_i = 0;
            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            let currentWeek = null;
            let weekCount;
            for (i = 0; i < lines.length; i++) {
              if (lines[i].includes('DTSTART')) {
                var date = lines[i].split(":");
                var dateObj = new Date(date[1].substr(0,4) + "/" + date[1].substr(4,2)  + "/" + date[1].substr(6,2) + " " + date[1].substr(9,2)+ ":" + date[1].substr(11,2)+":00");
                currentWeek = getWeekNo(dateObj); 
                if (!events[currentWeek]) {
                  events[currentWeek] = [];
                }
                weekCount = events[currentWeek].length;
                let dayNo = (dateObj.getDay() + 6) % 7
                events[currentWeek][weekCount] = {
                  day: days[dayNo],
                  dayNo: dayNo,
                  startHour: dateObj.getHours(),
                  key: currentWeek+"."+dayNo+"."+dateObj.getHours()
                };
                events[currentWeek][weekCount]["startDate"] = date[1];
              } else if (lines[i].includes('DTEND')) {
                var date = lines[i].split(":");
                var dateObj = new Date();
                dateObj.setHours(parseInt(date[1].substr(9,2)));
                events[currentWeek][weekCount]["endHour"] = dateObj.getHours();
                events[currentWeek][weekCount]["endDate"] = date[1];
              } else if (lines[i].includes('SUMMARY')) {
                var title = lines[i].split(":");
                events[currentWeek][weekCount]["title"] = title[1];
              } else if (lines[i].includes('LOCATION')) {
                var location = lines[i].split(":");
                events[currentWeek][weekCount]["location"] = location[1];
              } else if (lines[i].includes('END:VEVENT')) {
                events_i++;
              }
            }
            return {
              storedURL: true,
              timetable: {
                rawWeeks: events,
                weekNames: weekObj,
                currentWeek: getWeekNo(new Date())
              }
            };
          }
        )
    });
}