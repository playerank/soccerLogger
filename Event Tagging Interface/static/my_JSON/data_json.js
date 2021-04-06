
//to add a new event in the array
//only if the event != null
function add_to_array(obj, event, event_array){
  if (event != null){
    event_array.push(event)
  }
  return event_array    
}

function remove_to_array(obj, id, event_array){
  let find = true
  let temp
  for(i=0 ; i < event_array.length && find ; i++ ){
    // temp = JSON.stringify(event_array[i])
    // console.log(temp.event_id)
    if(JSON.parse(JSON.stringify(event_array[i])).event_id == id){
      event_array[i] = {}
    }
  }
  return event_array
}


function print_array(obj, event_array){
  event_array.forEach(element => {
    if(element != undefined)
      console.log(element)
  });
}


function save_events(match_name, event_array){

      url_address = "http://127.0.0.1:5000/"+match_name+"/update"
      print(event_array)
      $.ajax({
        type: "POST",
        data: JSON.stringify(event_array),
        url: url_address,
        dataType: 'json',
        contentType: 'application/json',
        success: function (e) {
          console.log("ok");
        },
        error: function(e){
          console.log(e)
        }
        
      }); 
  
}