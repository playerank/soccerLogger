var x = 400;
var y = x*65/100;
var startX;
var startY;
var endX;
var endY;
var table;
var canvas;

function preload() {
  
  field = loadImage("static/images/field.jpg");
}


function setup(){
  table = document.getElementById("myTable");
  
  canvas = createCanvas(x,y);

  pg = createGraphics(x,y);
}
function draw() {
  image(field, 0, 0, x,y);
  image(pg, 0, 0);
 
  // if(window.isActiveDraw === true){
  //    pg.line(window.cordinateX, window.cordinateY, window.cordinateEndX, window.cordinateEndY);
  //    window.cordinateX = window.cordinateEndX 
  //    window.cordinateY = window.cordinateEndY
  //    console.log("X = "+ window.cordinateX + "| Y = " +window.cordinateY)
  // }
  
  if(isActiveDraw){
    console.log(isActiveDraw)
    
    pg.line(cordinateX, cordinateY, cordinateEndX, cordinateEndY);
    cordinateX = cordinateEndX 
    cordinateY = cordinateEndY    
  }
}

function mousePressed(){
  pg.fill(255);
}
