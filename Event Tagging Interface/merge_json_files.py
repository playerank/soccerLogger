'''
merge all file in the folder data/name match/json/
in a single json file in data/name match/
'''
import os
import json

 
events = []

count = 0

file_json = 'static/game/match/match.json'
data = json.load(open(file_json))

match_code = data["home_team"]["team_id"] + " " +  data["away_team"]["team_id"]

name_folder = "./Data/" + match_code + "/json"

#read all single ivent in all files of events, save in a array
for file in os.listdir(name_folder):
    print(file)
    with open(name_folder+"/"+file,'r') as fi:
        dict = json.load(fi)
        print("number of events in " + file + " : " + str(len(dict)))
        for event in dict:
            count += 1
            events.append(event)
        
print("Number of events in Complete File : " + str(count))

# write the array with events in a json file
name_file_json = "./Data/"+match_code+"/"+match_code+".json"
with open(name_file_json, "w") as outfile:
    json.dump(events, outfile)
    


