import json
import pandas as pd


...
...


class Events_DataSet():
	def __init__(self):

		with open("Data/players.json", encoding='utf-8') as file_players:
			data_players = json.load(file_players)

		self.playersDict = dict()
		for player in data_players:
			self.playersDict[player['wyId']] = player['shortName']


		with open("Data/teams.json", encoding='utf-8') as file_teams:
			self.data_teams = json.load(file_teams)

		self.teamsDict = dict()
		for team in self.data_teams:
			self.teamsDict[team['wyId']] = team['name']

		with open("Data/events_World_Cup.json", encoding='utf-8') as file_events:
			self.data_events = json.load(file_events)

		with open("Data/matches_World_Cup.json", encoding='utf-8') as file_matches:
			self.data_matches = json.load(file_matches)		
		

	def createDataMatch(self, match="France_Croatia_1", eventName = "Pass"):
		matchId = 0
		period = 0
		print(match)
		if match == "France_Croatia_1":
			matchId = 2058017
			period = "1H"
		elif match == "France_Croatia_2":
			matchId = 2058017
			period = "2H"
		elif match == "France_Argentina_1":
			matchId = 2058003
			period = "1H"
		elif match == "France_Argentina_2":
			matchId = 2058003
			period = "2H"
		elif match == "Belgium_Japan_1":
			matchId = 2058007
			period = "1H"
		elif match == "Belgium_Japan_2":
			matchId = 2058007
			period = "2H"
		elif match == "Germany_Mexico_1":
			matchId = 2057984
			period = "1H"
		elif match == "Germany_Mexico_2":
			matchId = 2057984
			period = "2H"


		
		if (eventName == "Pass" or eventName == "Shot"):
			events_filter = list(filter(lambda x : x["matchId"] == matchId and x["eventName"] == eventName and x["matchPeriod"] == period, self.data_events))
			row_format = lambda x : str(x["id"]) + ";" + self.playersDict[x["playerId"]] + ";" + self.teamsDict[x["teamId"]] + ";" + str(round(x["eventSec"], 2)) + ";0;0"
			header = ["Id;Player;Team;Timestamp;" + eventName + " Start;" + eventName + " End"]
			events_match_csv = header + [*map(row_format, events_filter)]
		
		elif (eventName == "Goal"):
			goal_dict = []
			for ev in self.data_events:
				tags_values = ev.get("tags")
				for tag in tags_values:
					if (tag.get("id") == 101):
						for acc_check in tags_values:
							if (acc_check.get("id") == 1801):
								goal_dict.append(ev)

					elif (tag.get("id") == 102):
						goal_dict.append(ev)

			events_filter = list(filter(lambda x : x["matchId"] == matchId and x["matchPeriod"] == period, goal_dict))
			row_format = lambda x : str(x["id"]) + ";" + self.playersDict[x["playerId"]] + ";" + self.teamsDict[x["teamId"]] + ";" + str(round(x["eventSec"], 2)) + ";0;0"
			header = ["Id;Player;Team;Timestamp;" + eventName + " Start;" + eventName + " End"]
			events_match_csv = header + [*map(row_format, events_filter)]


		with open("Data/" + match + "_" + eventName + ".csv", "w") as csv_file:
			for ev in events_match_csv:
				csv_file.writelines(ev + "\n")



	def Player_DataSet(self, match="France_Croatia_1"):

		
		teams_duple = (self.teamsDict).items()
		currentTeams = [ 0 , 0 ]

		for t in teams_duple:
			if t[1] == match.split("_")[0]:
				currentTeams[0]=(t[0])
			elif t[1] == match.split("_")[1]:
				currentTeams[1]=(t[0])
				
		label_filter = list(filter(lambda x : (x["label"].split(",")[0]).split(" - ")[0]  == match.split("_")[0] and (x["label"].split(",")[0]).split(" - ")[1]  == match.split("_")[1], self.data_matches))

		player_list1 = list()
		player_list2 = list()
		for m in label_filter:
			for first_stringer1 in m["teamsData"][str(currentTeams[0])]["formation"]["lineup"]:
				player_list1.append(self.playersDict[first_stringer1["playerId"]])
			for bench1 in m["teamsData"][str(currentTeams[0])]["formation"]["bench"]:
				player_list1.append(self.playersDict[bench1["playerId"]])
			for first_stringer2 in m["teamsData"][str(currentTeams[1])]["formation"]["lineup"]:
				player_list2.append(self.playersDict[first_stringer2["playerId"]])
			for bench2 in m["teamsData"][str(currentTeams[1])]["formation"]["bench"]:
				player_list2.append(self.playersDict[bench2["playerId"]])

		player_list = list()
		player_list.append(player_list1) 
		player_list.append(player_list2)
		return player_list
