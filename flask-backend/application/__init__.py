from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
app.config["SECRET_KEY"] =''

client = MongoClient('')
db=client.get_database('proj_db')





from application import routes