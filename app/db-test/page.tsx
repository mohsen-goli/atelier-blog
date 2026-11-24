import { turso } from "@/lib/turso";

export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
  try {
    const result = await turso.execute("SELECT 1 AS connection");

    const connected = result.rows[0]?.connection === 1;

    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-6 text-3xl font-light">Database Connection Test</h1>

        {connected ? (
          <p className="text-green-700">Successfully connected to Turso!</p>
        ) : (
          <p className="text-red-600">Connection test failed.</p>
        )}
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-6 text-3xl font-light">Database Connection Test</h1>

        <p className="text-red-600">Could not connect to the database.</p>
      </main>
    );
  }
}
