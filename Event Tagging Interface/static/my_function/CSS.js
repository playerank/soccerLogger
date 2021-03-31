function set_color_row(obj, color){

    document.getElementById("name_event").style.backgroundColor = color
    document.getElementById("time_event_start").style.backgroundColor = color
    document.getElementById("time_event_end").style.backgroundColor = color
    document.getElementById("player_number").style.backgroundColor = color
    
    document.getElementById("active_team").style.backgroundColor = color
    document.getElementById("extra_tag").style.backgroundColor = color
}


function set_start_variable(obj, event){
    set_color_row(this,"white")
    document.getElementById('extra_tag').value = " "
    document.getElementById('event_result').value = " "
    count_pass = 1
    count_cross = 1
    count_shot = 1
    count_extra = 1
    count_duel = 1
    double_press = 0
    event_success = false
    start_stop = true
    isGoal = false
    
}