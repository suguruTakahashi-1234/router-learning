import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-orange-600 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold text-white hover:text-orange-200 transition-colors"
            >
              ブログ管理システム (React Router + Code-based)
            </Link>
            <nav>
              <Link
                to="/posts/new"
                className="rounded-md bg-white text-orange-600 px-4 py-2 text-sm font-medium hover:bg-orange-50 transition-colors"
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
  );
}
