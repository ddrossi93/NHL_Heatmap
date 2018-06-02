shot_json = JSON.parse(shot_data)
goal_json = JSON.parse(goal_data)
hit_json = JSON.parse(hit_data)

console.log(shot_json);
console.log(goal_json);
console.log(hit_json);

var bardata = [];
for (i = 0; i < shot_json.length; i++) {
    bardata.push([shot_json[i].shooter, shot_json[i].length])
};
console.log(bardata)    