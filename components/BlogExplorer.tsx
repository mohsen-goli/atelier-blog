"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import BlogCategories from "./BlogCategories";

type BlogExplorerProps = {
  posts: Post[];
};

export default function BlogExplorer({ posts }: BlogExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");

  const pageSize = 2;

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))).sort(),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortOrder === "az") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedPosts.length / pageSize);
  const visiblePosts = sortedPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-light">Journal</h1>
        <p className="text-gray-500">
          Thoughts, stories and inspiration from our world.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search articles..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-500"
        />

        {/* Custom editorial sort menu */}
        <div className="relative min-w-[190px]">
          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none rounded-full border border-[#e8dadd] bg-[#fbf7f6] px-5 py-3 pr-11 text-sm font-medium text-[#762d40] shadow-sm outline-none transition duration-300 hover:border-[#b77b89] focus:border-[#762d40] focus:ring-2 focus:ring-[#762d40]/10"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A to Z</option>
          </select>

          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#762d40]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              d="m7 10 5 5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <BlogCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
          if (category === "All") setSearch("");
        }}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <p className="mb-2 text-sm text-gray-500">{post.category}</p>

              <h2 className="mb-2 text-2xl font-light transition group-hover:text-gray-500">
                {post.title}
              </h2>

              <p className="text-sm leading-7 text-gray-500">
                {post.description}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <p className="py-16 text-center text-gray-500">No articles found.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
