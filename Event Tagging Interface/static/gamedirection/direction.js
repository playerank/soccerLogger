
function radians_to_degrees(radians){
    var pi = Math.PI;
    return radians * (180/pi);
}

function setDirectionEvent( startX , startY, endX, endY){

    //calculates the direction of the event, using the polar quadrant divided into 16 sections
    //with the main axis X 
    //https://it.wikipedia.org/wiki/Rosa_dei_venti Rosa dei venti a 16 punte

    let deltaX = endX - startX
    let deltaY = endY-startY

    let angle = radians_to_degrees(Math.atan((deltaY)/(deltaX)))
    console.log(angle)

//da completare
    if(angle == 0){
        if(deltaX<0){
            console.log("O")
        }
        else{
            console.log("O")
        }
    }
    else{
        if(angle < 0 && angle > -45){
            console.log("ENE")
        }
        else{
            if(angle < -45 && angle > -90){
                console.log("NNE")
            }
        }
    }
    

}

