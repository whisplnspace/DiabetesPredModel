from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model and scaler
with open("diabetes_model.pkl", "rb") as file:
    model = pickle.load(file)

with open("scaler.pkl", "rb") as file:
    scaler = pickle.load(file)

@app.route("/")
def home():
    return "Diabetes Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)  # Convert to NumPy array
        features_scaled = scaler.transform(features)  # Standardize input

        prediction = model.predict(features_scaled)[0]
        result = "Diabetic" if prediction == 1 else "Non-Diabetic"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
