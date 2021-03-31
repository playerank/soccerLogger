import os
import json
import pandas as pd
import team

from flask import Flask, request, redirect, url_for, render_template, jsonify, Request

from last_file_update import last_modified_fileinfo

from werkzeug.utils import secure_filename

app = Flask(__name__)


'''
Create a list with names of matches whose videos are present in the static folder.
Create also a dictionary with names of events
'''

if not 'Data' in os.listdir():
		os.mkdir('Data')

if not 'game' in os.listdir('static'):
    		os.mkdir('static/game')	

if not 'match' in os.listdir('static/game'):
		os.mkdir('static/game/match')

if not 'video' in os.listdir('static/game'):
		os.mkdir('static/game/video')

if not 'extra_tag' in os.listdir('static/game'):
		os.mkdir('static/game/extra_tag')

files_list = os.listdir("./static/game/video")
matches_value = []

# dict_name = dict()

for file in files_list:
	if file.split(".")[-1] == "mp4":
		matches_value.append(file.split(".")[0])
			
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
    return render_template("home.html")
	#return redirect("/" + matches_value[0] + "_Events", code=302)


@app.route('/', methods=['GET', 'POST'])
def upload_file():
		if request.method == 'POST':
				
				f = request.files.getlist("file")
				
				if len(f) == 0 :
					try:
						file_json = 'static/game/match/match.json'
						data = json.load(open(file_json))
						name_match = data["home_team"]["team_id"] + "_" +  data["away_team"]["team_id"]
					except:
						print("file not found")	
						return render_template("home.html")
						
					return redirect("/" + name_match + "_Events", code=302)
				else:
					for elem in f:
						if elem.content_type == "video/mp4":
								elem.save(os.path.join(os.path.abspath("./static/game/video"), "game.mp4"))
						else:
							if elem.content_type == 'application/json':
										elem.save(os.path.join(os.path.abspath("./static/game/match"), "match.json"))
			
				return render_template("home.html")



'''
The function matchView allows to change the events and the video to show.
'''
@app.route('/<match>')
def matchView(match):

	try:
		file_json = 'static/game/match/match.json'
		data = json.load(open(file_json))
		
		video_link = 'static/game/video/' + os.listdir('static/game/video')[0]
				
		tag_json = 'static/game/extra_tag/extra_tag.json'
		data_tag = json.load(open(tag_json))
				 
	except:
		print("file not found 2")
		return render_template("home.html")

	date_last_update =""

	match_data = data["date_utc"]

	match_code = data["home_team"]["team_id"] + "_" +  data["away_team"]["team_id"]
	
	name_team_A = data["home_team"]["team_id"]
	name_team_B = data["away_team"]["team_id"]

	tag = data_tag["extra_tag"]
	key_tag = data_tag["key_tag"]
	result_tag = data_tag["result_tag"]
			
	#squad of players
	squad_A = {}
	squad_A["lineup"] = ":"
	for elem in data["home_team"]["formation"]["lineup"]:
		squad_A[elem["shirt_number"]] = elem["name"]
	squad_A["bench"] = ":"	
	for elem in data["home_team"]["formation"]["bench"]:
		squad_A[elem["shirt_number"]] = elem["name"]

	squad_B = {}
	squad_B["lineup"] = ":"
	for elem in data["away_team"]["formation"]["lineup"]:
    		squad_B[elem["shirt_number"]] = elem["name"]
	squad_B["bench"] = ":"
	for elem in data["away_team"]["formation"]["bench"]:
		squad_B[elem["shirt_number"]] = elem["name"]

	#run the page with all real program
	return render_template('events_tagging.html', match_code=match_code, match=match, date_last_update=date_last_update, match_name=match, data=match_data, 
							video_link=video_link, tag=tag,  key_tag=key_tag, result_tag = result_tag, name_team_A=name_team_A,
							name_team_B=name_team_B, squad_A=squad_A, squad_B=squad_B, name = {'n':match} )

'''
This method allows to update all the tagged events in json format
'''
@app.route('/<match>/update', methods=['POST', 'GET'])
def update(match):
	if request.method == "POST":
    		
			#recive the array with events
			array_of_events = request.get_data()

			#codify type bytes in type string
			array_of_events = array_of_events.decode('utf8').replace("'", '"')
			
			

			#load string in json format
			try:
				data = json.loads(array_of_events)
			except:
				print("non valido")
			
			name_directory = "./Data/" + match
			name_directory_json = "./Data/" + match + "/json"
			name_directory_csv = "./Data/" + match + "/csv"

			if not match in os.listdir("./Data"):
    				os.mkdir(name_directory)
			if not "json" in os.listdir("./Data/"+ match):
    				os.mkdir(name_directory_json)
			if not "csv" in os.listdir("./Data/"+ match):
    				os.mkdir(name_directory_csv)
		

			number_of_files_json = len(os.listdir(name_directory_json))+1
			number_of_files_csv = len(os.listdir(name_directory_csv))+1

			name_file_json = name_directory_json + "/" + match + "_" + str(number_of_files_json)+".json"
			name_file_csv = name_directory_csv + "/" + match + "_" + str(number_of_files_csv)+".csv"

			#write json in file
			with open(name_file_json, "w") as outfile:
				json.dump(data, outfile)
			
			#convert json file in csv
			df = pd.read_json(name_file_json)
			df.to_csv(name_file_csv, index=None)
			

if __name__ == '__main__':
	app.debug = True
	app.run()