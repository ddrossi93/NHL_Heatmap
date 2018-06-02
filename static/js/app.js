var $teamInput = document.querySelector("#team");
var $playerInput = document.querySelector("#player");
var $updateBtn = document.querySelector("#update");

$updateBtn.addEventListener("click", handleUpdate);



function teamUpdate(team) {
  console.log("in team update");
  console.log(team);
  // populate player dropdown
  Plotly.d3.json("/shots/"+team, function(error, response) {
    console.log("dropdown");
    console.log(response);
    console.log(response[0]['player']);
    var $select = document.getElementById('player');
    $select.options.length = 0;
    var option = document.createElement("option");
    option.value = "all";
    option.innerHTML = "All";
    $select.appendChild(option);
    var players = [];
    for (var i = 0; i < response.length; i++) {
      var player = response[i]['player'];
      if (players.indexOf(player) < 0){
        var option = document.createElement("option");
        option.value = player;
        option.innerHTML = player;
        $select.appendChild(option);
        players.push(player);
      }

    }

  });
}

function handleUpdate() {
  var team = $teamInput.value.trim();
  var player = $playerInput.value.trim();
  var link = "";
 var link =  "/" + team + "/" + player;
 window.location.assign(link)
}
