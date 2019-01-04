const XMLParser  = require('react-xml-parser');

export async function getStageCoach(fromID, toID) {
  return fetch('https://transportapi.com/v3/uk/public/journey/from/'+fromID+'/to/'+toID+'.json?app_id=c451b209&app_key=1b281efb170e289398e3baeae7d7f627&service=southeast',
        {
    method: 'GET',
    headers: {
        'x-requested-with': 'https://www.transportapi.com',
    }
  })
  .then((response) => {
    return response.json();
  }).then((res) => {
    return res.routes;
  })
}