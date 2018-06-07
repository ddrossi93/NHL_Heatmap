var $tbody = document.querySelector("tbody");
var shot_json = JSON.parse(shot_data);
var goal_json = JSON.parse(goal_data);
var hit_json = JSON.parse(hit_data);
var $pag = document.querySelector("#pagination");

var shot_row_count =  Object.keys(shot_json).length;

function renderTable() {
  $tbody.innerHTML = "";
  var page_count = shot_row_count / 10;
  var current_page = getCurrentPage();
  for (var i = (current_page.value * 10) - 10; i < current_page.value * 10; i++) {
    var row_count = 0;
    var entry = shot_json[i];
    var fields = Object.keys(entry);
    var $row = $tbody.insertRow(row_count);
    fields.shift();
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = entry[field];
    }
    row_count++;
  }
}

function paginateTable() {
  // TODO: make table length changeable by user
  var page_count = Math.floor(shot_row_count / 10);
  if (shot_row_count % 10 != 0 ){
    page_count++;
  }

  for (var i = 0; i < page_count; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    if (i == 0){
      a.setAttribute("class", "page-link"); // added line
      a.appendChild(document.createTextNode(i + 1));
      li.setAttribute("class", "page-item active");
      li.setAttribute("id", "page-" + (i+1));
      li.setAttribute("onclick", "changePage(this)");
      li.setAttribute("value", i + 1);
      li.appendChild(a);
      $pag.appendChild(li);
    }
    else{
      a.setAttribute("class", "page-link"); // added line
      a.appendChild(document.createTextNode(i + 1));
      li.setAttribute("class", "page-item");
      li.setAttribute("id", "page-" + (i+1));
      li.setAttribute("onclick", "changePage(this)");
      li.setAttribute("value", i + 1);
      li.appendChild(a);
      $pag.appendChild(li);
    }

  }
  console.log("here");
  return page_count;
}

function getCurrentPage() {
  var $active = document.getElementsByClassName("page-item active");
  return $active[0];
}

function changePage(page) {
  var current_page = getCurrentPage();
  var id = "#" + page.id;
  var newActive = document.querySelector(id);
  current_page.className = "page-item";
  newActive.className = "page-item active";
  console.log(current_page);
  renderTable();
}

paginateTable();
renderTable();
