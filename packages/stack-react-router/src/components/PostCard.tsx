import { Link } from "react-router-dom";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <Link to={`/posts/${post.id}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              post.published
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {post.published ? "公開" : "下書き"}
          </span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </Link>
    </article>
  );
}