
function radians_to_degrees(radians){
    var pi = Math.PI;
    return radians * (180/pi);
}


    //parameters != null
    //calculate the real position in football field with pixels(x,y)
    //football field (height = 68mt , width = 105mt)

    //    (0,0)---------------- 100 = w ----------------|
    //      |
    //      100 = h        (standard notation)
    //      |

function convertX_px_mt(x, width_field) {
    
    let w = 100
    
    relationshipX = w * (x/width_field)
    
    return Math.round(relationshipX)
}

function convertY_px_mt(y, height_field) {
    
    let h = 100

    relationshipY = y * (h/height_field)
    
    return Math.round(relationshipY)
}

