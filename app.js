import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = Object.values(formData).map(Number);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { features });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Diabetes Prediction</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block font-semibold mb-1">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600">
          Predict
        </button>
      </form>
      {prediction && (
        <div className="mt-6 text-xl font-semibold text-gray-800">Prediction: {prediction}</div>
      )}
    </div>
  );
}
