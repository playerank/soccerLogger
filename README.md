# Soccer Logger
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![codecov.io Code Coverage](https://img.shields.io/codecov/c/github/dwyl/hapi-auth-jwt2.svg?maxAge=2592000)](https://codecov.io/github/dwyl/hapi-auth-jwt2?branch=master)


<p align="center">
    <img src="/Scheme/Logo1.png" width="300" height="300">
</p>


# Motivation

To provide a football event tracking tool with a logic similar to that of the most popular football games (Fifa, Pes). 
There are already platforms that deal with tracking this data but they often have high costs and therefore are accessible only to large teams, this has created the idea of ​​an open source software accessible to all competitive levels.

# Description

The code in this repository implements **Event Tagging Interface**, a web application :computer: which allows a user to define temporal window of events from soccer :soccer: video broadcasts using a gamepad :joystick:. 


## Installation

# Normal User

### Windows
1.Check if Python is already installed in your pc<br>
1.1. open prompt 
```sh
$ py --version
```
1.2. if the version is 3.9.4 or later, it's ok.
  else download and instal [python](https://www.python.org/downloads/) <br/>
2. Download and Dezip SoccerLogger [github](https://github.com/playerank/soccerLogger)<br/>
![download](/Scheme/download.PNG)
3. Now install all necessary dependencing with [pip](https://pypi.org/project/pip/), automatically installed with python 3.9.4(```$ py -m pip --version ```)<br/>
```sh
$ py -m pip install -r requirements.txt
```


### Ubuntu<br/>
Coming Soon
:joy:

### macOS<br/>
Coming Soon
:joy:


# Developer User
Is possible clone the repository github in your IDE. 
```sh
$ git clone https://github.com/playerank/soccerLogger.git
```
When you installed all dependencing you can run or modify the program. <br/>
The program is divide into:
Function | File
-------- | ----
Web Pages manager | events_tagging_dashboard.py
GamePad controller | templeates/events_tagging.html
Second Interface | templeates/events_tagging.html
First Interface | templates/home.html
Speech Recognition | static/speech_recognition/SR.js
Coordinate drawing control | static/gamedirection/direction.js
"" | static/gamedirection/sketch.js
Customizable files | static/game/
Save array management | static/my_json/data_json.js

# Run the interface

1.Move in Event tagging interface<br/>
```sh
$ cd "Event Tagging Interface"
```
2.Run<br/>
```sh
$ python events_tagging_dashboard.py
```
Once launched, on your shell you should have a success message such as the following:
![bash](/Scheme/bash.png)  
3.Now, you can access the interface from a browser, by accessing the following url: ```http://127.0.0.1:5000```<br/>                                                                   
4.Select file json with propertys of the match and file mp4 with the match video, when upload is complete ( an alert comes out ) press Start Game.

![first interface](/Scheme/upload_files.png)

## Now select all tags

![event](/Scheme/envet_interface.png)

![Commands](/Scheme/controller.jpg)
Enjoy :smiley: :thumbsup:<br/>


# Demo :point_right: Watch it <a href="https://youtu.be/EMZKAvcXufA">here</a>.


6.Once the matches are annotated, click on the save buttom and a json file with the annotation is saved in the path Event Tagging Interface/Data/"Name match"/json/.

## Feature

- [x] Gamepad control
- [x] Customizable Event types
- [x] No login required
- [x] Open Source
- [ ] Offline support (Speech Recogintion does not go offline)
- [ ] Auto updates

# Customizable

## Tags

Events which can be chosen are parameterizable, the file soccerLogger-main\Event Tagging Interface\static\game\extra_tag\extra_tag.json contains all keys used in the program. <br/>
Standard Events are 
- "Pass"
- "Cross"
- "Shot"
- "Duel"
- "Game Stop"
to extends and personalized all these events there are multiple Extra Tags for each events (in the same file).

![extra_tag](/Scheme/extra_tag.png)

## Match

The properties of the match (bech, lineup, name teams... etc) are editing when you upload the json file in first interface.<br/>
there is a sample file of the structure required for the program to function properly [prova_match.json]

![prova_match](/Scheme/prova_match.png)

# Library
flask: control all html pages with they requests "GET" - "POST" and interfaces [flask](https://flask.palletsprojects.com/en/1.1.x/)<br/>
p5: draws the starting and ending position on the field [p5](https://p5js.org/)<br/>
gamecontroller: capture and manage all the buttons pressed on the gamepad [gamecontroller](https://github.com/alvaromontoro/gamecontroller.js)<br/>
speech recognition: capture the microphone to select player number [speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)<br/>
Besides these there are some personal functions in this project.

# Tests
All tests are manualy, I try all type of posible combination of button, but if ther is an error, plese write me.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

# Authors and acknowledgement
- authors: Andrea Gonnella - email: gonnella_andrea@yahoo.it
- supervisors:	
	- Paolo Cintia, paolo.cintia@isti.cnr.it
	- Luca Pappalardo, luca.pappalardo@isti.cnr.it

# Support
if you need, you can email at gonnella_andrea@yahoo.it.

# Video and Music
- [Music](https://www.free-stock-music.com/)
- [Video](https://www.videvo.net/stock-video-footage/football/)
- [Video_Editin](https://www.adobe.com/it/products/premiere.html)
- [Video_Recording](https://obsproject.com/)

