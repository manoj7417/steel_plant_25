"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const BlogListingPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Add cache: 'no-store' to prevent caching and always get fresh data
      // Add timestamp to force fresh fetch
      const response = await fetch(`/api/blogs?t=${Date.now()}`, {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      // Data is already sorted by createdAt from the API
      const sortedData = Array.isArray(data) ? data : [];
      setBlogPosts(sortedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Refresh blogs when page becomes visible (user navigates back to this page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchBlogs();
      }
    };

    const handleFocus = () => {
      fetchBlogs();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/1-removebg.png"
                alt="Steel Plant Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">
                Metal Traders & Processing Co.
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={fetchBlogs}
                disabled={loading}
                className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh blogs"
              >
                <svg
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <Link
                href="/"
                className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
              >
                ← Home
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Our Blog
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Insights, updates, and expert knowledge from the world of steel
            processing and metal trading
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[73px] z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-600"></div>
              <p className="text-lg text-gray-600 mt-4 font-medium">
                Loading blogs...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-900 font-medium">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                No posts found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.id}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-orange-200 transition-colors duration-200">
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2 leading-tight">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-semibold text-xs">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {post.author}
                          </p>
                        </div>
                        <span className="text-gray-600 group-hover:text-orange-600 font-medium text-sm flex items-center transition-colors duration-200">
                          Read
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogListingPage;
