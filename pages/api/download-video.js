// pages/api/download-video.js
export default async function handler(req, res) {
    const { videoUrl } = req.query;
  
    // Check for the required parameter
    if (!videoUrl) {
      return res.status(400).json({ error: "Missing videoUrl parameter" });
    }
  
    try {
      // Fetch the video from the given URL
      const response = await fetch(videoUrl);
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }
  
      // Get the video data as an ArrayBuffer
      const data = await response.arrayBuffer(); 
  
      // Set the headers for the response
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(videoUrl.split('/').pop())}"`);
      res.status(200).send(Buffer.from(data)); // Send the video data as a response
    } catch (error) {
      console.error('Error downloading video:', error);
      res.status(500).json({ error: "Failed to download video" });
    }
  }
  