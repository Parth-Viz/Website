import React, { useState, useEffect } from 'react';
import GalleryUpload from './GalleryUpload';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTrash, FaFolderPlus, FaFolder, FaChevronDown, FaSearch, FaPlus } from 'react-icons/fa';
import { loadFaceModels, detectFaces } from './faceUtils';

function dataURLFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function GallerySection() {
  const [images, setImages] = useState(() => {
    // Load from localStorage if available
    try {
      return JSON.parse(localStorage.getItem('galleryImages')) || [];
    } catch {
      return [];
    }
  });
  const [albums, setAlbums] = useState(() => {
    // Load albums from localStorage or set default
    try {
      return JSON.parse(localStorage.getItem('galleryAlbums')) || [{ name: 'All Photos', id: 'all' }];
    } catch {
      return [{ name: 'All Photos', id: 'all' }];
    }
  });
  const [activeAlbum, setActiveAlbum] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [faceLoading, setFaceLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }, [images]);
  useEffect(() => {
    localStorage.setItem('galleryAlbums', JSON.stringify(albums));
  }, [albums]);

  // Load face-api.js models once
  useEffect(() => {
    loadFaceModels();
  }, []);

  async function handleImagesAdded(newImages) {
    setFaceLoading(true);
    // Convert File URLs to base64 Data URLs for persistence
    const processed = await Promise.all(newImages.map(async img => {
      let dataUrl = img.url;
      if (img.file) {
        dataUrl = await dataURLFromFile(img.file);
      }
      const imageEl = new window.Image();
      imageEl.src = dataUrl;
      await new Promise(res => (imageEl.onload = res));
      let faceBoxes = [];
      try {
        faceBoxes = await detectFaces(imageEl);
      } catch {}
      return { ...img, url: dataUrl, faceBoxes, faceLabels: [], album: activeAlbum };
    }));
    setFaceLoading(false);
    setImages(prev => [...prev, ...processed]);
  }

  function deletePhoto(idx) {
    setImages(imgs => imgs.filter((_, i) => i !== idx));
  }

  function createAlbum(name) {
    if (!name.trim() || albums.some(a => a.name === name)) return;
    setAlbums(albs => [...albs, { name, id: name.toLowerCase().replace(/\s+/g, '-') }]);
  }
  function deleteAlbum(id) {
    if (id === 'all') return;
    setAlbums(albs => albs.filter(a => a.id !== id));
    setImages(imgs => imgs.map(img => img.album === id ? { ...img, album: 'all' } : img));
    setActiveAlbum('all');
  }
  function movePhoto(idx, newAlbum) {
    setImages(imgs => imgs.map((img, i) => i === idx ? { ...img, album: newAlbum } : img));
  }

  // Add tag to image
  function addTag(idx, tag) {
    setImages(imgs => imgs.map((img, i) => i === idx ? { ...img, tags: [...img.tags, tag] } : img));
  }
  // Remove tag from image
  function removeTag(idx, tag) {
    setImages(imgs => imgs.map((img, i) => i === idx ? { ...img, tags: img.tags.filter(t => t !== tag) } : img));
  }
  // Add label to detected face
  function addFaceLabel(idx, faceIdx, label) {
    setImages(imgs => imgs.map((img, i) => {
      if (i !== idx) return img;
      const faceLabels = [...(img.faceLabels || [])];
      faceLabels[faceIdx] = label;
      return { ...img, faceLabels };
    }));
  }

  // Filter images by album and search
  const filtered = images.filter(img =>
    (activeAlbum === 'all' || img.album === activeAlbum) &&
    (
      !search ||
      img.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      (img.faceLabels || []).some(l => l && l.toLowerCase().includes(search.toLowerCase()))
    )
  );

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-2">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaFolder className="inline-block text-blue-500" /> Photo Gallery
      </h2>
      <GalleryUpload onImagesAdded={handleImagesAdded} />
      {/* Album controls */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {albums.map(album => (
          <button
            key={album.id}
            className={`px-3 py-1 rounded flex items-center gap-1 ${activeAlbum === album.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white'}`}
            onClick={() => setActiveAlbum(album.id)}
          >
            <FaFolder className="inline-block" /> {album.name}
            {album.id !== 'all' && (
              <span
                className="ml-2 text-xs text-red-500 cursor-pointer"
                onClick={e => { e.stopPropagation(); deleteAlbum(album.id); }}
                title="Delete album"
              ><FaTrash /></span>
            )}
          </button>
        ))}
        <form
          onSubmit={e => {
            e.preventDefault();
            createAlbum(e.target.elements.album.value);
            e.target.reset();
          }}
          className="flex gap-2"
        >
          <input name="album" placeholder="New album" className="px-2 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:text-white text-xs" />
          <button type="submit" className="text-xs px-2 py-1 bg-green-500 text-white rounded flex items-center gap-1"><FaPlus />Add</button>
        </form>
      </div>
      <div className="relative mb-6 w-full max-w-md mx-auto">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by tag or face label..."
          className="pl-10 w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {faceLoading && <div className="text-blue-500 mb-4">Detecting faces in uploaded images...</div>}
      <AnimatePresence>
        <motion.div
          key={activeAlbum + search}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {filtered.map((img, idx) => (
            <motion.div
              key={img.url}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow p-2 flex flex-col items-center relative hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-40 mb-2">
                <img
                  src={img.url}
                  alt={img.name}
                  className="rounded-lg w-full h-40 object-cover cursor-pointer"
                  onClick={() => setModal(img)}
                />
                {/* Draw face boxes and label inputs */}
                {img.faceBoxes && img.faceBoxes.map((box, faceIdx) => (
                  <div
                    key={faceIdx}
                    style={{
                      position: 'absolute',
                      left: `${(box.x / 300) * 100}%`,
                      top: `${(box.y / 200) * 100}%`,
                      width: `${(box.width / 300) * 100}%`,
                      height: `${(box.height / 200) * 100}%`,
                      border: '2px solid #60a5fa',
                      borderRadius: '0.5rem',
                      background: 'rgba(96,165,250,0.1)',
                      pointerEvents: 'none',
                    }}
                  />
                ))}
                {img.faceBoxes && img.faceBoxes.map((box, faceIdx) => (
                  <form
                    key={faceIdx + '-label'}
                    style={{
                      position: 'absolute',
                      left: `${(box.x / 300) * 100}%`,
                      top: `calc(${(box.y / 200) * 100}% + ${(box.height / 200) * 100}% + 2px)`,
                      width: `${(box.width / 300) * 100}%`,
                      zIndex: 2,
                    }}
                    onSubmit={e => {
                      e.preventDefault();
                      const label = e.target.elements.label.value.trim();
                      if (label) addFaceLabel(idx, faceIdx, label);
                      e.target.reset();
                    }}
                  >
                    <input
                      name="label"
                      placeholder={img.faceLabels && img.faceLabels[faceIdx] ? img.faceLabels[faceIdx] : 'Label face'}
                      className="w-full px-1 py-0.5 rounded text-xs border border-blue-300 bg-white dark:bg-gray-800 dark:text-white"
                    />
                  </form>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                <AnimatePresence>
                  {img.tags.map(tag => (
                    <motion.span
                      key={tag}
                      className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      layout
                    >
                      {tag}
                      <button
                        className="ml-1 text-red-500 hover:text-red-700"
                        onClick={() => removeTag(idx, tag)}
                        aria-label="Remove tag"
                      >×</button>
                    </motion.span>
                  ))}
                  {/* Show face labels as tags */}
                  {(img.faceLabels || []).filter(Boolean).map(label => (
                    <motion.span
                      key={label}
                      className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      layout
                    >
                      {label}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const tag = e.target.elements.tag.value.trim();
                  if (tag) addTag(idx, tag);
                  e.target.reset();
                }}
                className="flex gap-2 mb-2"
              >
                <input name="tag" placeholder="Add tag" className="px-2 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:text-white text-xs" />
                <button type="submit" className="text-xs px-2 py-1 bg-green-500 text-white rounded"><FaPlus /></button>
              </form>
              <div className="flex gap-2 mb-2">
                <select
                  value={img.album || 'all'}
                  onChange={e => movePhoto(idx, e.target.value)}
                  className="text-xs px-2 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                >
                  {albums.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <button
                  className="text-xs px-2 py-1 bg-red-500 text-white rounded flex items-center gap-1"
                  onClick={() => deletePhoto(idx)}
                ><FaTrash />Delete</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Lightbox Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <img src={modal.url} alt={modal.name} className="max-h-[80vh] rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

export default GallerySection;
