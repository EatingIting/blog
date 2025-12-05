import { Link } from "react-router-dom";

function Posts() {
  const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  return (
    <div>
      <Link to="/write" className="btn-write">글쓰기</Link>

      <ul className="post-list">
        {savedPosts.map((post) => (
          <li className="post-item" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>{post.content.slice(0, 70)}...</p>
            <div className="post-date">
              {new Date(post.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
