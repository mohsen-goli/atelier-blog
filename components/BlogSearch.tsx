"use client";

import { useState } from "react";
import { posts } from "@/data/posts";
import Link from "next/link";

export default function BlogSearch() {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="mb-10">
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
      />

      <div className="mt-6 space-y-4">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-gray-200 p-4"
          >
            <h2 className="font-bold text-gray-900">{post.title}</h2>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-2 inline-block text-blue-600"
            >
              Read Article →
            </Link>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No articles found.</p>
        )}
      </div>
    </section>
  );
}
