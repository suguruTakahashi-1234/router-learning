import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostEditPage } from "./pages/PostEditPage";
import { PostNewPage } from "./pages/PostNewPage";

// ルートルートの定義
const rootRoute = createRootRoute({
  component: RootLayout,
});

// インデックスルート
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// 投稿関連のルート
export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "posts",
});

export const postsNewRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "new",
  component: PostNewPage,
});

export const postDetailRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "$postId",
  component: PostDetailPage,
});

export const postEditRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "$postId/edit",
  component: PostEditPage,
});

// ルートツリーの構築（オブジェクト形式でパフォーマンス最適化）
const routeTree = rootRoute.addChildren({
  indexRoute,
  postsRoute: postsRoute.addChildren({
    postsNewRoute,
    postDetailRoute,
    postEditRoute,
  }),
});

// ルーターの作成
export const router = createRouter({ routeTree });

// 型安全性のための宣言
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
