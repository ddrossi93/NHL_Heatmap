# import dependencies
import requests as req
import json

# get JSON from API
# TODO: choose a different game
data = req.get(
    'https://statsapi.web.nhl.com/api/v1/game/2016020143/feed/live').json()

# grab all plays from game
plays = data['liveData']['plays']['allPlays']

# create lists to sort into
shots = []
goals = []
hits = []

# sort events into lists
for play in plays:

    event = play['result']['event']

    if event == 'Shot':
        d = {
            'event': '',
            'shooter': '',
            'goalie': '',
            'x': '',
            'y': ''
        }
        shooter = play['players'][0]['player']['fullName']
        goalie = play['players'][1]['player']['fullName']
        x = play['coordinates']['x']
        y = play['coordinates']['y']
        d['event'] = event
        d['shooter'] = shooter
        d['goalie'] = goalie
        d['x'] = x
        d['y'] = y
    elif event == 'Goal':
        d = {
            'event': '',
            'shooter': '',
            'goalie': '',
            'x': '',
            'y': ''
        }
        for player in play['players']:
            if player['playerType'] == 'Scorer':
                shooter = player['player']['fullName']
            elif player['playerType'] == 'Goalie':
                goalie = player['player']['fullName']
        x = play['coordinates']['x']
        y = play['coordinates']['y']
        d['event'] = event
        d['shooter'] = shooter
        d['goalie'] = goalie
        d['x'] = x
        d['y'] = y
    elif event == 'Hit':
        d = {
            'event': '',
            'hitter': '',
            'x': '',
            'y': ''
        }
        hitter = play['players'][0]['player']['fullName']
        x = play['coordinates']['x']
        y = play['coordinates']['y']
        d['event'] = event
        d['hitter'] = hitter
        d['x'] = x
        d['y'] = y

    if event == 'Shot':
        shots.append(d)
    elif event == 'Goal':
        goals.append(d)
    elif event == 'Hit':
        hits.append(d)


# connect to db
# TODO: add unique ID to each entry
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.nhlDB

# add shot coordinates to db
# TODO: add more info (player, team, period, etc.)
db.shots.insert_many(shots)

# add goal coordinates to db
# TODO: add more info (player, team, period, etc.)
db.goals.insert_many(goals)

# add hit coordinates to db
# TODO: add more info (player, team, period, etc.)
db.hits.insert_many(hits)
