import { db } from "./db-client.mjs";

async function main() {
  const result = await db.execute("SELECT * FROM posts LIMIT 3");

  console.log("Posts from Turso:");
  console.table(result.rows);
}

main()
  .catch((error) => {
    console.error("Reading posts failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => db.close());
