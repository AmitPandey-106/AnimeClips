// pages/api/upload.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, url } = req.body;

    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db();
      const collection = db.collection('videos');

      // Insert video data into the 'videos' collection
      await collection.insertOne({
        title,
        url,
        uploadDate: new Date(),
      });

      client.close();
      res.status(201).json({ message: 'Video uploaded!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload video' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
