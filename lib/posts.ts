import "server-only";
import { turso } from "@/lib/turso";

export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
};

type PostRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
};

function mapPost(row: PostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    description: row.excerpt ?? "",
    content: row.content,
    image: row.cover_image ?? "/images/modern-architecture.jpg",
    category: row.category ?? "Uncategorized",
    date: row.published_at ?? row.created_at,
    author: row.author ?? "ATELIER",
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const result = await turso.execute(`
    SELECT
      slug,
      title,
      excerpt,
      content,
      cover_image,
      category,
      author,
      published_at,
      created_at
    FROM posts
    WHERE published = 1
    ORDER BY published_at DESC
  `);

  return (result.rows as unknown as PostRow[]).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await turso.execute({
    sql: `
      SELECT
        slug,
        title,
        excerpt,
        content,
        cover_image,
        category,
        author,
        published_at,
        created_at
      FROM posts
      WHERE slug = ? AND published = 1
      LIMIT 1
    `,
    args: [slug],
  });

  const row = result.rows[0] as unknown as PostRow | undefined;

  return row ? mapPost(row) : null;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const result = await turso.execute({
    sql: `
      SELECT
        slug,
        title,
        excerpt,
        content,
        cover_image,
        category,
        author,
        published_at,
        created_at
      FROM posts
      WHERE published = 1 AND slug != ?
      ORDER BY
        CASE WHEN category = ? THEN 0 ELSE 1 END,
        published_at DESC
      LIMIT ?
    `,
    args: [post.slug, post.category, limit],
  });

  return (result.rows as unknown as PostRow[]).map(mapPost);
}
