from flask import Flask, request, jsonify

app = Flask(__name__)

enquiries = []
reviews = []

@app.route('/enquiries', methods=['GET', 'POST'])
def manage_enquiries():
    if request.method == 'GET':
        return jsonify(enquiries)
    elif request.method == 'POST':
        data = request.get_json()
        enquiries.append(data)
        return jsonify({"message": "Enquiry added successfully"})

@app.route('/reviews', methods=['GET', 'POST'])
def manage_reviews():
    if request.method == 'GET':
        return jsonify(reviews)
    elif request.method == 'POST':
        data = request.get_json()
        reviews.append(data)
        return jsonify({"message": "Review added successfully"})

if __name__ == '__main__':
    app.run(debug=True)
