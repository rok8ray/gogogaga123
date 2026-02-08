from flask import Flask, request, jsonify

app = Flask(__name__)
latest_structure = ""

@app.route("/update_structure", methods=["POST"])
def update_structure():
    global latest_structure
    latest_structure = request.json.get("tree", "")
    return jsonify({"status": "ok"})

@app.route("/view_structure")
def view_structure():
    return f"<pre>{latest_structure}</pre>"

app.run(host="0.0.0.0", port=3001)
