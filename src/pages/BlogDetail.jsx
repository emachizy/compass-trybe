import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-4">Blog Post #{id}</h1>
      <p className="text-gray-600 mb-4">Published: May 11, 2025</p>
      <p className="text-lg">
        This is a placeholder for blog post {id}. You can pull in actual data
        later from an API or CMS.
      </p>
    </div>
  );
}
