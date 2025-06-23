import { createFileRoute, Link } from "@tanstack/react-router";
import { usePosts } from "../user-posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-800">
          エラーが発生しました: {error.message}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">投稿がありません</p>
        <Link
          to="/posts/new"
          className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          最初の投稿を作成
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">投稿一覧</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <Link
              to="/posts/$postId"
              params={{ postId: post.id }}
              className="block"
            >
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
        ))}
      </div>
    </div>
  );
}