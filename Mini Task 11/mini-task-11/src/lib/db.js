// lib/db.js

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI)
  throw new Error("Please define MONGODB_URI in your .env.local file")

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    // If the connection is cached, we return it as it is
    if (cached.conn) {
        return cached.conn
    }

    // If no pending connection, we create a new one
    if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("MongoDB connected")
      return mongoose
    })
  }

    // In case connection fails, next request tries again
    try {
        cached.conn = await cached.promise
    } 
    catch (error) {
        cached.promise = null   // Now next request tries again
        throw error
    }
    return cached.conn
}