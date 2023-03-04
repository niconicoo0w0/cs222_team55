const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myLibrary';

async function insertBook(book) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const booksCollection = db.collection('books');
    const result = await booksCollection.insertOne(book);
    console.log(`Inserted book with ID ${result.insertedId}`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}