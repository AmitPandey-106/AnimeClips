import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function VideosPage() {
  const router = useRouter();
  const { imageUrl, animeName } = router.query; // Get the image and name from the query
  const [videos, setVideos] = useState([]);
  const [downloading, setDownloading] = useState({}); // Track downloading state for each video

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos'); // Adjust to use your actual API endpoint
        const data = await response.json();
        if (data.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleDownload = async (videoUrl, animeName) => {
    setDownloading((prev) => ({ ...prev, [videoUrl]: true })); // Set downloading state for this video

    try {
      const response = await fetch(`/api/download-video?videoUrl=${encodeURIComponent(videoUrl)}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Create a blob from the response
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = animeName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Cleanup the blob URL
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading video:', error);
    } finally {
      setDownloading((prev) => ({ ...prev, [videoUrl]: false })); // Reset downloading state
    }
  };

  // Filter videos by the selected anime name
  const filteredVideos = animeName ? videos.filter(video => video.animeName === animeName) : videos;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ textAlign: 'center' }}>Anime Videos</h1>

      {/* Display the clicked image and name */}
      {imageUrl && animeName && (
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src={imageUrl} alt={animeName} style={{ width: '200px', height: '300px' }} />
          <h2>{animeName}</h2>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div
              key={video._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                width: '300px',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
              }}
            >
              <h3>{video.animeName}</h3>
              <div style={{ marginTop: '10px' }}>
                <video width="300" height="240" controls>
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Download Button */}
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleDownload(video.videoUrl, video.animeName)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {downloading[video.videoUrl] ? 'Downloading...' : 'Download'}
                </button>
                {/* Enhanced Progress Bar for Specific Video */}
                {downloading[video.videoUrl] && (
                  <div style={{ width: '100%', height: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0', marginTop: '5px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: '100%',
                      background: 'linear-gradient(to right, #0070f3, #00c1ff)',
                      animation: 'loading 2s infinite',
                      borderRadius: '5px',
                    }} />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>

      {/* CSS for loading animation */}
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
