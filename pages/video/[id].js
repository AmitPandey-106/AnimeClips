// pages/video/[id].js
import React from 'react';
import dbConnect from '../../lib/dbConnect'; // Import your database connection
import { ObjectId } from 'mongodb'; // Adjust based on your model
import VideoComponent from '../../components/VideoComponent'; // Ensure this path is correct

export async function getServerSideProps(context) {
  const { id } = context.query; // Get the video ID from the URL
  await dbConnect(); // Connect to the database

  try {
    // Fetch the video from the database
    const video = await db.collection('videos').findOne({ _id: new ObjectId(id) });

    if (!video) {
      return { notFound: true }; // Handle case where video isn't found
    }

    return {
      props: { video: JSON.parse(JSON.stringify(video)) }, // Pass video data to props
    };
  } catch (error) {
    console.error("Error fetching video:", error);
    return {
      props: { error: 'Error fetching video' }, // Handle error fetching video
    };
  }
}

const VideoPage = ({ video, error }) => {
  if (error) {
    return <div>Error: {error}</div>; // Display error if there is one
  }

  return (
    <div>
      <h1>{video.title}</h1> {/* Display video title */}
      <VideoComponent videoData={video} /> {/* Render the VideoComponent with video data */}
    </div>
  );
};

export default VideoPage;
