import nextConnect from 'next-connect';
import dbConnect from '../../lib/dbConnect'; // Adjust this path if needed
import ANIMENAME from '../../model/animename'; // Adjust the path if needed
import cloudinary from '../../lib/cloudinary';
import multer from 'multer';

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect();

handler.use(upload.single('image')) // Use multer middleware to handle single file uploads
  .post(async (req, res) => {
    await dbConnect(); // Connect to MongoDB

    const { animeName } = req.body; // Get animeName from the form data
    const file = req.file; // Get the image file from the request

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.buffer, {
        folder: 'anime', // Specify the folder in Cloudinary
      });

      // Create a new anime document
      const newAnime = new ANIMENAME({
        animeName,
        imageUrl: result.secure_url, // Save the image URL
      });

      // Save the anime to the database
      await newAnime.save();

      return res.status(200).json({ success: true, data: newAnime });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to upload image' });
    }
  });

export default handler;
