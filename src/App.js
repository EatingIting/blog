import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Write from "./pages/write";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
