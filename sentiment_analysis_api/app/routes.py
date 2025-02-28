from flask import Blueprint, request, jsonify
from app.services import analyze_sentiment

api_bp = Blueprint("api", __name__)

@api_bp.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' field"}), 400

        text = data["text"]
        results = analyze_sentiment(text) if isinstance(text, str) else [analyze_sentiment(t) for t in text]

        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
