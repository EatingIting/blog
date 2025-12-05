import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  const post = savedPosts.find((p) => p.id === id);

  if (!post) return <p>글을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1 className="post-detail-title">{post.title}</h1>
      <div className="post-detail-date">
        {new Date(post.createdAt || Date.now()).toLocaleDateString()}
      </div>

      <div className="post-detail-content">{post.content}</div>
    </div>
  );
}

export default PostDetail;
