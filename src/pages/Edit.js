import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (loading) return; // 로딩 중에는 아무것도 안 함
    if (!user) return;    // 로그인 안 됐으면 패스

    const fetch = async () => {
      const snap = await getDoc(doc(db, "posts", id));

      if (!snap.exists()) {
        alert("게시글이 존재하지 않습니다.");
        navigate("/posts");
        return;
      }

      const data = snap.data();

      if (data.authorId !== user.uid) {
        alert("본인의 글만 수정할 수 있습니다.");
        navigate(`/posts/${id}`);
        return;
      }

      setTitle(data.title);
      setContent(data.content);
    };

    fetch();
  }, [id, user, loading, navigate]);

  const handleUpdate = async () => {
    await updateDoc(doc(db, "posts", id), {
      title,
      content,
    });

    alert("수정되었습니다!");
    navigate(`/posts/${id}`);
  };

  if (loading) return <div className="main-container">Loading...</div>;

  return (
    <div className="main-container">
      <h2>게시글 수정</h2>

      <input
        style={{ width: "80%", padding: 10, marginBottom: 12 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{ width: "80%", height: 300, padding: 10 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        style={{
          padding: "10px 20px",
          background: "#12b886",
          color: "white",
          borderRadius: 6,
          border: "none",
          marginTop: 20,
        }}
        onClick={handleUpdate}
      >
        수정 완료
      </button>
    </div>
  );
}

export default Edit;
