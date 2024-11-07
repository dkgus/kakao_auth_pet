import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, {
  ssl: true,
  tls: true,
  tlsInsecure: true,
});
let db: Db | null = null;

export async function getDb(dbName: string = "User"): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}
