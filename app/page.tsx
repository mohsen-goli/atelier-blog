import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";

export default function HomePage() {
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 4);

  return (
    <main className="bg-[#faf9f6] text-[#24231f]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9b795b]">
              The Journal — Issue No. 01
            </p>
            <h1 className="max-w-3xl text-5xl font-light leading-tight tracking-tight md:text-7xl">
              Stories that
              <br />
              inspire a <span className="italic">better life.</span>
            </h1>
          </div>

          <p className="hidden max-w-xs text-sm leading-7 text-gray-500 md:block">
            Thoughtful stories about architecture, culture, design and the
            beauty of everyday life.
          </p>
        </div>

        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group relative block overflow-hidden"
        >
          <div className="relative h-[420px] md:h-[580px]">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-3xl p-8 text-white md:p-14">
              <p className="mb-4 text-xs uppercase tracking-[0.3em]">
                Featured Story · {featuredPost.category}
              </p>
              <h2 className="text-3xl font-medium leading-tight md:text-5xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                {featuredPost.description}
              </p>
              <span className="mt-7 inline-block border-b border-white pb-2 text-sm">
                Read the story →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Latest Stories */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#9b795b]">
              Fresh Perspectives
            </p>
            <h2 className="text-3xl font-light md:text-4xl">Latest Stories</h2>
          </div>

          <Link href="/blog" className="text-sm text-[#8c6b4e] hover:underline">
            View all articles →
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative mb-5 aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <p className="mb-3 text-xs uppercase tracking-widest text-[#9b795b]">
                  {post.category}
                </p>

                <h3 className="text-2xl font-medium leading-snug transition group-hover:text-[#9b795b]">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {post.description}
                </p>

                <p className="mt-5 text-xs text-gray-400">By {post.author}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-[#eae6df] px-6 py-20 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9b795b]">
          Our Philosophy
        </p>

        <h2 className="mx-auto max-w-3xl text-3xl font-light leading-relaxed md:text-5xl">
          We believe the best stories make us see the world differently.
        </h2>

        <Link
          href="/about"
          className="mt-8 inline-block border-b border-[#8c6b4e] pb-2 text-sm"
        >
          Discover our journal →
        </Link>
      </section>
    </main>
  );
}
