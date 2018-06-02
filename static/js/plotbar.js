shot_json = JSON.parse(shot_data)
goal_json = JSON.parse(goal_data)
hit_json = JSON.parse(hit_data)

console.log(shot_json);
console.log(goal_json);
console.log(hit_json);

var data = [];
var data1 = [];
var data2 = [];
var team1 = "Vegas Golden Knights";
var team2 = "Washington Capitals";


for (i = 0; i < shot_json.length; i++) {
  data.push({"team":shot_json[i].team, "shooter": shot_json[i].shooter, "count": 1});
  if (data[i].team == team1)  {
    data1.push({"team":shot_json[i].team, "shooter": shot_json[i].shooter, "count": 1});
  }  
  else  {
    data2.push({"team":shot_json[i].team, "shooter": shot_json[i].shooter, "count": 1});  
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
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
var svg = d3.select("body").append("svg")
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
  chart.call(toolTip); 
};


function plotBar2()  {
  // set the dimensions and margins of the graph
  var margin = {top: 50, right: 40, bottom: 140, left: 60},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);
            
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");
  
  // get the data
  //d3.csv("filename.csv", function(error, data) {
  //  if (error) throw error;
  
  
    // format the data
  nest2.forEach(function(d) {
    d.value = +d.value;
  });

  nest2.sort(function(a, b) {
    return b.value - a.value;
  });

  // Scale the range of the data in the domains
  x.domain(nest2.map(function(d) { return d.key; }));
  y.domain([0, d3.max(nest2, function(d) { return d.value; })]);

  // append the rectangles for the bar chart
  svg.selectAll("rect")
      .data(nest2)
    .enter().append("rect")
      .attr("class", "bar2")
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
    chart.call(toolTip); 
  };

// call plot function
plotBar1();
plotBar2();