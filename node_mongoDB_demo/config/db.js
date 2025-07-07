require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    db = client.db();
    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
  } catch (err) {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.error("Error connecting to MongoDB", err);
  }
}

function getDB() {
  if (!db) {
    throw new Error("database connection not initialized");
  }
  return db;
}

module.exports = { connectToDB, getDB, client };
