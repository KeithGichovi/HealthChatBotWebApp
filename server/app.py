from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return jsonify({"message": "Hello world"})


@app.route('/register', methods=["GET", "POST"])
def register():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "No data has been passed on here."}), 401
    else:
        return jsonify({"message": "passed, data has been passed to backend"}), 200


if __name__ == '__main__':
    app.run(debug=True)
