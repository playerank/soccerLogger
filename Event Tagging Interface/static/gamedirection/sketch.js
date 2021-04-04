// var x = 400;
// var y = x*65/100;

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

  // x = document.getElementById("myTable").getBoundingClientRect().right - document.getElementById("myTable").getBoundingClientRect().left 
  // y = document.getElementById("myVideo").getBoundingClientRect().bottom - document.getElementById("table_div").getBoundingClientRect().top + document.getElementById("table_div").getBoundingClientRect().bottom 
  

  pos_y = document.getElementById("myVideo").getBoundingClientRect().height/2 + document.getElementById("myVideo").getBoundingClientRect().top + document.getElementById("table_container").getBoundingClientRect().height
  pos_x = document.getElementById("myTable").getBoundingClientRect().left

  x = document.getElementById("myTable").getBoundingClientRect().width
  y = document.getElementById("cells_row").getBoundingClientRect().top - pos_y + 120
  
  
   
  canvas = createCanvas(x,y);
   
  canvas.position(pos_x , pos_y)
  
  
  resetSketch();
}

function draw() {

  pos_y = document.getElementById("myVideo").getBoundingClientRect().height/2 + document.getElementById("myVideo").getBoundingClientRect().top + document.getElementById("table_container").getBoundingClientRect().height
  pos_x = document.getElementById("myTable").getBoundingClientRect().left

  width_image = document.getElementById("myTable").getBoundingClientRect().width
  height_image = document.getElementById("cells_row").getBoundingClientRect().top - pos_y 

  image(field, 0, 0, width_image, height_image);
  image(pg, 0, 0);

  
  
  if(isActiveDraw){
    strokeWeight(10);
    pg.fill(255,0,255)
    temp = pg.line(cordinateX, cordinateY, cordinateEndX, cordinateEndY);

    cordinateX = cordinateEndX 
    cordinateY = cordinateEndY


  }
  
  if(resetDraw){
    strokeWeight(10);
    
    pg.line(cordinateX, cordinateY, cordinateEndX, cordinateEndY);
    cordinateX = cordinateEndX 
    cordinateY = cordinateEndY 

    resetSketch()
  }
}



function resetSketch(){
    
  pos_y = document.getElementById("myVideo").getBoundingClientRect().height/2 + document.getElementById("myVideo").getBoundingClientRect().top + document.getElementById("table_container").getBoundingClientRect().height
  pos_x = document.getElementById("myTable").getBoundingClientRect().left

  x = document.getElementById("myTable").getBoundingClientRect().width
  y = document.getElementById("cells_row").getBoundingClientRect().top - pos_y + 120
  
  

  pg = createGraphics(x,y);
   
  if(start_position){
    pg.fill(0,255,0);
  }  else{
      if(end_position){
        pg.fill(255,0,0);
      }
      else{
        pg.fill(255);
      }
  } 
  pg.ellipse(cordinateX, cordinateY, 10)
}