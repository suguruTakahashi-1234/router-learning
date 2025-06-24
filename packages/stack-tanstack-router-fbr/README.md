# 📝 ブログ管理システム (TanStack Router + File-based Routing)

このパッケージは以下の技術スタックを使用しています：
- **ルーター**: TanStack Router
- **ルーティング方式**: File-based Routing (ファイルベースルーティング) ※TanStack推奨

## 特徴

- ファイルシステムの構造に基づいて自動的にルートを生成
- `src/routes/` ディレクトリ内のファイル構造がそのままルート構造になる
- `routeTree.gen.ts` ファイルが自動生成される
- Vite設定で `TanStackRouterVite()` プラグインを使用
- 規約に従うことで自動化されるが、柔軟性は制限される

## 開発

```bash
pnpm dev
```

## ビルド

```bash
pnpm build
```