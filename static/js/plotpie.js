shot_json = JSON.parse(shot_data)
goal_json = JSON.parse(goal_data)
hit_json = JSON.parse(hit_data)

console.log(shot_json);
console.log(goal_json);
console.log(hit_json);

var data = [];
var data1 = []
var data2 = [];
var team1 = "Pittsburgh Penguins";
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

var text = "";

var width = 400;
var height = 400;
var thickness = 100;
var duration = 750;
var padding = 10;
var opacity = .8;
var opacityHover = 10;
var otherOpacityOnHover = .6;
var tooltipMargin = 13;

var radius = Math.min(width-padding, height-padding) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20);


function plotpie1()  {
  var svg = d3.select("#pie1")
  .append('svg')
  .attr('class', 'pie1')
  .attr('width', width)
  .attr('height', height);

  var g = svg.append('g')
  .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

  var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

  var pie1 = d3.pie()
  .value(function(d) { return d.value; })
  .sort(null);

  var path = g.selectAll('path')
    .data(pie1(nest1))
    .enter()
    .append("g")  
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .style('opacity', opacity)
    .style('stroke', 'white')
    .on("mouseover", function(d) {
        d3.selectAll('path')
          .style("opacity", otherOpacityOnHover);
        d3.select(this) 
          .style("opacity", opacityHover);

        let g = d3.select("svg")
          .style("cursor", "pointer")
          .append("g")
          .attr("class", "tooltip")
          .style("opacity", 0);
  
        g.append("text")
          .attr("class", "name-text")
          .text(`${d.data.key} (${d.data.value})`)
          .attr('text-anchor', 'middle');
      
        let text = g.select("text");
        let bbox = text.node().getBBox();
        let padding = 2;
        g.insert("rect", "text")
          .attr("x", bbox.x - padding)
          .attr("y", bbox.y - padding)
          .attr("width", bbox.width + (padding*2))
          .attr("height", bbox.height + (padding*2))
          .style("fill", "white")
          .style("opacity", 0.75);
      })
    .on("mousemove", function(d) {
          let mousePosition = d3.mouse(this);
          let x = mousePosition[0] + width/2;
          let y = mousePosition[1] + height/2 - tooltipMargin;
      
          let text = d3.select('.tooltip text');
          let bbox = text.node().getBBox();
          if(x - bbox.width/2 < 0) {
            x = bbox.width/2;
          }
          else if(width - x - bbox.width/2 < 0) {
            x = width - bbox.width/2;
          }
      
          if(y - bbox.height/2 < 0) {
            y = bbox.height + tooltipMargin * 2;
          }
          else if(height - y - bbox.height/2 < 0) {
            y = height - bbox.height/2;
          }
      
          d3.select('.tooltip')
            .style("opacity", 1)
            .attr('transform',`translate(${x}, ${y})`);
      })
    .on("mouseout", function(d) {   
        d3.select("svg")
          .style("cursor", "none")  
          .select(".tooltip").remove();
      d3.selectAll('path')
          .style("opacity", opacity);
      })
    .on("touchstart", function(d) {
        d3.select("svg")
          .style("cursor", "none");    
    })
    .each(function(d, i) { this._current = i; });

  let legend = d3.select("#pie1").append('div')
        .attr('class', 'legend')
        .style('margin-top', '30px');

  let keys = legend.selectAll('.key')
        .data(nest1)
        .enter().append('div')
        .attr('class', 'key')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-right', '20px');

      keys.append('div')
        .attr('class', 'symbol')
        .style('height', '10px')
        .style('width', '10px')
        .style('margin', '5px 5px')
        .style('background-color', (d, i) => color(i));

      keys.append('div')
        .attr('class', 'name')
        .text(d => `${d.key} (${d.value})`);

      keys.exit().remove();
};  


function plotpie2()  {
  var svg = d3.select("#pie2")
  .append('svg')
  .attr('class', 'pie2')
  .attr('width', width)
  .attr('height', height);

  var g = svg.append('g')
  .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

  var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

  var pie2 = d3.pie()
  .value(function(d) { return d.value; })
  .sort(null);

  var path = g.selectAll('path')
    .data(pie2(nest2))
    .enter()
    .append("g")  
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .style('opacity', opacity)
    .style('stroke', 'white')
    .on("mouseover", function(d) {
        d3.selectAll('path')
          .style("opacity", otherOpacityOnHover);
        d3.select(this) 
          .style("opacity", opacityHover);

        let g = d3.select("svg")
          .style("cursor", "pointer")
          .append("g")
          .attr("class", "tooltip")
          .style("opacity", 0);
  
        g.append("text")
          .attr("class", "name-text")
          .text(`${d.data.key} (${d.data.value})`)
          .attr('text-anchor', 'middle');
      
        let text = g.select("text");
        let bbox = text.node().getBBox();
        let padding = 2;
        g.insert("rect", "text")
          .attr("x", bbox.x - padding)
          .attr("y", bbox.y - padding)
          .attr("width", bbox.width + (padding*2))
          .attr("height", bbox.height + (padding*2))
          .style("fill", "white")
          .style("opacity", 0.75);
      })
    .on("mousemove", function(d) {
          let mousePosition = d3.mouse(this);
          let x = mousePosition[0] + width/2;
          let y = mousePosition[1] + height/2 - tooltipMargin;
      
          let text = d3.select('.tooltip text');
          let bbox = text.node().getBBox();
          if(x - bbox.width/2 < 0) {
            x = bbox.width/2;
          }
          else if(width - x - bbox.width/2 < 0) {
            x = width - bbox.width/2;
          }
      
          if(y - bbox.height/2 < 0) {
            y = bbox.height + tooltipMargin * 2;
          }
          else if(height - y - bbox.height/2 < 0) {
            y = height - bbox.height/2;
          }
      
          d3.select('.tooltip')
            .style("opacity", 1)
            .attr('transform',`translate(${x}, ${y})`);
      })
    .on("mouseout", function(d) {   
        d3.select("svg")
          .style("cursor", "none")  
          .select(".tooltip").remove();
      d3.selectAll('path')
          .style("opacity", opacity);
      })
    .on("touchstart", function(d) {
        d3.select("svg")
          .style("cursor", "none");    
    })
    .each(function(d, i) { this._current = i; });

    let legend = d3.select("#pie2").append('div')
    .attr('class', 'legend')
    .style('margin-top', '30px');

    let keys = legend.selectAll('.key')
        .data(nest2)
        .enter().append('div')
        .attr('class', 'key')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-right', '20px');

      keys.append('div')
        .attr('class', 'symbol')
        .style('height', '10px')
        .style('width', '10px')
        .style('margin', '5px 5px')
        .style('background-color', (d, i) => color(i));

      keys.append('div')
        .attr('class', 'name')
        .text(d => `${d.key} (${d.value})`);

      keys.exit().remove();
};  

plotpie1();
plotpie2();