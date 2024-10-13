import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db();
      const collection = db.collection('animevideos');

      const videos = await collection.find().toArray();

      client.close();

      res.status(200).json({ videos });
    } catch (error) {
      console.error('Error fetching videos:', error); // Log the error
      res.status(500).json({ message: 'Failed to fetch videos', error: error.message }); // Send the error message in response
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
