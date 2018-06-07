Plotly.d3.json("/shots", function(error, response) {
  if (error)
    return console.warn(error);
  var vgk = 0;
  var was = 0;

  for (var i = 0; i < response.length; i++) {
    var team = response[i]['team'];
    if (team == "Vegas Golden Knights") {
      vgk++;
    } else {
      was++;
    }
  }
  data = [
    {
      "labels": [
        "Vegas Golden Knights", "Washington Capitals"
      ],
      "values": [
        vgk, was
      ],
      "type": "pie",
      marker: {
        colors: ["#B9975B", "#c8102E"]
      }
    }
  ];
  var PIE = document.getElementById('pie');
  Plotly.newPlot(PIE, data);
})

Plotly.d3.json("/shots", function(error, response) {
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
