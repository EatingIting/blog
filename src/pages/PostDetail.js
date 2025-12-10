// src/pages/PostDetail.js
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/db";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "posts", id));
      if (!snap.exists()) {
        alert("게시글이 존재하지 않습니다.");
        navigate("/posts");
        return;
      }
      setPost({ id: snap.id, ...snap.data() });
    };
    fetch();
  }, [id, navigate]);

  if (!post) return <div className="main-container">불러오는 중...</div>;

  const isAuthor = user?.uid === post.authorId;

  const handleDelete = async () => {
    if (!isAuthor) {
      alert("본인만 삭제 가능합니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    await deleteDoc(doc(db, "posts", id));
    alert("삭제되었습니다.");
    navigate("/posts");
  };

  return (
    <div className="main-container">
      {/* 제목 + 수정/삭제 버튼 한 줄 정렬 */}
      <div style={headerRow}>
        <h2 style={titleStyle}>{post.title}</h2>

        {isAuthor && (
          <div style={buttonRow}>
            <button
              style={editBtn}
              onClick={() => navigate(`/edit/${id}`)}
            >
              수정하기
            </button>

            <button style={deleteBtn} onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        )}
      </div>

      {/* 작성 정보 */}
      <p style={{ color: "#666" }}>
        {post.authorName} · {post.createdAt?.toDate().toLocaleString()}
      </p>

      {/* 본문 */}
      <div style={{ marginTop: "40px", fontSize: "18px" }}>
        {post.content}
      </div>
    </div>
  );
}

export default PostDetail;

/* ---------------------------------------
   스타일 (컴포넌트 내부에만 적용되는 인라인 스타일)
----------------------------------------- */
const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "80%",
  maxWidth: "900px",
  margin: "0 auto 20px",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  margin: 0,
};

const buttonRow = {
  display: "flex",
  gap: "10px",
};

const sharedBtn = {
  padding: "10px 22px",
  minWidth: "90px",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
};

const editBtn = {
  ...sharedBtn,
  backgroundColor: "#12b886",
};

const deleteBtn = {
  ...sharedBtn,
  backgroundColor: "#fa5252",
};
