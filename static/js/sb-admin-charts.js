// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
shot_json = JSON.parse(shot_data)
goal_json = JSON.parse(goal_data)
hit_json = JSON.parse(hit_data)

var data = shot_json

console.log(shot_json);
console.log(goal_json);
console.log(hit_json);


  const w = 800
  const h = 336

function plotRink() {
  let svg = d3.select('#rink1')
  .append('svg')
  .attr('width', w+20)
  .attr('height', h+20)

  const redLine = svg.append('rect')
    .attr('x', 396)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'red')
  
  const leftGoal = svg.append('rect')
    .attr('x', 36)
    .attr('y', (h/2)-12)
    .attr('height', 24)
    .attr('width', 16)
    .style('fill', 'black')
    .style('stroke-width', 16)
  
  const rightGoal = svg.append('rect')
    .attr('x', 756)
    .attr('y', (h/2)-12)
    .attr('height', 24)
    .attr('width', 16)
    .style('fill', 'black')
    .style('stroke-width', 16)
  
  const leftGoalLine = svg.append('rect')
    .attr('x', 48)
    .attr('y', 12)
    .attr('height', h-24)
    .attr('width', '4')
    .style('fill', 'red')

  const leftTopFaceOffCircle = svg.append('circle')
    .attr('cx', 144)
    .attr('cy', 84)
    .attr('r', 45)
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  const leftTopFaceOffSpot = svg.append('circle')
    .attr('cx', 144)
    .attr('cy', 84)
    .attr('r', 6)
    .attr('fill', 'red')

  const leftBottomFaceOffCircle = svg.append('circle')
    .attr('cx', 144)
    .attr('cy', 252)
    .attr('r', 45)
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  const leftBottomFaceOffSpot = svg.append('circle')
    .attr('cx', 144)
    .attr('cy', 252)
    .attr('r', 6)
    .attr('fill', 'red')

  const rightGoalLine = svg.append('rect')
    .attr('x', 756)
    .attr('y', 12)
    .attr('height', h-24)
    .attr('width', '4')
    .style('fill', 'red')

  const rightTopFaceOffCircle = svg.append('circle')
    .attr('cx', 656)
    .attr('cy', 84)
    .attr('r', 45)
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  const rightTopFaceOffSpot = svg.append('circle')
    .attr('cx', 656)
    .attr('cy', 84)
    .attr('r', 6)
    .attr('fill', 'red')

  const rightBottomFaceOffCircle = svg.append('circle')
    .attr('cx', 656)
    .attr('cy', 252)
    .attr('r', 45)
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  const rightBottomFaceOffSpot = svg.append('circle')
    .attr('cx', 656)
    .attr('cy', 252)
    .attr('r', 6)
    .attr('fill', 'red')
  
  const leftBlueLine = svg.append('rect')
    .attr('x', 288)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')

  const leftCircleTop = svg.append('circle')
    .attr('cx', 305)
    .attr('cy', 84)
    .attr('r', 6)
    .attr('fill', 'red')
    .attr('opacity', 1)

  const leftCircleBottom = svg.append('circle')
    .attr('cx', 305)
    .attr('cy', 252)
    .attr('r', 6)
    .attr('fill', 'red')
    .attr('opacity', 1)
  
  const rightBlueLine = svg.append('rect')
    .attr('x', 504)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')

  const rightCircleTop = svg.append('circle')
    .attr('cx', 487)
    .attr('cy', 84)
    .attr('r', 6)
    .attr('fill', 'red')
    .attr('opacity', 1)

  const rightCircleBottom = svg.append('circle')
    .attr('cx', 487)
    .attr('cy', 252)
    .attr('r', 6)
    .attr('fill', 'red')
    .attr('opacity', 1)

  const centerIceCircle = svg.append('circle')
    .attr('cx', 398)
    .attr('cy', h/2)
    .attr('r', 65)
    .attr('stroke', 'blue')
    .attr('fill', 'none')
    .attr('stroke-width', 2)

  const centerIceSpot = svg.append('circle')
    .attr('cx', 398)
    .attr('cy', h/2)
    .attr('r', 5)
    .attr('fill', 'grey')

  
  const bordercolor = 'black'
  const border = 8
  const borderPath = svg.append("rect")
    .attr('rx', 90)
    .attr('ry', 90)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h+1)
    .attr("width", w+1)
    .style('opacity', 1)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);


  var xScale = d3.scaleLinear()
  .domain([-100, 100])
  .range([0, w])

  var yScale = d3.scaleLinear()
    .domain([-42.5, 42.5])
    .range([0, h])

var Vegas = []
var Washington = [];
var team1 = "Vegas Golden Knights";
var team2 = "Washington Capitals";

for (i=0; i < shot_json.length; i++) {
  if (data[i].team == team1)  {
    Vegas.push({"team":shot_json[i].team, "shooter": shot_json[i].shooter, "event": shot_json[i].event,"x": shot_json[i].x, "y": shot_json[i].y});
  }  
  else  {
    Washington.push({"team":shot_json[i].team, "shooter": shot_json[i].shooter, "event": shot_json[i].event, "x": shot_json[i].x, "y": shot_json[i].y});  
  }  
};  

console.log(Vegas);
console.log(Washington);

  var circles = svg.selectAll('.washington')
    .data(Washington)
    .enter()
   .append('circle')
    .attr('cx', function (d) {return xScale(d.x)})
    .attr('cy', function (d) {return yScale(d.y)})
    .attr('r', '7.5')
    .attr('fill', '#041E42')
    .attr('opacity', 0.8)
    .append('title')
      .text(function (d) {return d.team + '\n' + d.shooter})

  var circles = svg.selectAll('.vegas')
    .data(Vegas)
    .enter()
   .append('circle')
    .attr('cx', function (d) {return xScale(d.x)})
    .attr('cy', function (d) {return yScale(d.y)})
    .attr('r', '7.5')
    .attr('fill', '#B9975B')
    .attr('opacity', 0.8)
    .append('title')
      .text(function (d) {return d.team + '\n' + d.shooter})
}

plotRink();


// -- Table
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

// -- Bar Chart Example
var data = [];
var data1 = [];
var data2 = [];
var team1 = "Vegas Golden Knights";
var team2 = "Washington Capitals";


for (i = 0; i < shot_json.length; i++) {
  data.push({"team":shot_json[i].team, "shooter": shot_json[i].player, "count": 1});
  if (data[i].team == team1)  {
    data1.push({"team":shot_json[i].team, "shooter": shot_json[i].player, "count": 1});
  }  
  else  {
    data2.push({"team":shot_json[i].team, "shooter": shot_json[i].player, "count": 1});  
  }  
};  
console.log("data:");
console.log(data);
console.log("data1:");
console.log(data1);
console.log("data2:");
console.log(data2);

// all shots nested data
var nest = d3.nest()
  .key(function(d) { return d.shooter; })
  .rollup(function(leaves) { return leaves.length;})
  .entries(data);

  console.log("nest:");
  console.log(nest);

// team1 nested data
var nest1 = d3.nest()
.key(function(d) { return d.shooter; })
.rollup(function(leaves) { return leaves.length;})
.entries(data1);

console.log("nest1:");
console.log(nest1);  


// team2 nested data
var nest2 = d3.nest()
.key(function(d) { return d.shooter; })
.rollup(function(leaves) { return leaves.length;})
.entries(data2);

console.log("nest2:");
console.log(nest2);


function plotBar1()  {
// set the dimensions and margins of the graph
var margin = {top: 50, right: 40, bottom: 140, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.1);
var y = d3.scaleLinear()
          .rangeRound([height, 0]);
          
let svg = d3.select('#bar1').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
//d3.csv("filename.csv", function(error, data) {
//  if (error) throw error;


  // format the data
  nest1.forEach(function(d) {
    d.value = +d.value;
  });

  nest1.sort(function(a, b) {
    return b.value - a.value;
  });

  // Scale the range of the data in the domains
  x.domain(nest1.map(function(d) { return d.key; }));
  y.domain([0, d3.max(nest1, function(d) { return d.value; })]);

  // append the rectangles for the bar chart
  svg.selectAll("rect")
      .data(nest1)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });



  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");;

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // add y axis label
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Total Shots per player");     


  // Append a group to the SVG area
  var chart = svg.append("g");

  //Append a div to the chart to create tooltips, and assign it a class.
  d3.select(".chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

  // Initialize tooltip 
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([0, -20])
    .html(function(d) {
      var key = d.key;
      return (key);
    });

  // Create tooltip
  svg.call(toolTip); 
  
};

plotBar1();
// function plotBar2()  {
//   // set the dimensions and margins of the graph
//   var margin = {top: 50, right: 40, bottom: 140, left: 60},
//       width = 960 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;
  
//   // set the ranges
//   var x = d3.scaleBand()
//             .range([0, width])
//             .padding(0.1);
//   var y = d3.scaleLinear()
//             .range([height, 0]);
            
//   var svg = d3.select("body").append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", 
//             "translate(" + margin.left + "," + margin.top + ")");
  
//   // get the data
//   //d3.csv("filename.csv", function(error, data) {
//   //  if (error) throw error;
  
  
//     // format the data
//   nest2.forEach(function(d) {
//     d.value = +d.value;
//   });

//   nest2.sort(function(a, b) {
//     return b.value - a.value;
//   });

//   // Scale the range of the data in the domains
//   x.domain(nest2.map(function(d) { return d.key; }));
//   y.domain([0, d3.max(nest2, function(d) { return d.value; })]);

//   // append the rectangles for the bar chart
//   svg.selectAll("rect")
//       .data(nest2)
//     .enter().append("rect")
//       .attr("class", "bar2")
//       .attr("x", function(d) { return x(d.key); })
//       .attr("width", x.bandwidth())
//       .attr("y", function(d) { return y(d.value); })
//       .attr("height", function(d) { return height - y(d.value); });
  
  
  
//     // add the x Axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .selectAll("text")
//           .style("text-anchor", "end")
//           .attr("dx", "-.8em")
//           .attr("dy", ".15em")
//           .attr("transform", "rotate(-65)");;
  
//     // add the y Axis
//     svg.append("g")
//         .call(d3.axisLeft(y));

//     // add y axis label
//     svg.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x",0 - (height / 2))
//     .attr("dy", "1em")
//     .style("text-anchor", "middle")
//     .text("Total Shots per player");     
  
  
//     // Append a group to the SVG area
//     var chart = svg.append("g");
  
//     //Append a div to the chart to create tooltips, and assign it a class.
//     d3.select(".chart")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 1);
  
//     // Initialize tooltip 
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([0, -20])
//       .html(function(d) {
//         var key = d.key;
//         return (key);
//       });
  
//     // Create tooltip
//     chart.call(toolTip); 
//   };

// call plot function

// plotBar2();
// var ctx = document.getElementById("myBarChart");
// var myLineChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [{
//       label: "Revenue",
//       backgroundColor: "rgba(2,117,216,1)",
//       borderColor: "rgba(2,117,216,1)",
//       data: [4215, 5312, 6251, 7841, 9821, 14984],
//     }],
//   },
//   options: {
//     scales: {
//       xAxes: [{
//         time: {
//           unit: 'month'
//         },
//         gridLines: {
//           display: false
//         },
//         ticks: {
//           maxTicksLimit: 6
//         }
//       }],
//       yAxes: [{
//         ticks: {
//           min: 0,
//           max: 15000,
//           maxTicksLimit: 5
//         },
//         gridLines: {
//           display: true
//         }
//       }],
//     },
//     legend: {
//       display: false
//     }
//   }
// });
// // -- Pie Chart Example
// var ctx = document.getElementById("myPieChart");
// var myPieChart = new Chart(ctx, {
//   type: 'pie',
//   data: {
//     labels: ["Blue", "Red", "Yellow", "Green"],
//     datasets: [{
//       data: [12.21, 15.58, 11.25, 8.32],
//       backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
//     }],
//   },
// });
