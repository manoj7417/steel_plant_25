"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Footer from "../../components/Footer";

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs?id=${params.id}`, {
          cache: "no-store",
          next: { revalidate: 0 },
        });
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog not found");
          }
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message || "Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-600"></div>
          <p className="text-lg text-gray-600 mt-4 font-medium">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {error || "Blog Not Found"}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

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

            <Link
              href="/blogs"
              className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
            >
              ← Back to Blogs
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Article Header */}
        <header className="pt-16 pb-12">
          {/* Category */}
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-10 tracking-tight">
            {blog.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 pb-10 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold text-base">
                  {blog.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base leading-tight">
                  {blog.author}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{blog.date}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {blog.readTime}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-16 -mx-6 sm:-mx-8 lg:-mx-12">
          <div className="relative w-full aspect-[16/10] bg-gray-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="pb-20">
          {/* Short Description */}
          <div className="mb-12">
            <p className="text-2xl sm:text-3xl text-gray-700 leading-relaxed font-normal">
              {blog.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-6 text-lg">
              {blog.content.split("\n\n").map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p key={index} className="mb-6 text-gray-800 leading-8">
                      {paragraph.trim()}
                    </p>
                  )
              )}
            </div>

            {/* Additional content paragraphs */}
            <div className="mt-12 pt-12 border-t border-gray-200 space-y-6">
              <p className="text-gray-800 leading-8 text-lg">
                At Metal Traders & Processing Co., we are committed to
                excellence in every aspect of our operations. Our team of
                experts works tirelessly to ensure that we deliver the highest
                quality services while maintaining the strictest safety and
                environmental standards.
              </p>

              <p className="text-gray-800 leading-8 text-lg">
                For more information about our services or to discuss your
                specific requirements, please don&apos;t hesitate to contact our
                team. We&apos;re here to help you achieve your goals with our
                industry-leading expertise and state-of-the-art facilities.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="bg-orange-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Interested in Learning More?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-base">
                Contact our team to discuss how we can help with your steel
                processing needs.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <span>Contact Us</span>
                <svg
                  className="w-4 h-4"
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
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/blogs"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to All Blogs</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
