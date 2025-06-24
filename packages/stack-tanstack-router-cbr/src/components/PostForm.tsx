import { useEffect, useId, useState } from "react";
import type { components } from "../generated/api";

interface PostFormProps {
  initialData?: components["schemas"]["Post"];
  onSubmit: (data: components["schemas"]["CreatePost"]) => Promise<void>;
  isSubmitting: boolean;
}

export function PostForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  const titleId = useId();
  const contentId = useId();
  const [formData, setFormData] = useState<components["schemas"]["CreatePost"]>(
    {
      title: "",
      content: "",
      userId: "clh1234567890abcdef", // 仮のユーザーID
      published: false,
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        userId: initialData.userId,
        published: initialData.published,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor={titleId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          タイトル
        </label>
        <input
          type="text"
          id={titleId}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          placeholder="記事のタイトルを入力"
        />
      </div>

      <div>
        <label
          htmlFor={contentId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          本文
        </label>
        <textarea
          id={contentId}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          rows={10}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          placeholder="記事の内容を入力"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">公開する</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "保存中..." : initialData ? "更新" : "作成"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
