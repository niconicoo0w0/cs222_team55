const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myLibrary';

async function removeBook(bookId) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const booksCollection = db.collection('books');
    const book = await booksCollection.findOne({ _id: bookId });

    if (!book) {
      console.log(`Book with ID ${bookId} not found`);
      return;
    }

    if (book.count === 0) {
      await booksCollection.deleteOne({ _id: bookId });
      console.log(`Book with ID ${bookId} removed from the database`);
    } else if (book.count > 0 && book.checkedOut === 0) {
      await booksCollection.updateOne(
        { _id: bookId },
        { $inc: { count: -1 } }
      );
      console.log(`Book with ID ${bookId} count decremented`);
    } else {
      console.log(`Book with ID ${bookId} is currently checked out`);
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}
