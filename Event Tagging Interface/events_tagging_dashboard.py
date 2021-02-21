import os
import json
import pandas as pd
import team

from flask import Flask
from flask import request
from flask import redirect 
from flask import url_for
from flask import render_template 
from last_file_update import last_modified_fileinfo

app = Flask(__name__)

'''
Create a list with names of matches whose videos are present in the static folder.
Create also a dictionary with names of events
'''
files_list = os.listdir("./static")
matches_value = []
drop_value = []
dict_name = dict()

if not 'Data' in os.listdir():
    	os.mkdir('Data')
    	os.mkdir('Data/teams')

for file in files_list:
	if file.split(".")[-1] == "mp4":
		matches_value.append(file.split(".")[0])

for match in matches_value:
	names = []
	values = match.split("_")
	name = values[0] + ' vs. ' + values[1] + ' ' + values[2] + '° Tempo'
	name_events = match + '_Events'
	names.append(name)
	names.append(name_events)
	drop_value.append(names)
	dict_name[name_events] = name + " (Events)"
	
'''
When this script runs the command line show an address "127.0.0.1:5000/".
When the user copy and paste this link in their browser the init function
checks if csv files corresponding to names of matches in the static folder are present. 
If csv files are not present, they will be created.
After that the init function load all the data relative
to the first half of the first match in the static folder (in alphabetical order).
'''	
@app.route('/')
def init():

	for match in matches_value:
    	
		csv_file_events = 'Data/' + match + '_Events.csv'

		if os.path.isfile(csv_file_events) == False:
			print(match + " Events CSV creation!")
			header = ["#;Event;Start;End;Player;Team"]
			with open(csv_file_events, "w") as events_file:
				events_file.writelines(header[0] + "\n")

	return redirect("/" + matches_value[0] + "_Events", code=302)

'''
The function matchView allows to change the events and the video to show.
'''
@app.route('/<match>')
def matchView(match):

	match_data = []
	csv_file = 'Data/' + match + '.csv'
	
	match_code = match.split("_") 

	name_team_A = match_code[0]
	name_team_B = match_code[1]

	#squad of the players
	squad_A = team.squad("Data/teams/"+ name_team_A +".csv")
	squad_B = team.squad("Data/teams/"+ name_team_B +".csv")

	match_code = match_code[0] + "_" + match_code[1] + "_" + match_code[2]

	date_last_update = ""# last_modified_fileinfo(csv_file)
	
	with open(csv_file, "r") as file: 
		for line in file.readlines():
			match_data.append(line[:len(line)-1].split(";")) 

	print(match_code)
	print(match)
	print(date_last_update)
	print(dict_name[match])
	print(match_data)
	print(drop_value)
	
	return render_template('events_tagging.html', match_code=match_code, match=match, date_last_update=date_last_update, match_name=dict_name[match], data=match_data, dropdown=drop_value, 
							video_link="/static/" + match_code + ".mp4", name_team_A=name_team_A, name_team_B=name_team_B, squad_A=squad_A, squad_B=squad_B )

'''
This method allows to update all the tagged events
'''
@app.route('/<match>/update', methods=['POST'])
def test(match):
	data = request.get_json()
	print(data+"ciao")
	csv_file = 'Data/' + match + '.csv'
	eventName = match.split("_")
	eventName = eventName[len(eventName) - 1]
	match_data = data['table']
	with open(csv_file, "w") as file:
		file.writelines(" #;" + eventName + " Start;" + eventName + " End;" + " Player\n" )
		for line in match_data[1:]:
			file.writelines(line + "\n")

if __name__ == '__main__':
	app.debug = True
	app.run()


	
