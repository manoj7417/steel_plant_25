"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

const AdminPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [newCategories, setNewCategories] = useState([]); // Track newly added categories

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: "",
    readTime: "",
    newCategory: "",
  });

  // Get unique categories from existing blogs and merge with newly added categories
  const blogCategories =
    blogs.length > 0
      ? [...new Set(blogs.map((blog) => blog.category).filter(Boolean))]
      : [
          "Sustainability",
          "Operations",
          "Technology",
          "Quality Control",
          "Process Engineering",
          "Equipment",
          "Safety",
        ];

  // Merge blog categories with newly added categories and sort
  const categories = [...new Set([...blogCategories, ...newCategories])].sort();

  // Get category usage count
  const getCategoryUsageCount = (category) => {
    return blogs.filter((blog) => blog.category === category).length;
  };

  // Add new category
  const handleAddCategory = () => {
    if (!newCategoryInput.trim()) {
      setError("Please enter a category name");
      return;
    }

    const trimmedCategory = newCategoryInput.trim();

    // Check if category already exists
    if (categories.includes(trimmedCategory)) {
      setError("This category already exists");
      return;
    }

    // Add to new categories state so it appears immediately
    setNewCategories((prev) => [...prev, trimmedCategory]);

    // Set the new category in the form
    setFormData((prev) => ({
      ...prev,
      category: trimmedCategory,
    }));

    setNewCategoryInput("");
    setShowCategoryManager(false);
    setError(null);
    setSuccess(`Category "${trimmedCategory}" added and selected!`);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Delete category (only if not in use)
  const handleDeleteCategory = (categoryToDelete) => {
    const usageCount = getCategoryUsageCount(categoryToDelete);

    if (usageCount > 0) {
      setError(
        `Cannot delete category "${categoryToDelete}" because it is used by ${usageCount} blog${
          usageCount > 1 ? "s" : ""
        }. Please update or delete those blogs first.`
      );
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete the category "${categoryToDelete}"?`
      )
    ) {
      return;
    }

    // Remove from newCategories immediately so it disappears from dropdown
    setNewCategories((prev) => prev.filter((cat) => cat !== categoryToDelete));

    // If the deleted category was selected in the form, clear it
    if (formData.category === categoryToDelete) {
      setFormData((prev) => ({
        ...prev,
        category: "",
      }));
    }

    setSuccess(`Category "${categoryToDelete}" deleted successfully!`);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Removed availableImages - only Cloudinary upload is supported now

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Check authentication and fetch blogs
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (response.ok) {
          setAuthenticated(true);
          fetchBlogs();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update image preview when image URL changes (for Cloudinary URLs)
    if (name === "image" && value && value.includes("cloudinary.com")) {
      setImagePreview(value);
    }
  };

  // Server-side Cloudinary upload handler
  const handleCloudinaryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to server-side API
      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (data.success && data.url) {
        console.log("Image uploaded successfully to Cloudinary:", data.url);
        setFormData((prev) => ({
          ...prev,
          image: data.url,
        }));
        setImagePreview(data.url);
        setSuccess(
          `Image uploaded successfully to Cloudinary! URL: ${data.url.substring(
            0,
            50
          )}...`
        );
        setTimeout(() => setSuccess(null), 5000);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Removed handleImageUpload - only Cloudinary upload is supported now

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      image: "",
      readTime: "",
      newCategory: "",
    });
    setEditingBlog(null);
    setShowForm(false);
    setImagePreview(null);
    setShowCategoryManager(false);
    setNewCategoryInput("");
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      date: blog.date,
      image: blog.image,
      readTime: blog.readTime,
      newCategory: "",
    });
    setImagePreview(blog.image);
    setShowForm(true);
    setShowCategoryManager(false);
    setNewCategoryInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Validate image - must be Cloudinary URL
      if (!formData.image || !formData.image.includes("cloudinary.com")) {
        setError(
          "Please upload an image file. Only file uploads are supported."
        );
        return;
      }

      const url = "/api/blogs";
      const method = editingBlog ? "PUT" : "POST";

      // Clean up form data (remove newCategory field if it exists)
      const { newCategory, ...cleanFormData } = formData;
      const body = editingBlog
        ? { id: editingBlog.id, ...cleanFormData }
        : cleanFormData;

      console.log(
        "Submitting blog with image:",
        cleanFormData.image?.substring(0, 100)
      );

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save blog");
      }

      const savedBlog = await response.json();
      console.log("Blog saved successfully. Image URL:", savedBlog.image);

      setSuccess(
        editingBlog
          ? "Blog updated successfully!"
          : "Blog created successfully!"
      );
      resetForm();
      // Fetch blogs and clean up newCategories
      const blogsResponse = await fetch("/api/blogs");
      if (blogsResponse.ok) {
        const updatedBlogs = await blogsResponse.json();
        setBlogs(updatedBlogs);
        // Remove categories that are now in blogs from newCategories
        const updatedBlogCategories = [
          ...new Set(updatedBlogs.map((blog) => blog.category).filter(Boolean)),
        ];
        setNewCategories((prev) =>
          prev.filter((cat) => !updatedBlogCategories.includes(cat))
        );
      } else {
        fetchBlogs();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error saving blog:", err);
      setError(err.message || "Failed to save blog. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setSuccess("Blog deleted successfully!");
      fetchBlogs();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError(err.message || "Failed to delete blog. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Dummy blog content with images from public folder
  const dummyBlogs = [
    {
      title: "Sustainable Steel Production: Reducing Carbon Footprint",
      excerpt:
        "Exploring innovative methods to reduce carbon emissions in steel manufacturing while maintaining quality and efficiency.",
      content:
        "The steel industry is undergoing a significant transformation as we work towards more sustainable production methods. Our latest initiatives focus on reducing carbon emissions through advanced technologies and process optimization. We've implemented energy-efficient furnaces, waste heat recovery systems, and are exploring hydrogen-based reduction processes. These efforts have already reduced our carbon footprint by 25% over the past three years, and we're committed to achieving carbon neutrality by 2035. Our sustainability team works closely with research institutions to develop cutting-edge solutions that balance environmental responsibility with operational excellence.",
      author: "Dr. Priya Sharma",
      category: "Sustainability",
      image: "/img1.webp",
      readTime: "8 min read",
    },
    {
      title: "Optimizing Production Line Efficiency",
      excerpt:
        "How we've improved our production throughput by 30% through strategic process improvements and automation.",
      content:
        "Production efficiency is the backbone of our operations. Over the past year, we've implemented several key improvements to our production lines. Automated quality control systems now catch defects in real-time, reducing waste by 40%. Our predictive maintenance program uses IoT sensors to anticipate equipment failures before they occur, minimizing downtime. We've also optimized our material flow, reducing handling time and improving worker safety. These improvements have resulted in a 30% increase in throughput while maintaining our high quality standards. Our operations team continues to identify new opportunities for improvement through data-driven analysis and continuous improvement methodologies.",
      author: "Rajesh Kumar",
      category: "Operations",
      image: "/0.jpg",
      readTime: "6 min read",
    },
    {
      title: "AI-Powered Quality Control Systems",
      excerpt:
        "Revolutionizing quality assurance with machine learning and computer vision technologies.",
      content:
        "Artificial intelligence is transforming how we ensure product quality. Our new AI-powered quality control system uses advanced computer vision to inspect every piece of steel that comes off our production line. The system can detect microscopic defects that would be invisible to the human eye, ensuring only the highest quality products reach our customers. Machine learning algorithms continuously improve their accuracy by learning from each inspection, becoming more precise over time. This technology has reduced false positives by 60% and increased defect detection rates by 45%. Our technology team is exploring additional AI applications, including predictive analytics for equipment maintenance and optimization algorithms for production scheduling.",
      author: "Arjun Patel",
      category: "Technology",
      image: "/11.png",
      readTime: "7 min read",
    },
    {
      title: "Advanced Testing Methods for Steel Quality",
      excerpt:
        "Implementing cutting-edge testing protocols to ensure every batch meets the highest industry standards.",
      content:
        "Quality control is non-negotiable in our operations. We've recently upgraded our testing laboratory with state-of-the-art equipment that allows us to perform comprehensive material analysis. Our new testing protocols include ultrasonic testing, magnetic particle inspection, and advanced spectroscopy techniques. These methods provide detailed insights into material composition, structural integrity, and mechanical properties. Every batch undergoes rigorous testing before it's approved for shipment. Our quality control team has developed custom testing procedures tailored to each product type, ensuring optimal performance in real-world applications. This commitment to quality has earned us certifications from leading industry organizations and the trust of our customers worldwide.",
      author: "Anjali Singh",
      category: "Quality Control",
      image: "/13.jpg",
      readTime: "5 min read",
    },
    {
      title: "Innovations in Steel Processing Techniques",
      excerpt:
        "Exploring new processing methods that enhance material properties and expand application possibilities.",
      content:
        "Process engineering is at the heart of innovation in steel manufacturing. Our research and development team is constantly exploring new techniques to improve material properties and processing efficiency. Recent breakthroughs include advanced heat treatment protocols that enhance strength and durability, new alloy compositions that offer superior corrosion resistance, and innovative forming techniques that reduce material waste. We've also developed proprietary processes for creating specialized steel grades for specific applications, from automotive components to construction materials. These innovations not only improve product performance but also reduce production costs and environmental impact. Our process engineers work closely with customers to develop custom solutions that meet their unique requirements.",
      author: "Dr. Vikram Reddy",
      category: "Process Engineering",
      image: "/15.jpg",
      readTime: "9 min read",
    },
    {
      title: "Modernizing Our Manufacturing Equipment",
      excerpt:
        "A comprehensive overview of our recent equipment upgrades and their impact on productivity and quality.",
      content:
        "Investing in modern equipment is essential for maintaining our competitive edge. Over the past two years, we've completed a major equipment modernization program, replacing aging machinery with state-of-the-art systems. Our new rolling mills feature advanced control systems that provide precise thickness control and improved surface quality. The upgraded furnaces use less energy while achieving more consistent temperatures, resulting in better material properties. We've also installed new cutting and finishing equipment that reduces processing time and improves dimensional accuracy. These investments have paid off with improved product quality, reduced energy consumption, and increased production capacity. Our maintenance team has been trained on the new equipment, ensuring optimal performance and reliability.",
      author: "Ravi Mehta",
      category: "Equipment",
      image: "/17.jpg",
      readTime: "6 min read",
    },
    {
      title: "Workplace Safety: Our Top Priority",
      excerpt:
        "How we've achieved zero workplace accidents for 18 consecutive months through comprehensive safety programs.",
      content:
        "Safety is our number one priority, and we're proud to have achieved zero workplace accidents for 18 consecutive months. This achievement is the result of a comprehensive safety program that includes regular training, hazard identification, and continuous improvement initiatives. All employees undergo extensive safety training when they join the company and participate in ongoing refresher courses. We've implemented advanced safety systems, including automated emergency shutdown procedures, comprehensive personal protective equipment programs, and real-time monitoring of hazardous conditions. Our safety committee meets regularly to review incidents, near-misses, and potential hazards, ensuring we're always improving our safety protocols. We believe that a safe workplace is not just a legal requirement but a moral obligation to our employees and their families.",
      author: "Kavita Desai",
      category: "Safety",
      image: "/19.jpg",
      readTime: "5 min read",
    },
    {
      title: "Green Energy Integration in Steel Manufacturing",
      excerpt:
        "How renewable energy sources are powering our operations and reducing our environmental impact.",
      content:
        "We're making significant strides in integrating renewable energy into our manufacturing processes. Our facility now generates 40% of its electricity needs from on-site solar panels and wind turbines. We've also invested in energy storage systems that allow us to use renewable energy even when the sun isn't shining or the wind isn't blowing. This transition to green energy has reduced our carbon emissions significantly while also lowering our energy costs. We're working towards increasing our renewable energy capacity to 80% by 2026. Additionally, we're exploring partnerships with local renewable energy providers to source the remaining energy needs from clean sources. This commitment to green energy is part of our broader sustainability strategy and demonstrates our dedication to environmental stewardship.",
      author: "Dr. Priya Sharma",
      category: "Sustainability",
      image: "/img2.jpg",
      readTime: "7 min read",
    },
    {
      title: "Streamlining Supply Chain Operations",
      excerpt:
        "Improving logistics and inventory management to reduce costs and improve delivery times.",
      content:
        "Efficient supply chain management is crucial for maintaining competitive advantage. We've recently overhauled our supply chain operations, implementing advanced inventory management systems and optimizing our logistics network. Real-time tracking systems now provide visibility into every shipment, from raw materials arriving at our facility to finished products reaching customers. We've established strategic partnerships with logistics providers to ensure reliable and cost-effective transportation. Our new inventory management system uses predictive analytics to optimize stock levels, reducing carrying costs while ensuring we always have materials available when needed. These improvements have reduced lead times by 25% and cut logistics costs by 15%, while improving customer satisfaction through more reliable deliveries.",
      author: "Rajesh Kumar",
      category: "Operations",
      image: "/1.jpg",
      readTime: "6 min read",
    },
    {
      title: "Digital Transformation in Manufacturing",
      excerpt:
        "How Industry 4.0 technologies are revolutionizing our production processes.",
      content:
        "The fourth industrial revolution is here, and we're embracing it wholeheartedly. Our digital transformation initiative is integrating IoT sensors, cloud computing, and advanced analytics throughout our operations. Every piece of equipment is now connected, providing real-time data on performance, efficiency, and maintenance needs. Our production managers use dashboards that display key performance indicators, allowing them to make data-driven decisions quickly. Machine learning algorithms analyze production data to identify optimization opportunities and predict potential issues before they impact operations. We've also implemented digital twin technology, creating virtual models of our production lines that allow us to test improvements without disrupting actual operations. This digital transformation is making our operations more efficient, flexible, and responsive to changing market conditions.",
      author: "Arjun Patel",
      category: "Technology",
      image: "/12.jpg",
      readTime: "8 min read",
    },
  ];

  const handleAddDummyContent = async () => {
    if (
      !confirm(
        `This will create ${dummyBlogs.length} dummy blog posts. Continue?`
      )
    ) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const blog of dummyBlogs) {
        try {
          const date = new Date();
          // Vary dates slightly for each blog
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const response = await fetch("/api/blogs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...blog,
              date: formattedDate,
            }),
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to create blog: ${blog.title}`);
          }
        } catch (err) {
          errorCount++;
          console.error(`Error creating blog: ${blog.title}`, err);
        }
      }

      setSuccess(
        `Successfully created ${successCount} blog posts${
          errorCount > 0 ? ` (${errorCount} failed)` : ""
        }!`
      );
      fetchBlogs();
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error("Error adding dummy content:", err);
      setError("Failed to add dummy content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update existing blogs with Indian names
  const handleUpdateAuthorNames = async () => {
    if (
      !confirm(
        "This will update all existing blog author names from foreign names to Indian names. Continue?"
      )
    ) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Mapping of old names to new Indian names
      const nameMapping = {
        "Dr. Sarah Mitchell": "Dr. Priya Sharma",
        "James Anderson": "Rajesh Kumar",
        "Michael Chen": "Arjun Patel",
        "Emily Rodriguez": "Anjali Singh",
        "Dr. Robert Kim": "Dr. Vikram Reddy",
        "David Thompson": "Ravi Mehta",
        "Lisa Martinez": "Kavita Desai",
      };

      let updatedCount = 0;
      let errorCount = 0;

      // Update each blog that has a foreign name
      for (const blog of blogs) {
        if (nameMapping[blog.author]) {
          try {
            const response = await fetch("/api/blogs", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: blog.id,
                title: blog.title,
                excerpt: blog.excerpt,
                content: blog.content,
                author: nameMapping[blog.author],
                category: blog.category,
                date: blog.date,
                image: blog.image,
                readTime: blog.readTime,
              }),
            });

            if (response.ok) {
              updatedCount++;
            } else {
              errorCount++;
              console.error(`Failed to update blog: ${blog.title}`);
            }
          } catch (err) {
            errorCount++;
            console.error(`Error updating blog: ${blog.title}`, err);
          }
        }
      }

      setSuccess(
        `Successfully updated ${updatedCount} blog author names${
          errorCount > 0 ? ` (${errorCount} failed)` : ""
        }!`
      );
      fetchBlogs();
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error("Error updating author names:", err);
      setError("Failed to update author names. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          <p className="text-gray-600 mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/1-removebg.png"
                alt="Steel Plant Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-gray-800">
                Blog Admin
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Blog Management
            </h1>
            <p className="text-gray-600">
              Add, edit, and delete blog posts for your website.
            </p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Add New Blog Button */}
          {!showForm && (
            <div className="mb-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add New Blog</span>
              </button>
              {/* <button
                onClick={handleUpdateAuthorNames}
                disabled={loading || blogs.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Update Author Names to Indian</span>
              </button> */}
            </div>
          )}

          {/* Blog Form */}
          {showForm && (
            <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Category *
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCategoryManager(!showCategoryManager)
                        }
                        className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                      >
                        {showCategoryManager ? "Hide" : "Add new categories"}
                      </button>
                    </div>

                    {/* Category Manager */}
                    {showCategoryManager && (
                      <div className="mb-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Manage Categories
                        </h4>

                        {/* Add New Category */}
                        <div className="mb-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newCategoryInput}
                              onChange={(e) =>
                                setNewCategoryInput(e.target.value)
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddCategory();
                                }
                              }}
                              placeholder="Enter new category name"
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                            />
                            <button
                              type="button"
                              onClick={handleAddCategory}
                              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Category List */}
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {categories.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              No categories yet
                            </p>
                          ) : (
                            categories.map((cat) => {
                              const usageCount = getCategoryUsageCount(cat);
                              return (
                                <div
                                  key={cat}
                                  className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded"
                                >
                                  <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-900">
                                      {cat}
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500">
                                      ({usageCount} blog
                                      {usageCount !== 1 ? "s" : ""})
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCategory(cat)}
                                    disabled={usageCount > 0}
                                    className={`ml-2 px-2 py-1 text-xs font-medium rounded transition-colors ${
                                      usageCount > 0
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                    }`}
                                    title={
                                      usageCount > 0
                                        ? "Cannot delete: category is in use"
                                        : "Delete category"
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}

                    {/* Category Selector - Dropdown or Text Input */}
                    {formData.category === "__new__" ||
                    (formData.category &&
                      !categories.includes(formData.category) &&
                      formData.category !== "") ? (
                      // Show text input for new category
                      <div>
                        <input
                          type="text"
                          name="category"
                          value={
                            formData.category === "__new__"
                              ? ""
                              : formData.category
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              category: value || "__new__",
                            }));
                          }}
                          required
                          placeholder="Enter new category name"
                          className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                          autoFocus={formData.category === "__new__"}
                        />
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                          New category will be created when you save the blog
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, category: "" }));
                          }}
                          className="mt-2 text-xs text-gray-600 hover:text-gray-800"
                        >
                          Cancel and select from list
                        </button>
                      </div>
                    ) : (
                      // Show dropdown for existing categories
                      <div>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      placeholder="January 15, 2025"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Read Time *
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      required
                      placeholder="5 min read"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Image *
                  </label>

                  {/* Cloudinary Upload Section */}
                  <div className="space-y-4">
                    {/* File Upload Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCloudinaryUpload}
                        disabled={uploading}
                        className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      />
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-xl">
                          <div className="flex items-center space-x-3 text-orange-600">
                            <svg
                              className="animate-spin h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span className="font-medium">
                              Uploading file...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Success Message */}
                    {formData.image &&
                      formData.image.includes("cloudinary.com") && (
                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                          <div className="flex items-start">
                            <svg
                              className="h-5 w-5 text-green-500 mt-0.5 mr-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-green-800">
                                Image uploaded successfully!
                              </p>
                              {/* <p className="text-xs text-green-700 mt-1 break-all">
                                {formData.image.substring(0, 100)}...
                              </p> */}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Preview:
                        </p>
                        <div className="relative w-full max-w-md h-64 border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blogs List */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                All Blogs ({blogs.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                <p className="text-gray-600 mt-4">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600">
                  No blogs found. Create your first blog!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {blog.title}
                          </h3>
                          <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                            {blog.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
