// One-time migration: load src/lib/users.json's allowlist into MongoDB's
// `users` collection. Run with: node scripts/seed-users.mjs
// Requires MONGODB_URI (and optionally MONGODB_DB) in the environment.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { MongoClient } from 'mongodb';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  const dbName = process.env.MONGODB_DB ?? 'spero';

  const usersJsonPath = join(__dirname, '../src/lib/users.json');
  const usersData = JSON.parse(readFileSync(usersJsonPath, 'utf-8'));

  const client = new MongoClient(uri);
  await client.connect();
  try {
    const collection = client.db(dbName).collection('users');
    for (const [email, entry] of Object.entries(usersData)) {
      const normalizedEmail = email.toLowerCase();
      await collection.updateOne(
        { email: normalizedEmail },
        { $set: { email: normalizedEmail, name: entry.name, permissions: entry.permissions } },
        { upsert: true }
      );
      console.log(`Upserted ${normalizedEmail}`);
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
