# import dependencies
from flask import Flask, render_template, jsonify, redirect, current_app
from flask_pymongo import PyMongo
import stats_grabber
import json
from bson import json_util
from bson.json_util import dumps

# create instance of Flask
app = Flask(__name__)

mongo = PyMongo(app)

stats_grabber.get_data()

# create index route


@app.route("/")
def index():
    shot_data = mongo.db.shots.find()
    goal_data = mongo.db.goals.find()
    hit_data = mongo.db.hits.find()
    shot_json = dumps(shot_data)
    goal_json = dumps(goal_data)
    hit_json = dumps(hit_data)
    return render_template("index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)


@app.route("/<team>/<event>/<player>")
def index():
    shot_data = mongo.db.shots.find()
    goal_data = mongo.db.goals.find()
    hit_data = mongo.db.hits.find()
    shot_json = dumps(shot_data)
    goal_json = dumps(goal_data)
    hit_json = dumps(hit_data)
    return render_template("index.html", shot_data=shot_json, goal_data=goal_json, hit_data=hit_json)


@app.route("/shots")
def shots():
    documents = [doc for doc in mongo.db.shots.find({}, {"_id": 0})]
    return jsonify(documents)


@app.route("/goals")
def goals():
    documents = [doc for doc in mongo.db.goals.find({}, {"_id": 0})]
    return jsonify(documents)


@app.route("/hits")
def hits():
    documents = [doc for doc in mongo.db.hits.find({}, {"_id": 0})]
    return jsonify(documents)


@app.route('/shots/<selection>')
def player_shot(selection):
    documents = [doc for doc in mongo.db.shots.find(
        {"player": selection}, {"_id": 0})]
    return jsonify(documents)


@app.route('/goals/<selection>')
def player_goal(selection):
    documents = [doc for doc in mongo.db.goals.find(
        {"player": selection}, {"_id": 0})]
    return jsonify(documents)


@app.route('/hits/<selection>')
def player_hit(selection):
    documents = [doc for doc in mongo.db.hits.find(
        {"player": selection}, {"_id": 0})]
    return jsonify(documents)


if __name__ == "__main__":
    app.run(debug=True)
