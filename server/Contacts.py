from flask import Flask, jsonify

app = Flask(__name__)

contact_info = {
    "name": "Kenyan Car Dealership",
    "address": "123 Nairobi Road, Nairobi, Kenya",
    "phone": "+254-123-456-789",
    "email": "info@kenyancars.com",
    "social_media": {
        "facebook": "https://www.facebook.com/kenyancars",
        "twitter": "https://twitter.com/kenyancars",
        "instagram": "https://www.instagram.com/kenyancars/",
    },
}

@app.route('/api/contact', methods=['GET'])
def get_contact_info():
    return jsonify(contact_info)

if __name__ == '__main__':
    app.run(debug=True)
