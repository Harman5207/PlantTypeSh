import * as tmImage from '@teachablemachine/image';

const URL = "YOUR_MODEL_URL/";

export async function loadModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const model = await tmImage.load(modelURL, metadataURL);
  return model;
}