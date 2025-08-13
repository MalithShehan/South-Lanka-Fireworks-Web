import React from "react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Galle Face 75th Independence Celebration Fireworks",
      date: "February 4, 2025",
      image: "/assets/blog1.jpg",
      excerpt: "A spectacular display that lit up Colombo's night sky...",
    },
    {
      id: 2,
      title: "Top Fireworks for Sinhala & Tamil New Year",
      date: "April 5, 2025",
      image: "/assets/blog2.jpg",
      excerpt: "Our must-have fireworks for the festive season...",
    },
    {
      id: 3,
      title: "5 Safety Rules Everyone Should Follow During Fireworks",
      date: "May 1, 2025",
      image: "/assets/blog3.jpg",
      excerpt: "Enjoy fireworks safely with these important tips...",
    },
  ];

  return (
    <section id="blog" className="p-8 ">
      <h2 className="text-3xl font-bold text-center mb-6">
        South Lanka Fireworks Blog
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white/50 shadow-lg rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700">{post.excerpt}</p>
              <button className="mt-3 text-red-600 font-semibold hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
