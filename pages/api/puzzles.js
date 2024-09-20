import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);
  cachedDb = db;
  return db;
}

export default async (req, res) => {
  const db = await connectToDatabase();
  const collection = await db.collection('puzzles');
  const puzzles = await collection.find({}).toArray();
  res.json(puzzles);
};
