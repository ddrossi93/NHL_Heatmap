shot_json = JSON.parse(shot_data)
goal_json = JSON.parse(goal_data)
hit_json = JSON.parse(hit_data)

console.log(shot_json);
console.log(goal_json);
console.log(hit_json);


  const w = 800
  const h = 336

  let svg = d3.select('body')
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
  
  const rightGoalLine = svg.append('rect')
    .attr('x', 756)
    .attr('y', 12)
    .attr('height', h-24)
    .attr('width', '4')
    .style('fill', 'red')
  
  const leftBlueLine = svg.append('rect')
    .attr('x', 288)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')
  
  const rightBlueLine = svg.append('rect')
    .attr('x', 504)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')

  const centerIce = svg.append('circle')
    .attr('cx', 398)
    .attr('cy', h/2)
    .attr('r', 65)
    .style('fill', 'blue')
    .style('opacity', 0.6)
  
  const bordercolor = 'black'
  const border = 8
  const borderPath = svg.append("rect")
    .attr('rx', 90)
    .attr('ry', 90)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style('opacity', 1)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);


const convertCoordinates = (coordinates, period) => {
  if (period === 2) {
    coordinates.x = coordinates.x * -1
    coordinates.y = coordinates.y * -1 }
  coordinates.x = coordinates.x + 99
  coordinates.y = (coordinates.y * -1) + 42
return coordinates }

// var grid_location = []
// for (i = 0; i < shot_json.length; i++) {
//   grid_location.push([shot_json[i].x, shot_json[i].y])
// }

// console.log(grid_location)

// var xScale = d3.scaleLinear()
//   .domain([-100, 100])
//   .range([0, w])

// var yScale = d3.scaleLinear()
//   .domain([-42.5, 42.5])
//   .range([0, h])

// var circles = svg.selectAll('circle')
//   .data(grid_location)
//   .enter()
//  .append('circle')
//   .attr('cx', function (d) {return xScale(d[0])})
//   .attr('cy', function (d) {return yScale(d[1])})
//   .attr('r', '9')
//   .attr('fill', 'blue')
//   .attr('opacity', 0.5)

console.log(shot_json[i].x)

var xScale = d3.scaleLinear()
  .domain([-100, 100])
  .range([0, w])

var yScale = d3.scaleLinear()
  .domain([-42.5, 42.5])
  .range([0, h])

var circles = svg.selectAll('circle')
  .data(shot_json)
  .enter()
 .append('circle')
  .attr('cx', function (d) {return xScale(shot_json.x)})
  .attr('cy', function (d) {return yScale(shot_json.y)})
  .attr('r', '9')
  .attr('fill', 'blue')
  .attr('opacity', 0.5)