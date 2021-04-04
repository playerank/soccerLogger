
function radians_to_degrees(radians){
    var pi = Math.PI;
    return radians * (180/pi);
}

function setDirectionEvent( startX , startY, endX, endY, width_field, height_field){
    //parameters != null
    //calculate the real position in football field with pixels(x,y)
    //football field (height = 68mt , width = 105mt)

    //    (0,0)---------------- 105 ----------------|
    //      |
    //      68
    //      |


    console.log(width_field)
    console.log(height_field)
    console.log(startX)
    
    relationshipX = 105/width_field
    relationshipY = 68/height_field 

    console.log(startX*relationshipX)
    console.log(startY*relationshipY)
    console.log(endX*relationshipX)
    console.log(endY*relationshipY)   

}

function convertX_px_mt(x, width_field) {
    
    relationshipX = 105/width_field
    return Math.round(x*relationshipX)
}

function convertY_px_mt(y, height_field) {
    relationshipY = 68/height_field
    return Math.round(y*relationshipY)
}

