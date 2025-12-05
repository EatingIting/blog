import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = async () => {
    if (!nickname.trim() || !username.trim()) {
      alert("닉네임과 아이디를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Firebase Authentication: Email + Password로 계정 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 닉네임을 Firebase 계정에 저장
      await updateProfile(userCredential.user, {
        displayName: nickname,
      });

      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />
      <br />

      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />
      <br />

      <input
        type="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />
      <br />

      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />
      <br />

      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "250px" }}
      />
      <br />

      <button
        onClick={handleSignup}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4a4aff",
          color: "#fff",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        회원가입
      </button>
    </div>
  );
}

export default Signup;
