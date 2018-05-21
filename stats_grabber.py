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
    d = {
        'event': '',
        'x': '',
        'y': ''
    }
    event = play['result']['event']
    try:
        x = play['coordinates']['x']
        y = play['coordinates']['y']
    except:
        x = 'NA'
        y = 'NA'

    d['event'] = event
    d['x'] = x
    d['y'] = y

    if event == 'Shot':
        shots.append(d)
    elif event == 'Goal':
        goals.append(d)
    elif event == 'Hit':
        hits.append(d)
