from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend requests from any origin

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    target_lang = data.get('target_lang')

    if not text or not target_lang:
        return jsonify({'error': 'Missing text or target language'}), 400

    try:
        translated = GoogleTranslator(target=target_lang).translate(text)
        return jsonify({'translation': translated})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
