
//attiva il microfono e ascolta cosa viene pronunciato, valuta se è un numero lo restituisce
//modificando il campo del numero del giocatore
function speech(obj, element, lan){
    
    //creating and setting some parameter
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

    var grammer = '#JSGF V1.0'

    const recognition = new SpeechRecognition()
    var speechRecognitionGrammerList = new SpeechGrammarList()
    
    speechRecognitionGrammerList.addFromString(grammer , 1)

    recognition.grammers = speechRecognitionGrammerList

    
    let language = lan
        
    recognition.continuous = false
    recognition.lang = language
    recognition.interimResults = false
    recognition.maxAlternative = 1


    //events
    recognition.onstart = function() {
        document.getElementById(element).style.backgroundColor = 'aquamarine' ;      
    }

    recognition.onresult = function(e){
        
        var tran = e.results[0][0].transcript
        var conf = e.results[0][0].confidence
        
        tran = convert_string_in_number(tran)

        while(tran == ""){}

        document.getElementById(element).style.backgroundColor = 'white' ;

        $("#player_number").val( tran )
        $("#player_name")
        
        return tran
    }

    recognition.onspeechend = function(){
        
        recognition.stop() 
    }
   
    recognition.start()
    
}


//attiva il microfono e ascolta cosa viene pronunciato, valuta se è un numero lo restituisce
//ad ogni diversa invocazione va a modificare campi specifici
function speech_duel(obj, element, lan){
        
    //creating and setting some parameter
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

    var grammer = '#JSGF V1.0'

    const recognition = new SpeechRecognition()
    var speechRecognitionGrammerList = new SpeechGrammarList()
    
    speechRecognitionGrammerList.addFromString(grammer , 1)

    recognition.grammers = speechRecognitionGrammerList

    let language = lan
        
    recognition.continuous = false
    recognition.lang = language
    recognition.interimResults = false
    recognition.maxAlternative = 1


    //events
    recognition.onstart = function() {
        
        if(element != "winner_player")
            document.getElementById(element).style.backgroundColor = 'aquamarine'
        
    }

    recognition.onresult = function(e){
        var tran = e.results[0][0].transcript
        var conf = e.results[0][0].confidence
        
        tran = convert_string_in_number(tran)
        console.log(tran)
        //select possession_player or recovery_player
        el = "#"+element
        $(el).val( tran )
                
        while(tran == ""){}

        document.getElementById(element).style.backgroundColor = 'white' ;

        if(element == "winner_player") 
            set_duel_winner(obj)
            
        return tran
    }

    recognition.onspeechend = function(){
        recognition.stop() 
    }
   
    recognition.start()
    
}


//seleziona il giocatore che ha vinto il duello
function set_duel_winner(obj){

    if($("#winner_player").val() == $("#possession_player_number").val()){
        $("#winner_player_number").val($("#possession_player_number").val())
        document.getElementById("possession_player_number").style.backgroundColor = "lightgreen"
        document.getElementById("recovery_player_number").style.backgroundColor = "white"
        set_color_row(this, "lightgreen")
        $("#event_result").val("SUCC") 
        $("#event_result").val(key_succ)
        //console.log($("#winner_player_number").val())
    }
    else{
        if($("#winner_player").val() == $("#recovery_player_number").val()){
            $("#winner_player_number").val($("#recovery_player_number").val())
            document.getElementById("recovery_player_number").style.backgroundColor = "LightCoral"
            document.getElementById("possession_player_number").style.backgroundColor = "white"
            set_color_row(this, "LightCoral")
            $("#event_result").val("FAIL")
            $("#event_result").val(key_fail)
            //console.log($("#winner_player_number").val())
        }
        else{
            
        }
    }

    
}

function convert_string_in_number(str){
    //transform the string number of speech recognition in int number
    console.log(str)
    let tran = str;
    tran = tran.toLowerCase(); 

    if(tran.length < 3){
        //0-1-2-3....99
        return parseInt(tran, 10);
    }
    else{
        //zero-uno-due....novantanove
        switch (tran) {
            case "uno":
                return 1;
                break;
            case "due":
                return 2;
                break;
            case "do it":
                return 2;
                break; 
            case "schuh":
                return 2;
                break;
            case "Joe":
                return 2;
                break; 
            case "chew":
                return 2;
                break; 
            case "Quattro":
                return 4;
                break; 
            case "sei":
                return 6;
                break; 
            case "can":
                return 10;
                break;
            case "tan":
                return 10;
                break; 
            case "xxx":
                return 30;
                break; 
            case "hey":
                return 8;
                break;  
             
             
            default:
                return NaN;
                break;   
        }
    }
}