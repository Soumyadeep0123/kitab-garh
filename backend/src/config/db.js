const mongoose = require('mongoose');

const connectDB = async () => {
  const { seedIfEmpty } = require('../data/seedData');

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kitabghar';
    console.log('[Database Tier] Connecting to MongoDB at:', mongoUri);
    
    // Set connection timeout so fallback triggers promptly if local mongod is offline
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log('[Database Tier] Connected to MongoDB:', conn.connection.host + ':' + conn.connection.port + '/' + conn.connection.name);
    await seedIfEmpty();

  } catch (error) {
    console.warn('[Database Tier] Local MongoDB unavailable (' + error.message + '). Starting In-Memory MongoDB engine...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      console.log('[Database Tier] In-Memory MongoDB running at:', memoryUri);
      
      await mongoose.connect(memoryUri);
      console.log('[Database Tier] Connected to In-Memory MongoDB fallback.');
      
      await seedIfEmpty(true);
    } catch (memErr) {
      console.error('[Database Tier Fatal Error] Failed to start in-memory MongoDB:', memErr.message);
    }
  }
};

module.exports = connectDB;
