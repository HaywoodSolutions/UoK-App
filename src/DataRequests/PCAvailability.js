export async function loadPcData(campus) {
  return fetch('https://api.kent.ac.uk/api/v1/pcs/'+campus+'/free',
  {
    method: 'GET'
  })
    .then((response) => {
    return response.json();
  })
    .then((data) => {
    console.log(data);
    var buildings = {}, building_order = [];
    for(var i in data){
        var pc = data[i];
        // Init array
        if(typeof buildings[pc.group] == 'undefined'){
            buildings[pc.group] = [];
            //nasty hack
            if(pc.group != "Jennison"){
                building_order.push( pc.group );
            }
        }
        //nasty hack
        if(pc.group != "Jennison"){
            buildings[pc.group].push(pc);
        }
    }
    // Unknown? ignore em
    delete buildings['unknown'];
    // Sort buildings
    building_order.sort();
    console.log({
      building_order: building_order,
      buildings: buildings
    });
    
    return {
      building_order: building_order,
      buildings: buildings
    }
  })
};

export const campuses = [
  "canterbury",
  "medway"
];


