import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/db";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const q = query(
        collection(db, "posts"),
        where("authorId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetch();
  }, [user]);

  if (!user) return <div className="main-container">로그인이 필요합니다.</div>;

  return (
    <div className="main-container">
      <h2>{user.displayName}님의 글</h2>

      {posts.length === 0 && <p>작성한 글이 없습니다.</p>}

      {posts.map(post => (
        <div key={post.id} style={{ borderBottom: "1px solid #ddd", padding: "16px 0" }}>
          <Link to={`/posts/${post.id}`} style={{ fontSize: 20, fontWeight: "bold", textDecoration: "none" }}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
