'''
merge all file in the folder data/name match/json/
in a single json file in data/name match/

filter and create two files one for home_team an one for away_team
with the separete events
'''
import os
import json

 
events = []
events_home_team = []
events_away_team = []

count = 0
count_home = 0
count_away = 0

file_json = 'static/game/match/match.json'
data = json.load(open(file_json))

match_code = data["home_team"]["team_id"] + " " +  data["away_team"]["team_id"]
home_team = data["home_team"]["team_id"]
away_team = data["away_team"]["team_id"]

name_folder = "./Data/" + match_code + "/json"

#read all single ivent in all files of events, save in a array
for file in os.listdir(name_folder):
    
    if file.endswith('.json'):
        with open(name_folder+"/"+file,'r') as fi:
                dict = json.load(fi)
                print("number of events in " + file + " : " + str(len(dict)))
                for event in dict:
                    if event != {}:
                        count += 1
                        events.append(event)
                    
                        if event["team_id"] == home_team :
                            count_home += 1
                            events_home_team.append(event)
                        else:
                            events_away_team.append(event)
                            count_away += 1
    else:
        print("sorry, this file isn't json")

print("Number of events in Complete File : " + str(count))
print("Number of events " + home_team + " File : " + str(count_home))
print("Number of events " + away_team + " File : " + str(count_away))

# write the array with events in a json file in Data\Name event
name_file_json = "./Data/"+match_code+"/"+match_code+".json"
with open(name_file_json, "w") as outfile:
    json.dump(events, outfile)

# write the array with events of Home team in a json file in Data\Name event
name_home_file_json = "./Data/"+match_code+"/"+home_team+".json"
with open(name_home_file_json, "w") as outfile:
    json.dump(events_home_team, outfile)
    
# write the array with events of Away team in a json file in Data\Name event
name_away_file_json = "./Data/"+match_code+"/"+away_team+".json"
with open(name_away_file_json, "w") as outfile:
    json.dump(events_away_team, outfile)


