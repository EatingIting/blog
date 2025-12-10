import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/db";
import useAuth from "../hooks/useAuth";
import { uploadImage } from "../firebase/storage";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

function Write() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: "",
  });

  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);

    editor.chain().focus().setImage({ src: url }).run();
  };

  const savePost = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    await addDoc(collection(db, "posts"), {
      title,
      content: editor.getJSON(),
      authorId: user.uid,
      authorName: user.displayName,
      createdAt: serverTimestamp(),
    });

    alert("저장되었습니다!");
    navigate("/posts");
  };

  return (
    <div className="main-container" style={{ width: "800px", margin: "0 auto" }}>
      <h2>글쓰기</h2>

      {/* 제목 입력 */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      />

      {/* 이미지 업로드 버튼 */}
      <input type="file" accept="image/*" onChange={addImage} />

      {/* TipTap 에디터 */}
      <div style={{ border: "1px solid #ddd", marginTop: "10px", padding: "10px" }}>
        <EditorContent editor={editor} />
      </div>

      <button
        onClick={savePost}
        style={{
          marginTop: 20,
          background: "#12b886",
          padding: "12px 24px",
          border: "none",
          color: "white",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        저장하기
      </button>
    </div>
  );
}

export default Write;
