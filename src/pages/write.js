import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    savedPosts.unshift(newPost);

    localStorage.setItem("posts", JSON.stringify(savedPosts));

    navigate(`/posts/${newPost.id}`);
  };

  return (
    <div>
      <h2>글쓰기</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            marginBottom: "15px"
          }}
        />

        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: "300px",
            padding: "10px",
            fontSize: "16px",
            lineHeight: "1.6"
          }}
        />

        <button 
          onClick={handleSave}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            background: "#4a4aff",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default Write;