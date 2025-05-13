// import { SanityDocument } from "@sanity/client";
import { Link } from "react-router";
import client from "../sanity/sanityClient";
// import { Route } from "./+types/home";
import { urlFor } from "../sanity/sanityClient";

// import abeokuta from "../assets/images/abeokuta/abeokuta.jpg";

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  categories[]->{
    _id,
    title
  }
}`;

export async function loader() {
  const data = await client.fetch(POSTS_QUERY);
  // console.log("Fetched Data:", data); // Debugging log
  return { posts: data };
}

export default function BlogList({ loaderData = { posts: [] } }) {
  const { posts } = loaderData;

  return (
    <section className="py-12 px-6 bg-white">
      <div>
        <p className="text-[#9d9577] text-sm capitalize text-center">Blogs</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:max-w-98 mx-auto">
          Latest from the Compass Trybe Blog
        </h2>
      </div>
      <ul className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post) => (
          <li
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            key={post._id}
          >
            <Link to={`/blog/${post.slug.current}`}>
              {post.mainImage ? (
                <img
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post?.title || "No image available"}
                  className="w-full h-52 object-cover mb-6"
                />
              ) : (
                <div className="w-40 h-40 my-4 rounded bg-gray-50 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="px-5 mt-4">
                <h2 className="text-xl font-semibold mb-1">{post.title}</h2>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 text-xs text-[#9d9577] py-3">
                  {post.categories?.map((cat) => (
                    <span
                      key={cat._id}
                      className="bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
