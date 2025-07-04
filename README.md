# React Router v7 / TanStack Router x File-Based / Code-Based 4パターン実装比較

## 🧪 このリポジトリについて

このリポジトリは、React Router v7とTanStack Routerの2つのルーティングライブラリを、File-Based RoutingとCode-Based Routingの両方で実装し、実際に動作する4つのサンプルアプリケーションとして比較検証したものです。

📝 **Zenn記事**: [React Router v7 / TanStack Router × File-Based / Code-Based 4パターン実装比較](https://zenn.dev/ikuraikura/articles/2025-06-25-router)

### リポジトリの構成

```
router-learning/
├── packages/
│   ├── stack-react-router-cbr/    # React Router v7 + Code-Based Routing
│   ├── stack-react-router-fbr/    # React Router v7 + File-Based Routing
│   ├── stack-tanstack-router-cbr/ # TanStack Router + Code-Based Routing
│   └── stack-tanstack-router-fbr/ # TanStack Router + File-Based Routing
└── openapi.yaml                   # 共通APIスキーマ定義
```

各パッケージは同一のブログアプリケーションUIを実装しており、以下の機能を持っています：
- 📝 投稿一覧の表示
- 📖 投稿詳細の閲覧
- ✏️ 投稿の編集
- ➕ 新規投稿の作成

### 動作確認方法

```bash
# 依存関係のインストール
pnpm install

# コード生成（型定義など）
pnpm run generate

# モックAPIサーバーの起動
pnpm run mock

# 開発サーバーの起動（全パッケージ同時）
pnpm run dev
```

起動後、以下のURLで各実装にアクセスできます：
- http://localhost:5177 - React Router v7 Code-Based
- http://localhost:5178 - React Router v7 File-Based
- http://localhost:5179 - TanStack Router Code-Based
- http://localhost:5160 - TanStack Router File-Based

### 技術スタック

- **フレームワーク**: React 19
- **ビルドツール**: Vite
- **言語**: TypeScript（厳格な型チェック設定）
- **スタイリング**: Tailwind CSS v4
- **データフェッチ**: TanStack Query + openapi-typescript
- **モックサーバー**: Prism

---

## 📝 記事：4パターン実装比較の詳細

モダンなReactアプリケーションにおけるルーティングの選択は、プロジェクトの成功を左右する重要な決定の一つです。本記事では、React Router v7とTanStack Routerを、File-Based RoutingとCode-Based Routingの両観点から実装・比較した結果をご紹介します。

※ 本記事は、実際に4つの実装パターンを比較検証した結果をもとに、AIの支援を受けて作成されています。
※ 検証用リポジトリ: https://github.com/suguruTakahashi-1234/router-learning

## 🎯 エグゼクティブサマリー

### 検証結果から見えた傾向

型安全性と開発効率のバランスを考慮すると、多くのケースで**4️⃣ TanStack Router + File-Based Routing**の組み合わせが優れた選択肢となることがわかりました。ただし、プロジェクトの特性やチームの状況によっては、他の選択肢がより適している場合もあります。

### 4つの実装アプローチ

| 組み合わせ     | フレームワーク  | ルーティング方式   | 適している用途                    |
| -------------- | --------------- | ------------------ | --------------------------------- |
| **1️⃣ Option 1** | React Router v7 | Code-Based Routing | 小規模プロジェクト、学習用途      |
| **2️⃣ Option 2** | React Router v7 | File-Based Routing | 中規模プロジェクト、Remix移行予定 |
| **3️⃣ Option 3** | TanStack Router | Code-Based Routing | 既存プロジェクトへの段階的導入    |
| **4️⃣ Option 4** | TanStack Router | File-Based Routing | 新規プロジェクト、大規模開発      |

## 📚 基礎概念：ルーティング方式の理解

### File-Based Routing vs Code-Based Routing

#### 🗂️ File-Based Routing（ファイルベースルーティング）
ファイルシステムの構造からルートを自動生成する方式です。

**メリット：**
- ✅ ファイル作成だけでルート追加が可能
- ✅ ディレクトリ構造でルート構成が視覚的に把握できる
- ✅ 自動的なコード分割により、パフォーマンスが向上
- ✅ リファクタリング時の作業が簡略化される

**デメリット：**
- ❌ 複雑な条件付きルートの実装に制約がある
- ❌ 初期設定にやや手間がかかる
- ❌ フレームワーク固有の命名規則を学ぶ必要がある

#### 💻 Code-Based Routing（コードベースルーティング）
JavaScriptコードで明示的にルートを定義する従来型の方式です。

**メリット：**
- ✅ 完全な制御と高い柔軟性
- ✅ 条件付きルートの実装が容易
- ✅ 既存プロジェクトへの導入ハードルが低い
- ✅ 動的なルート生成に対応しやすい

**デメリット：**
- ❌ ボイラープレートコードが増えやすい
- ❌ ルート構造の全体像が把握しづらい
- ❌ コード分割を手動で設定する必要がある
- ❌ リファクタリング時の手間が大きい

### ディレクトリ構造の比較

#### File-Based Routing の構造例

**React Router（フラット構造）:**
```
src/routes/
├── _index.tsx              # / (ホーム)
├── posts.$id.tsx           # /posts/:id
├── posts.$id_.edit.tsx     # /posts/:id/edit
└── posts.new.tsx           # /posts/new
```

**TanStack Router（ネスト構造）:**
```
src/routes/
├── __root.tsx              # ルートレイアウト
├── index.tsx               # / (ホーム)
└── posts/
    ├── $postId/
    │   ├── index.tsx       # /posts/:postId
    │   └── edit.tsx        # /posts/:postId/edit
    └── new.tsx             # /posts/new
```

#### Code-Based Routing の構造例

両フレームワーク共通:
```
src/
├── App.tsx / router.tsx    # ルート定義
├── pages/                  # ページコンポーネント
├── layouts/                # レイアウト
└── components/             # 共通コンポーネント
```

## 🔄 フレームワーク比較：React Router vs TanStack Router

### 🔒 型安全性における違い

実装を通じて、両フレームワークの型安全性には明確な違いがあることがわかりました。

#### React Router の特徴
```typescript
// 手動での型定義が必要
const { id } = useParams<{ id: string }>();

// idがundefinedの可能性を考慮する必要
if (!id) return <div>ID not found</div>;

// タイポはコンパイル時に検出されない
navigate("/posts/123/editt"); // 実行時エラーのリスク
```

#### TanStack Router の特徴
```typescript
// 自動的な型推論が働く
const { postId } = postDetailRoute.useParams();
// postIdの存在が型レベルで保証される

// 型安全なナビゲーション
navigate({ 
  to: "/posts/$postId/edit", 
  params: { postId: "123" }  // 型チェックが効く
});

// リンクも型安全
<Link
  to="/posts/$postId/edit"
  params={{ postId }}  // 必須パラメータの漏れを防げる
>
  編集
</Link>
```

### 📊 フレームワーク特性比較

実装経験を踏まえた各フレームワークの特性評価です：

| カテゴリ           | React Router v7 | TanStack Router |
| ------------------ | --------------- | --------------- |
| **型安全性**       | ⭐⭐ 基本的       | ⭐⭐⭐⭐⭐ 充実      |
| **エコシステム**   | ⭐⭐⭐⭐⭐ 成熟      | ⭐⭐⭐ 成長中      |
| **学習曲線**       | ⭐⭐⭐⭐ 緩やか     | ⭐⭐⭐ やや急      |
| **パフォーマンス** | ⭐⭐⭐⭐ 良好       | ⭐⭐⭐⭐⭐ 優秀      |
| **開発体験**       | ⭐⭐⭐ 標準的      | ⭐⭐⭐⭐⭐ 快適      |

### 公式推奨設定

各フレームワークの公式ドキュメントで推奨されている設定は以下の通りです：

#### React Router v7
- **デフォルト推奨**: File-Based Routing（v7からの新機能）
- **必要パッケージ（File-Based）**: `@react-router/dev`, `@react-router/fs-routes`
- **必要パッケージ（Code-Based）**: `react-router-dom`のみ
- **特徴**: Remix互換のフラット構造を採用

#### TanStack Router
- **デフォルト推奨**: Code-Based Routing（型安全性を重視）
- **必要パッケージ（File-Based）**: `@tanstack/router-plugin`
- **必要パッケージ（Code-Based）**: `@tanstack/react-router`のみ
- **特徴**: TypeScript第一主義の設計思想

## 🎨 4つの組み合わせの詳細比較

### 実装を通じた評価マトリックス

実際に4つのパターンを実装してみた結果、以下のような評価となりました：

|                | 1️⃣ React Router Code-Based | 2️⃣ React Router File-Based | 3️⃣ TanStack Router Code-Based | 4️⃣ TanStack Router File-Based |
| -------------- | :-----------------------: | :-----------------------: | :--------------------------: | :--------------------------: |
| **型安全性**   |            ⭐⭐             |            ⭐⭐             |            ⭐⭐⭐⭐⭐             |            ⭐⭐⭐⭐⭐             |
| **開発速度**   |            ⭐⭐⭐            |           ⭐⭐⭐⭐            |             ⭐⭐⭐⭐             |            ⭐⭐⭐⭐⭐             |
| **保守性**     |            ⭐⭐             |           ⭐⭐⭐⭐            |             ⭐⭐⭐              |            ⭐⭐⭐⭐⭐             |
| **学習コスト** |           ⭐⭐⭐⭐            |           ⭐⭐⭐⭐            |             ⭐⭐⭐              |             ⭐⭐⭐              |
| **柔軟性**     |           ⭐⭐⭐⭐⭐           |            ⭐⭐⭐            |            ⭐⭐⭐⭐⭐             |             ⭐⭐⭐              |
| **総合評価**   |            ⭐⭐⭐            |           ⭐⭐⭐⭐            |             ⭐⭐⭐⭐             |            ⭐⭐⭐⭐⭐             |

### 各組み合わせの特徴と適用場面

#### 1️⃣ React Router + Code-Based Routing
- **特に適している場面**: 小規模プロジェクト、プロトタイプ開発
- **主な利点**: 最もシンプルで学習コストが低い
- **考慮点**: 型安全性は開発者が意識して確保する必要がある

#### 2️⃣ React Router + File-Based Routing
- **特に適している場面**: 中規模プロジェクト、将来的なRemix移行を検討中
- **主な利点**: v7の新機能で今後の発展が期待できる
- **考慮点**: まだ発展途上の部分もある

#### 3️⃣ TanStack Router + Code-Based Routing
- **特に適している場面**: 既存プロジェクトへの段階的な導入
- **主な利点**: 既存の構造を大きく変えずに型安全性を向上できる
- **考慮点**: ルート定義が冗長になる傾向がある

#### 4️⃣ TanStack Router + File-Based Routing
- **特に適している場面**: 新規の中〜大規模プロジェクト
- **主な利点**: 型安全性と生産性の良好なバランス
- **考慮点**: 初期の学習に時間がかかる場合がある

## 🗺️ 選択ガイド

### プロジェクト規模による推奨

実装経験を踏まえた推奨パターンです：

| 規模                     | 推奨パターン                   | 理由                           |
| ------------------------ | ------------------------------ | ------------------------------ |
| **小規模**（〜10画面）   | 1️⃣ React Router + Code-Based    | シンプルさと柔軟性を優先できる |
| **中規模**（10〜50画面） | 4️⃣ TanStack Router + File-Based | バランスの取れた選択           |
| **大規模**（50画面〜）   | 4️⃣ TanStack Router + File-Based | 保守性とスケーラビリティを重視 |

### チーム構成による推奨

チームの特性に応じた選択の目安：

| チーム特性                 | 推奨パターン                   | 理由                     |
| -------------------------- | ------------------------------ | ------------------------ |
| **TypeScript初心者が多い** | 1️⃣ React Router + Code-Based    | 学習曲線が緩やか         |
| **TypeScript熟練者が多い** | 4️⃣ TanStack Router + File-Based | 型の恩恵を最大限活用可能 |
| **フルスタックチーム**     | 4️⃣ TanStack Router + File-Based | 品質と生産性を両立できる |

### 技術要件による推奨

プロジェクトの技術的な要件に基づく選択：

| 要件                         | 推奨パターン                   | 理由                 |
| ---------------------------- | ------------------------------ | -------------------- |
| **Remix互換性が必要**        | 2️⃣ React Router + File-Based    | 完全な互換性を確保   |
| **最高レベルの型安全性**     | 4️⃣ TanStack Router + File-Based | TypeScript第一の設計 |
| **既存プロジェクトへの追加** | 1️⃣/3️⃣ 任意 + Code-Based          | 移行コストを最小化   |
| **SSR/SEOが重要**            | 2️⃣ React Router + File-Based    | 実績のあるSSR対応    |

## 📖 まとめと次のステップ

### 検証結果のまとめ

実際に4つのパターンを実装してみた結果、**新規プロジェクトの場合は 4️⃣ TanStack Router + File-Based Routing の組み合わせを検討することをおすすめします。**

この組み合わせが優れている理由：
1. 🔒 **高い型安全性** - ランタイムエラーのリスクを大幅に削減
2. 🚀 **快適な開発体験** - 優れた自動補完とリファクタリング支援
3. 📐 **規約による効率化** - ボイラープレートコードの削減
4. 🌟 **モダンな設計** - 将来を見据えた設計思想

ただし、既存のReactエコシステムとの互換性や学習コストを重視する場合は、1️⃣/2️⃣ React Router v7も依然として有力な選択肢です。特にv7で追加された 2️⃣ File-Based Routingは、今後の発展が期待できる機能です。

### 📚 公式ドキュメント

詳細な実装方法については、各フレームワークの公式ドキュメントをご参照ください：

**React Router v7**
- [公式サイト](https://reactrouter.com/)
- [File-Based Routing](https://reactrouter.com/how-to/file-route-conventions)
- [Code-Based Routing](https://reactrouter.com/start/framework/routing)

**TanStack Router**
- [公式サイト](https://tanstack.com/router/latest)
- [File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Code-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/code-based-routing)

### 🚀 始め方

選択したアプローチに応じて、対応する公式ドキュメントのクイックスタートガイドを参照することをおすすめします。どちらのフレームワークも充実したドキュメントとサンプルコードを提供しています。

最終的には、プロジェクトの要件、チームのスキルセット、将来の拡張性を総合的に考慮して、最適な組み合わせを選択することが重要です。本記事が、皆さまのルーティング選択の参考になれば幸いです。