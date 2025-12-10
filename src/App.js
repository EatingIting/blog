import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Write from "./pages/Write.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPosts from "./pages/MyPosts.js";
import Edit from "./pages/Edit.js";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/MyPosts" element={<MyPosts />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
