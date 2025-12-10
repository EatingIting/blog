import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignup = async () => {
    if (password !== passwordCheck) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    try {
      // 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 닉네임 저장
      await updateProfile(user, { displayName: nickname });

      alert("회원가입 성공!");
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="main-container" style={{ textAlign: "center" }}>
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        style={inputStyle}
      />

      <button style={buttonStyle} onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
}

const inputStyle = {
  marginBottom: "12px",
  padding: "10px",
  width: "260px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#12b886",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Signup;
