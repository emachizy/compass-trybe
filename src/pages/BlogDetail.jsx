import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../sanity/sanityClient";
import { PortableText } from "@portabletext/react";
import Footer from "../components/Footer";
import { urlFor } from "../sanity/sanityClient";

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "post" && slug.current == $slug][0] {
        ...,
        categories[]-> {
          _id,
          title
        }
      }`,
          { slug }
        );
        setPost(data);

        if (data?._id) {
          const related = await client.fetch(
            `*[_type == "post" && _id != $id && count(categories[@._ref in $categoryIds]) > 0][0...3]{
          _id,
          title,
          slug,
          publishedAt,
          mainImage,
          categories[]->{
            _id,
            title
          }
        }`,
            {
              id: data._id,
              categoryIds: data.categories?.map((cat) => cat._id) || [],
            }
          );

          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4 max-w-3xl mx-auto mt-20 md:px-0 px-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2 py-5">
          {post?.categories?.map((cat) => (
            <p
              key={cat._id}
              className="bg-[#9d9577] px-2 py-0.5 rounded-full text-white"
            >
              {cat.title}
            </p>
          ))}
        </div>

        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.title}
            className="w-full h-72 object-cover my-4 rounded"
          />
        )}
        <PortableText value={post.body} />
      </div>

      {/* 🧭 Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-semibold">Related Posts</h2>
          <div className="mb-4 bg-[#9d9577] h-0.5 w-16"></div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                to={`/blog/${related.slug.current}`}
                key={related._id}
                className="border rounded shadow hover:shadow-md transition-all"
              >
                {related.mainImage ? (
                  <img
                    src={urlFor(related.mainImage).width(400).height(200).url()}
                    alt={related.title}
                    className="w-full h-40 object-cover rounded-t"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded-t">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{related.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-[#9d9577] mt-1">
                    {related.categories?.map((cat) => (
                      <span
                        key={cat._id}
                        className="bg-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(related.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BlogDetails;
