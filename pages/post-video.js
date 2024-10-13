import { useState } from 'react';
import axios from 'axios';

function CircularProgressBar({ progress }) {
    const radius = 20; // Radius of the circle
    const normalizedRadius = radius - 5; // Adjusted radius for stroke
    const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle
    const strokeDashoffset = circumference - (progress / 100) * circumference; // Stroke offset based on progress

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="lightgray"
                fill="transparent"
                strokeWidth="5"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="green"
                fill="transparent"
                strokeWidth="5"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
        </svg>
    );
}

function PostAnimeName() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(''); // State for username
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [uploadDone, setUploadDone] = useState(false); // State to track if upload is done

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadDone(false); // Reset upload status when a new file is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadProgress(0); // Reset progress
        setIsLoading(true); // Set loading to true

        const formData = new FormData();
        formData.append('file', file); // Upload the file
        formData.append('animeName', username); // Include the username

        try {
            const response = await axios.post('/api/postAnime', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted); // Update upload progress
                },
            });
            console.log('Upload successful:', response.data);
            setSuccessMessage(`Upload successful! File: ${file.name}`); // Set success message
            setUploadDone(true); // Mark upload as done
            setTimeout(() => setSuccessMessage(''), 3000); // Hide after 3 seconds
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            {isLoading && <div className="loading-popup">Uploading your image...</div>} {/* Loading message */}

            {successMessage && <div className="success-popup">{successMessage}</div>} {/* Success message popup */}

            <form onSubmit={handleSubmit}>
                {/* Username input */}
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                {/* File input */}
                <input type="file" name="file" onChange={handleFileChange} required />
                
                <button type="submit" style={{ backgroundColor: uploadDone ? 'green' : 'lightgray' }}>
                    {uploadDone ? 'Done' : 'Upload Image'}
                </button>
            </form>

            {/* Circular Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && <CircularProgressBar progress={uploadProgress} />}

            <style jsx>{`
                .loading-popup {
                    background-color: yellow;
                    color: black;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    text-align: center;
                    transition: opacity 0.5s ease;
                }
                .success-popup {
                    background-color: green;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    text-align: center;
                    transition: opacity 0.5s ease;
                }
            `}</style>
        </div>
    );
}

// New component for video upload
function PostVideoName() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUsername, setVideoUsername] = useState(''); // State for username
    const [videoSuccessMessage, setVideoSuccessMessage] = useState(''); // State for success message
    const [videoUploadProgress, setVideoUploadProgress] = useState(0); // State for upload progress
    const [videoIsLoading, setVideoIsLoading] = useState(false); // State for loading indicator
    const [videoUploadDone, setVideoUploadDone] = useState(false); // State to track if video upload is done

    const handleVideoFileChange = (e) => {
        setVideoFile(e.target.files[0]);
        setVideoUploadDone(false); // Reset upload status when a new file is selected
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        setVideoUploadProgress(0); // Reset progress
        setVideoIsLoading(true); // Set loading to true

        const formData = new FormData();
        formData.append('file', videoFile); // Upload the file
        formData.append('animeName', videoUsername); // Include the username

        try {
            const response = await axios.post('/api/postAnime', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setVideoUploadProgress(percentCompleted); // Update upload progress
                },
            });
            console.log('Upload successful:', response.data);
            setVideoSuccessMessage(`Upload successful! File: ${videoFile.name}`); // Set success message
            setVideoUploadDone(true); // Mark video upload as done
            setTimeout(() => setVideoSuccessMessage(''), 3000); // Hide after 3 seconds
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setVideoIsLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            {videoIsLoading && <div className="loading-popup">Uploading your video...</div>} {/* Loading message */}

            {videoSuccessMessage && <div className="success-popup">{videoSuccessMessage}</div>} {/* Success message popup */}

            <form onSubmit={handleVideoSubmit}>
                {/* Username input */}
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={videoUsername}
                    onChange={(e) => setVideoUsername(e.target.value)}
                    required
                />
                
                {/* Video file input */}
                <input type="file" name="file" onChange={handleVideoFileChange} required />
                
                <button type="submit" style={{ backgroundColor: videoUploadDone ? 'green' : 'lightgray' }}>
                    {videoUploadDone ? 'Done' : 'Upload Video'}
                </button>
            </form>

            {/* Circular Progress Bar */}
            {videoUploadProgress > 0 && videoUploadProgress < 100 && <CircularProgressBar progress={videoUploadProgress} />}

            <style jsx>{`
                .loading-popup {
                    background-color: yellow;
                    color: black;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    text-align: center;
                    transition: opacity 0.5s ease;
                }
                .success-popup {
                    background-color: green;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    text-align: center;
                    transition: opacity 0.5s ease;
                }
            `}</style>
        </div>
    );
}

export default function Tabs() {
    const [activeTab, setActiveTab] = useState('upload');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="tabs">
                <button onClick={() => handleTabChange('upload')} className={activeTab === 'upload' ? 'active' : ''}>
                    Upload Image
                </button>
                <button onClick={() => handleTabChange('video')} className={activeTab === 'video' ? 'active' : ''}>
                    Video Upload
                </button>
            </div>

            {activeTab === 'upload' && <PostAnimeName />}
            {activeTab === 'video' && <PostVideoName />}

            <style jsx>{`
                .tabs {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                .tabs button {
                    padding: 10px;
                    border: none;
                    background-color: lightgray;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .tabs button.active {
                    background-color: #ddd; /* Active tab color */
                }
            `}</style>
        </div>
    );
}
