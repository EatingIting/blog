import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <div className="main-container" style={{ textAlign: "center" }}>
      <h2>로그인</h2>

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

      <button style={buttonStyle} onClick={handleLogin}>
        로그인
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

export default Login;
