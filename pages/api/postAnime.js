import multer from 'multer';
import cloudinary from '../../lib/cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import AnimeName from '../../model/animename'; // For image uploads
import AnimeVideo from '../../model/animevideo'; // For video uploads
import dbConnect from '../../lib/dbConnect';

// Configure Multer storage
const storage = multer.memoryStorage(); // Use memory storage for easy access
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Use multer to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error with multer:', err);
        return res.status(500).json({ error: 'Error processing the file' });
      }

      // Ensure file is uploaded
      const file = req.file;
      const { animeName } = req.body; // Get anime name from the request

      if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      if (!animeName) {
        console.error('No anime name provided');
        return res.status(400).json({ error: 'No anime name provided' });
      }

      try {
        // Connect to MongoDB
        await dbConnect();

        // Handle Cloudinary upload
        const uploadOptions = {
          upload_preset: 'animeweb', // Your upload preset name
        };

        let result;

        // Check file type and handle accordingly
        if (file.mimetype.startsWith('image/')) {
          // Upload image to Cloudinary
          result = await new Promise((resolve, reject) => {
            cloudinaryV2.uploader.upload_stream(uploadOptions, (error, result) => {
              if (error) {
                console.error('Upload to Cloudinary failed:', error);
                return reject(new Error('Upload to Cloudinary failed'));
              }
              resolve(result);
            }).end(file.buffer);
          });

          // Save the anime name and image URL to the database
          const newAnime = new AnimeName({
            animeName: animeName, // Save the anime name
            imageUrl: result.secure_url, // Save the image URL
          });

          await newAnime.save(); // Save to MongoDB
        } else if (file.mimetype.startsWith('video/')) {
          // Use Cloudinary's upload method for videos
          const stream = cloudinaryV2.uploader.upload_stream({
            ...uploadOptions,
            resource_type: 'video', // Specify resource type as video
          }, async (error, result) => {
            if (error) {
              console.error('Upload to Cloudinary failed:', error);
              return res.status(500).json({ error: 'Upload to Cloudinary failed' });
            }
            
            // Save the anime name and video URL to the database
            const newAnimeVideo = new AnimeVideo({
              animeName: animeName, // Save the anime name
              videoUrl: result.secure_url, // Save the video URL
            });

            await newAnimeVideo.save(); // Save to MongoDB
            
            // Respond with success and the URL of the uploaded video
            return res.status(200).json({ success: true, url: result.secure_url, animeName });
          });

          // End the video upload stream
          stream.end(file.buffer);
        } else {
          return res.status(400).json({ error: 'Unsupported file type' });
        }
      } catch (error) {
        console.error('Error uploading to Cloudinary or saving data:', error);
        return res.status(500).json({ error: 'Upload or saving data failed' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
