import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { PostCreatePage } from "./pages/PostCreatePage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostEditPage } from "./pages/PostEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts/new" element={<PostCreatePage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="posts/:id/edit" element={<PostEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
