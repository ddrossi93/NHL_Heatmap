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
