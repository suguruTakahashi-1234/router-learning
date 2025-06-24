import { useNavigate } from "@tanstack/react-router";
import { PostForm } from "../components/PostForm";
import type { components } from "../generated/api";
import { postEditRoute } from "../router";
import { usePost, useUpdatePost } from "../user-posts";

export function PostEditPage() {
  const { postId } = postEditRoute.useParams();
  const navigate = useNavigate({ from: "/posts/$postId/edit" });
  const { data, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();

  const handleSubmit = async (
    formData: components["schemas"]["CreatePost"],
  ) => {
    try {
      const updateData: components["schemas"]["UpdatePost"] = {
        title: formData.title,
        content: formData.content,
        published: formData.published,
      };
      await updatePost.mutateAsync({
        params: { path: { id: postId } },
        body: updateData,
      });
      navigate({ to: "/posts/$postId", params: { postId } });
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-800">投稿が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">投稿編集</h1>
      <PostForm
        initialData={data.data}
        onSubmit={handleSubmit}
        isSubmitting={updatePost.isPending}
      />
    </div>
  );
}
