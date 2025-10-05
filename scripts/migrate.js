require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function migrateBooks() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not set');
  }

  const options = {
    serverSelectionTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  };

  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    const db = client.db('bookstore');
    const collection = db.collection('books');

    // Read books.json
    const booksPath = path.join(__dirname, '..', 'src', 'app', 'data', 'books.json');
    const booksData = fs.readFileSync(booksPath, 'utf8');
    const books = JSON.parse(booksData);

    // Insert books
    const result = await collection.insertMany(books);
    console.log(`Inserted ${result.insertedCount} books`);
  } finally {
    await client.close();
  }
}

migrateBooks().catch(console.error);
