from flask import Flask
from config import Config
from models import db
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

CORS(app, support_credentials=True)

migrate = Migrate(app, db)

#define your routes here

if __name__ == "__main__":
    app.run(debug=True)
