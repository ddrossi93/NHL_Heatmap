var $tbody = document.querySelector("tbody");
var shot_json = JSON.parse(shot_data);
var goal_json = JSON.parse(goal_data);
var hit_json = JSON.parse(hit_data);

function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < shot_json.length; i++) {
    var entry = shot_json[i];
    var fields = Object.keys(entry);
    var $row = $tbody.insertRow(i);
    fields.shift();
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = entry[field];
    }
  }
}

renderTable()
