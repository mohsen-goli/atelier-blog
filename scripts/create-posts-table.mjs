import { db } from "./db-client.mjs";

async function main() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image TEXT,
      category TEXT,
      author TEXT,
      published INTEGER NOT NULL DEFAULT 0,
      published_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Posts table created successfully!");
}

main()
  .catch((error) => {
    console.error("Database migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => db.close());
