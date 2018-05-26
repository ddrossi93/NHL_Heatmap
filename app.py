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


if __name__ == "__main__":
    app.run(debug=True)
