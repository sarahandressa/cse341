const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        const database = client.db("professional_db");
        if (!(await database.listCollections({ name: 'professionals' }).hasNext())) {
            await database.createCollection('professionals');
            console.log('Created professionals collection');
        }
        console.log('Successfully connected to MongoDB');
        return client;
    } catch (e) {
        console.error('MongoDB connection error:', e);
        throw e;
    }
}

module.exports = {
    connectDB,
    client
};