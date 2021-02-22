import csv
#import file xls
    #import xlrd
    #import math


#import the file with the number and name players in the team
#with a dictionary <key=number, val=name>
def squad(path):

    try:
        
        #           CODE for xls file
        # print(path)
        # f = open(path)
        # inputW = xlrd.open_workbook(path)
        # inputWs = inputW.sheet_by_index(0)
        # row = inputWs.nrows
        # col = inputWs.ncols
        # team = {}
        # for x in range(1,row):
        #     for y in range(0,col):
        #         if(y%2 == 0):
        #             number = math.floor(inputWs.cell(x,y).value)
        #         else:
        #             name = inputWs.cell(x,y).value
        #     team[number] = name
        # return team

        with open(path, "r") as file:
            team = {}
            csv_reader = csv.reader(file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                player = ', '.join(row)
                player = player.split(";")
                name = player[1]
                number = player[0]
                team[number] = name
        return team


    except IOError:
        print("file non accessibie")
        return {}   

