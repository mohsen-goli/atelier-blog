# ATELIER Blog

A Next.js blog project using Turso (libSQL) for its database.

## Requirements

- Node.js 20.12 or newer
- npm

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Turso database setup

1. Create a database in [Turso](https://turso.tech/).
2. Copy its database URL and create an authentication token.
3. Add both values to the root `.env.local` file:

```dotenv
TURSO_DATABASE_URL=libsql://your-database-name-your-org.aws-region.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

Keep `.env.local` private. It is ignored by Git and must never be committed.

Run the database scripts from the project root:

```bash
npm run db:create
npm run db:seed
npm run db:read
```

- `db:create` creates the `posts` table if it does not already exist.
- `db:seed` inserts the six sample posts. Running it again updates matching slugs instead of creating duplicates.
- `db:read` prints up to three posts from the database.

The scripts load `.env.local` automatically for local development. In CI or hosted environments, provide `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as environment variables.

## Production build

```bash
npm run build
npm run start
```

## Useful links

- [Next.js documentation](https://nextjs.org/docs)
- [Turso documentation](https://docs.turso.tech/)
