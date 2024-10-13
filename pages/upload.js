// pages/upload.js
import { useState } from 'react';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    // Call API to upload the video to MongoDB
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, url: videoUrl }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Video uploaded successfully!');
      setTitle('');
      setVideoUrl('');
    } else {
      setMessage('Failed to upload video');
    }
  };

  return (
    <div>
      <h1>Upload a Video</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Video URL: </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
