// populate option dropdown
Plotly.d3.json("/shots", function(error, response) {
  console.log("dropdown");
  console.log(response);
  console.log(response[1]['player']);
  var $select = document.getElementById('player')
  for (var i = 0; i < response.length; i++) {
    var option = document.createElement("option");
    option.value = response[i]['player'];
    option.innerHTML = response[i]['player']

    $select.appendChild(option);
  }

});
