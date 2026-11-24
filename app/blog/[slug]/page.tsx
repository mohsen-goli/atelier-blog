import { posts } from "@/data/posts";
import LikeButton from "@/components/LikeButton";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | ATELIER",
    };
  }

  return {
    title: `${post.title} | ATELIER`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter(
      (item) => item.slug !== post.slug && item.category === post.category,
    )
    .concat(posts.filter((item) => item.slug !== post.slug))
    .filter(
      (item, index, array) =>
        array.findIndex((other) => other.slug === item.slug) === index,
    )
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#24231f]">
      {/* Article Header */}
      <section className="mx-auto max-w-5xl px-6 pt-16 md:pt-24">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#9b795b] transition hover:gap-5"
        >
          <span>←</span>
          Back to Journal
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#9b795b]">
            {post.category}
          </p>

          <h1 className="text-4xl font-light leading-tight tracking-tight md:text-6xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-gray-500 md:text-base">
            {post.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs uppercase tracking-widest text-gray-400">
            <span>By {post.author}</span>
            <span className="h-1 w-1 rounded-full bg-[#9b795b]" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto mt-14 max-w-7xl px-4 md:mt-20 md:px-8">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/8]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="border-b border-[#e9e4dc] pb-12">
          <p className="text-lg leading-9 text-[#555047] md:text-xl md:leading-10">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between py-8">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Enjoyed this story?
          </span>
          <LikeButton slug={post.slug} />
        </div>

        <div className="border-t border-[#e9e4dc] pt-8">
          <Link
            href="/blog"
            className="text-sm text-[#9b795b] transition hover:underline"
          >
            ← Explore more stories
          </Link>
        </div>
      </article>

      {/* Related Stories */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e9e4dc] bg-[#f1eee8] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9b795b]">
                Keep Exploring
              </p>
              <h2 className="text-3xl font-light md:text-4xl">
                You May Also Like
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group"
                >
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <p className="mb-3 text-xs uppercase tracking-widest text-[#9b795b]">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-medium leading-snug transition group-hover:text-[#9b795b]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
