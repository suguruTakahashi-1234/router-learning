import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Link, Outlet, Scripts, ScrollRestoration } from "react-router-dom";
import "./index.css";

const queryClient = new QueryClient();

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ブログ管理システム (React Router + File-based)</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🟣</text></svg>"
        />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
    </div>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-purple-600 shadow-sm">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                className="text-xl font-semibold text-white hover:text-purple-200 transition-colors"
              >
                ブログ管理システム (React Router + File-based)
              </Link>
              <nav>
                <Link
                  to="/posts/new"
                  className="rounded-md bg-white text-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-50 transition-colors"
                >
                  新規投稿
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
