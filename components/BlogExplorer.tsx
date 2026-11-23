"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import BlogCategories from "./BlogCategories";

export default function BlogExplorer() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");

  const pageSize = 2;

  // 1. Filter articles
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 2. Sort articles
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

  // 3. Pagination
  const totalPages = Math.ceil(sortedPosts.length / pageSize);

  const visiblePosts = sortedPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Our Blog</h1>

        <p className="mt-3 text-gray-500">
          Explore our latest articles and tutorials.
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setCurrentPage(1);
        }}
        className="mb-8 w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
      />

      {/* Sorting */}
      <div className="mb-8 flex items-center gap-3">
        <label htmlFor="sort" className="font-medium text-gray-700">
          Sort by:
        </label>

        <select
          id="sort"
          value={sortOrder}
          onChange={(event) => {
            setSortOrder(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">Title A–Z</option>
        </select>
      </div>

      {/* Categories */}
      <BlogCategories
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);

          if (category === "All") {
            setSearch("");
          }
        }}
      />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              {/* Publication Date */}
              <p className="mb-3 text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* Category */}
              <span className="text-sm font-medium text-blue-600">
                {post.category}
              </span>

              {/* Title */}
              <h2 className="mt-2 text-xl font-bold text-gray-900">
                {post.title}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {post.description}
              </p>

              {/* Article Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No articles found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-lg bg-gray-200 px-5 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
