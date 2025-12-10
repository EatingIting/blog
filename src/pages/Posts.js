import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/db";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetch();
  }, []);

  return (
    <div className="main-container">
      <h2>전체 글</h2>

      {posts.map(post => (
        <div key={post.id} style={postBox}>
          <Link to={`/posts/${post.id}`} style={titleStyle}>
            {post.title}
          </Link>
          <p>{post.authorName} · {post.createdAt?.toDate().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

const postBox = {
  borderBottom: "1px solid #ddd",
  padding: "16px 0",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#333",
};

export default Posts;
