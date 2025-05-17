let model, webcam, labelContainer;
const MODEL_URL = "./tf_model/";

async function loadModel() {
  model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
}

document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!model) {
    await loadModel();
  }

  // Use FileReader to convert image to HTMLImageElement for prediction
  const reader = new FileReader();
  reader.onload = async function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = async () => {
      const prediction = await model.predict(img);
      const topPrediction = prediction.reduce((prev, current) => (prev.probability > current.probability ? prev : current));
      console.log("Prediction:", topPrediction);
      document.getElementById("predictionResult").innerText = `Prediction: ${topPrediction.className} (${(topPrediction.probability * 100).toFixed(2)}%)`;
      // Now you can update Firestore here
      // Example:
      // await db.collection("plants").doc("plant1").set({ emotion: topPrediction.className, last_watered: firebase.firestore.FieldValue.serverTimestamp() });
    };
  };
  reader.readAsDataURL(file);
});
