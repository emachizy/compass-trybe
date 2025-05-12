import React, { useState } from "react";
import { Link } from "react-router-dom";
import abeokuta from "../assets/images/abeokuta/abeokuta.jpg";

const mockBlogs = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Morocco",
    excerpt:
      "From the blue streets of Chefchaouen to the golden dunes of the Sahara...",
    imageUrl: abeokuta,
    date: "April 25, 2025",
    tags: ["Africa", "Adventure"],
  },
  {
    id: 2,
    title: "A Foodie's Guide to Street Eats in Bangkok",
    excerpt: "Take your taste buds on an unforgettable ride through Bangkok...",
    imageUrl: "/images/blogs/bangkok.jpg",
    date: "May 2, 2025",
    tags: ["Asia", "Food"],
  },
  {
    id: 3,
    title: "Solo Travel: Building Confidence on the Road",
    excerpt:
      "Learn how solo travel can change your perspective and boost self-reliance...",
    imageUrl: "/images/blogs/solo-travel.jpg",
    date: "May 7, 2025",
    tags: ["Solo Travel", "Mindset"],
  },
  {
    id: 4,
    title: "Europe by Train: Scenic Routes & Tips",
    excerpt: "Discover the most scenic train journeys across Europe...",
    imageUrl: "/images/blogs/europe-train.jpg",
    date: "May 9, 2025",
    tags: ["Europe", "Transportation"],
  },
  // Add more posts here
];

const uniqueTags = [
  "All",
  ...Array.from(new Set(mockBlogs.flatMap((b) => b.tags))),
];

export default function BlogList() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredBlogs =
    selectedTag === "All"
      ? mockBlogs
      : mockBlogs.filter((blog) => blog.tags.includes(selectedTag));

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="py-12 px-6 bg-white">
      <div>
        <div>
          <p className="text-[#9d9577] text-sm capitalize text-center">Blogs</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:max-w-98 mx-auto">
            Latest from the Compass Trybe Blog
          </h2>
        </div>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTag(tag);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm border ${
              selectedTag === tag
                ? "bg-[#9d9577] text-white"
                : "bg-gray-100 text-[#9d9577]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {paginatedBlogs.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-indigo-100 text-[#9d9577] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="text-[#9d9577] hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-9 h-9 rounded-full text-sm font-medium border ${
              currentPage === idx + 1
                ? "bg-[#9d9577] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
