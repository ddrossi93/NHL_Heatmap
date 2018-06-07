# import dependencies
from flask import Flask, render_template, jsonify, redirect, current_app
from flask_pymongo import PyMongo
import stats_grabber
import json
from bson import json_util
from bson.json_util import dumps
import pymongo

# create instance of Flask
app = Flask(__name__)

mongo = PyMongo(app)

stats_grabber.get_data()

# create index route


@app.route("/")
def index():
    client.drop_database('app')
    stats_grabber.get_data()
    conn = 'mongodb://nhl-app:nhlapp1@ds245240.mlab.com:45240/app'
    client = pymongo.MongoClient(conn)
    db = client.app
    shot_data = db.shots.find({}, {'_id': False})
    goal_data = db.goals.find({}, {'_id': False})
    hit_data = db.hits.find({}, {'_id': False})
    shot_json = dumps(shot_data)
    goal_json = dumps(goal_data)
    hit_json = dumps(hit_data)
    return render_template("index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)


@app.route("/<team>/<player>")
def team(team, player):
    conn = 'mongodb://nhl-app:nhlapp1@ds245240.mlab.com:45240/app'
    client = pymongo.MongoClient(conn)
    db = client.app
    if player != "all":
        shot_data = db.shots.find(
            {"player": player}, {"_id": 0})
        goal_data = db.goals.find(
            {"player": player}, {"_id": 0})
        hit_data = db.hits.find(
            {"player": player}, {"_id": 0})
    else:
        shot_data = db.shots.find({"team": team}, {"_id": 0})
        goal_data = db.goals.find({"team": team}, {"_id": 0})
        hit_data = db.hits.find({"team": team}, {"_id": 0})

    shot_json = dumps(shot_data)
    goal_json = dumps(goal_data)
    hit_json = dumps(hit_data)
    if player != "all":
        return render_template("player_index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)
    elif team != "all":
        return render_template("team_index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)
    else:
        return render_template("index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)


@app.route('/shots/<team>')
def player_shot(team):
    conn = 'mongodb://nhl-app:nhlapp1@ds245240.mlab.com:45240/app'
    client = pymongo.MongoClient(conn)
    db = client.app
    documents = [doc for doc in db.shots.find(
        {"team": team}, {"_id": 0})]
    return jsonify(documents)


@app.route("/shots")
def shots():
    conn = 'mongodb://nhl-app:nhlapp1@ds245240.mlab.com:45240/app'
    client = pymongo.MongoClient(conn)
    db = client.app
    documents = [doc for doc in db.shots.find({}, {"_id": 0})]
    return jsonify(documents)


if __name__ == "__main__":
    app.run(debug=True)
