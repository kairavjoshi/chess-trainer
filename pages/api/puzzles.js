import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('ChessTrainer');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('chess_trainer.puzzles');
      const puzzles = await collection.find({}).toArray();
      res.status(200).json(puzzles);
    } catch (error) {
      console.error('Error fetching puzzles:', error);
      res.status(500).json({ error: 'Unable to fetch puzzles' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
