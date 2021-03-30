
//to add a new event in the array
//only if the event != null
function add_to_array(obj, event, event_array){
  if (event != null){
    var newLenght = event_array.push(event)
  }
  return event_array    
}


function print_array(obj, event_array){
  event_array.forEach(element => {
    console.log(element)
  });
}


function save_events(match_name, event_array){

      url_address = "http://127.0.0.1:5000/"+match_name+"/update"
      
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
          console.log("no ok")
        }
        
      }); 
  
}