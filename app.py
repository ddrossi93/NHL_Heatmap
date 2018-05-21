# import dependencies
from flask import Flask, render_template, jsonify, redirect, current_app
from flask_pymongo import PyMongo
import stats_grabber

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
    return render_template("index.html", shot_data=shot_data)


if __name__ == "__main__":
    app.run(debug=True)
