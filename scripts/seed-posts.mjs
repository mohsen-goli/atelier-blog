import { db } from "./db-client.mjs";

const posts = [
  {
    slug: "architecture-of-tomorrow",
    title: "The Architecture of Tomorrow",
    excerpt: "Discover how modern architecture is reshaping the way we live.",
    content:
      "Architecture is more than designing buildings. It is about creating meaningful spaces that connect people, nature and everyday life.",
    cover_image: "/images/modern-architecture.jpg",
    category: "Architecture",
    author: "Alex Morgan",
    published_at: "2026-11-24",
  },
  {
    slug: "art-of-minimal-living",
    title: "The Art of Minimal Living",
    excerpt: "A thoughtful approach to living with less and experiencing more.",
    content:
      "Minimal living is not about owning nothing. It is about making room for the things that truly matter.",
    cover_image: "/images/interior-design.jpg",
    category: "Lifestyle",
    author: "Emma Wilson",
    published_at: "2026-11-23",
  },
  {
    slug: "modern-fashion-stories",
    title: "Modern Fashion Stories",
    excerpt: "Exploring timeless style and the beauty of simplicity.",
    content:
      "True style is not about following every trend. It is about discovering what feels authentic to you.",
    cover_image: "/images/fashion-editorial.jpg",
    category: "Fashion",
    author: "Sophia Blake",
    published_at: "2026-11-22",
  },
  {
    slug: "finding-beauty-in-nature",
    title: "Finding Beauty in Nature",
    excerpt: "Why reconnecting with nature matters more than ever.",
    content:
      "Nature reminds us to slow down, observe and appreciate the small details around us.",
    cover_image: "/images/nature-story.jpg",
    category: "Nature",
    author: "Daniel Reed",
    published_at: "2026-11-21",
  },
  {
    slug: "the-new-way-of-working",
    title: "The New Way of Working",
    excerpt: "How technology is changing our everyday work experience.",
    content:
      "Technology continues to reshape the way people collaborate, create and communicate.",
    cover_image: "/images/technology.jpg",
    category: "Technology",
    author: "Alex Morgan",
    published_at: "2026-11-20",
  },
  {
    slug: "slow-travel-guide",
    title: "The Art of Slow Travel",
    excerpt: "Experience destinations beyond the typical tourist journey.",
    content:
      "Slow travel invites us to explore places with curiosity and connect with local culture.",
    cover_image: "/images/travel.jpg",
    category: "Travel",
    author: "Emma Wilson",
    published_at: "2026-11-19",
  },
];

async function main() {
  for (const post of posts) {
    await db.execute({
      sql: `
        INSERT INTO posts (
          title, slug, excerpt, content, cover_image,
          category, author, published, published_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
        ON CONFLICT(slug) DO UPDATE SET
          title = excluded.title,
          excerpt = excluded.excerpt,
          content = excluded.content,
          cover_image = excluded.cover_image,
          category = excluded.category,
          author = excluded.author,
          published = 1,
          published_at = excluded.published_at;
      `,
      args: [
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.cover_image,
        post.category,
        post.author,
        post.published_at,
      ],
    });
  }

  console.log(`${posts.length} posts imported successfully!`);
}

main()
  .catch((error) => {
    console.error("Import failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => db.close());
