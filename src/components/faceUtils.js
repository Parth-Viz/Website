// Use dynamic import for face-api.js to avoid SSR/build issues
let faceapi = null;

export async function loadFaceModels() {
  if (!faceapi) {
    faceapi = await import('face-api.js');
  }
  const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

export async function detectFaces(img) {
  if (!faceapi) {
    faceapi = await import('face-api.js');
  }
  const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
  return detections.map(det => det.box);
}
