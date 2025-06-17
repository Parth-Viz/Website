import React, { useRef, useState } from 'react';

/**
 * GalleryUpload handles image upload, runs classification, and returns image data with tags.
 * Uses TensorFlow.js MobileNet for client-side classification.
 */
function GalleryUpload({ onImagesAdded }) {
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load MobileNet model only once
  const [model, setModel] = useState(null);
  React.useEffect(() => {
    import('@tensorflow/tfjs').then(() => {
      import('@tensorflow-models/mobilenet').then(mobilenet => {
        mobilenet.load().then(setModel);
      });
    });
  }, []);

  async function handleFiles(files) {
    setLoading(true);
    setError(null);
    const images = [];
    for (const file of files) {
      try {
        const url = URL.createObjectURL(file);
        const img = new window.Image();
        img.src = url;
        await new Promise(res => (img.onload = res));
        let tags = [];
        if (model) {
          const predictions = await model.classify(img);
          tags = predictions.map(p => p.className.split(',')[0]);
        }
        images.push({ url, tags, name: file.name, file }); // Pass file for base64 conversion
      } catch (e) {
        setError('Failed to process one or more images.');
      }
    }
    setLoading(false);
    onImagesAdded(images);
  }

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        {loading ? 'Classifying...' : 'Upload Photos'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default GalleryUpload;
