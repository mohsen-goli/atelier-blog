import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(projectRoot, ".env.local");

// Load local secrets for scripts, while still supporting CI/production env vars.
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error(
    "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN. Add them to .env.local or your environment.",
  );
}

export const db = createClient({ url, authToken });
