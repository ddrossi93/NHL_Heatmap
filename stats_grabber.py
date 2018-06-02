def get_data():
    print('in function')
    # import dependencies
    import requests as req
    import json
    import pymongo

    # connect to db
    # TODO: add unique ID to each entry
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.app
    client.drop_database('app')

    # get JSON from API
    # TODO: choose a different game
    # game_ids = ['2017030316', '2017030325', '2017030315', '2017030324', '2017030314', '2017030323', '2017030313', '2017030322', '2017030312', '2017030321', '2017030311', '2017030226', '2017030215', '2017030215', '2017030225', '2017030214', '2017030214', '2017030224', '2017030213', '2017030223', '2017030212', '2017030222', '2017030211', '2017030221', '2017030221', '2017030126', '2017030115', '2017030124', '2017030133', '2017030133']
    data = req.get(
        'https://statsapi.web.nhl.com/api/v1/game/2017030411/feed/live').json()

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
                'player': '',
                'team': '',
                'x': '',
                'y': ''
            }
            shooter = play['players'][0]['player']['fullName']
            team = play['team']['name']
            goalie = play['players'][1]['player']['fullName']
            x = play['coordinates']['x']
            y = play['coordinates']['y']
            d['event'] = event
            d['player'] = shooter
            d['team'] = team
            d['x'] = x
            d['y'] = y
        elif event == 'Goal':
            d = {
                'event': '',
                'player': '',
                'team': '',
                'x': '',
                'y': ''
            }
            for player in play['players']:
                if player['playerType'] == 'Scorer':
                    shooter = player['player']['fullName']
                elif player['playerType'] == 'Goalie':
                    goalie = player['player']['fullName']
            team = play['team']['name']
            x = play['coordinates']['x']
            y = play['coordinates']['y']
            d['event'] = event
            d['player'] = shooter
            d['team'] = team
            d['x'] = x
            d['y'] = y
        elif event == 'Hit':
            d = {
                'event': '',
                'player': '',
                'team': '',
                'x': '',
                'y': ''
            }
            hitter = play['players'][0]['player']['fullName']
            team = play['team']['name']
            x = play['coordinates']['x']
            y = play['coordinates']['y']
            d['event'] = event
            d['player'] = hitter
            d['team'] = team
            d['x'] = x
            d['y'] = y

        if event == 'Shot':
            shots.append(d)
        elif event == 'Goal':
            goals.append(d)
        elif event == 'Hit':
            hits.append(d)

    # add shot coordinates to db
    # TODO: add more info (player, team, period, etc.)
    db.shots.insert_many(shots)

    # add goal coordinates to db
    # TODO: add more info (player, team, period, etc.)
    db.goals.insert_many(goals)

    # add hit coordinates to db
    # TODO: add more info (player, team, period, etc.)
    db.hits.insert_many(hits)
