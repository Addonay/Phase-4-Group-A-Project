from flask import Flask, jsonify
from config import Config
from models import db, Brand
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect
from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from routes.user_routes import user_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

CORS(app, supports_credentials=True)
CSRFProtect(app)
migrate = Migrate(app, db)

@app.route("/", methods=["GET"])
def list_brands():
    # Retrieve a list of brands from the database
    brands = Brand.query.all()

    # Convert the list of brands to a JSON response
    brand_list = [{"id": brand.id, "name": brand.name, "image_url": brand.image_url} for brand in brands]

    return jsonify(brands=brand_list)


app.register_blueprint(user_bp)
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(auth_bp, url_prefix='/auth')






if __name__ == "__main__":
    app.run(debug=True)
