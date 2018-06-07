var path = window.location.pathname;
var paths = path.split("/");
var team = paths[1];


Plotly.d3.json("/shots/" + team,  function(error, response) {
  if (error)
    return console.warn(error);

  var players = []

  for (var i = 0; i < response.length; i++) {
    players.push(response[i]['player']);

  }

  var p = [...new Set(players)]
  var shots = [];
  for (let value of p) {
    var count = 0;
    for (var i = 0; i < players.length; i++) {
      if (players[i] === value) {
        count++;
      }
    }
    shots.push(count)
  }

data = [
  {
    "labels": p,
    "values": shots,
    "type": "pie"
  }
];
var PIE2 = document.getElementById('pie2');
Plotly.newPlot(PIE2, data);


});
