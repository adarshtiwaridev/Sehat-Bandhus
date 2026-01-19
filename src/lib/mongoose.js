/**
 * Simple Mongoose connection helper for Next.js API routes.
 * Exports connect() which returns a connected mongoose instance.
 */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  // In production you must set MONGODB_URI in environment.
  console.warn('MONGODB_URI not set. API routes that use mongoose will fail without it.');
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser: true, // mongoose 7 no longer needs these
      // useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseObj) => {
      return mongooseObj;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connect };
