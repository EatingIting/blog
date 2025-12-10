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
      <div className="post-detail-container">
        
        {/* ▼▼▼ [수정] 클래스 이름 부분 변경 ▼▼▼ */}
        {/* 버튼이 없으면(작성자가 아니면) 'only-text' 클래스를 추가합니다 */}
        <div className={`post-header-action-group ${!isAuthor ? 'only-text' : ''}`}>
          
          <span className="header-info-text">
            {post.authorName} · {post.createdAt?.toDate().toLocaleString()}
          </span>

          {isAuthor && (
            <div className="header-btn-box">
              <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>
                수정하기
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                삭제하기
              </button>
            </div>
          )}
        </div>
        {/* ▲▲▲ 수정 끝 ▲▲▲ */}

        <div className="post-detail-header">
          <h2 className="post-detail-title">{post.title}</h2>
        </div>

        <div className="post-detail-content">
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;