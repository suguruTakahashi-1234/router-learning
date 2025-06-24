import { useNavigate } from "@tanstack/react-router";
import { PostForm } from "../components/PostForm";
import type { components } from "../generated/api";
import { useCreatePost } from "../user-posts";

export function PostNewPage() {
  const navigate = useNavigate({ from: "/posts/new" });
  const createPost = useCreatePost();

  const handleSubmit = async (data: components["schemas"]["CreatePost"]) => {
    try {
      await createPost.mutateAsync({ body: data });
      navigate({ to: "/" });
    } catch (error) {
      console.error("作成エラー:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新規投稿作成</h1>
      <PostForm onSubmit={handleSubmit} isSubmitting={createPost.isPending} />
    </div>
  );
}