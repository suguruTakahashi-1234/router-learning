import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export function RootLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-blue-600 shadow-sm">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                from="/"
                className="text-xl font-semibold text-white hover:text-blue-200 transition-colors"
              >
                ブログ管理システム (TanStack Router + Code-based)
              </Link>
              <nav>
                <Link
                  to="/posts/new"
                  from="/"
                  className="rounded-md bg-white text-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors"
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
      <TanStackRouterDevtools />
    </>
  );
}
