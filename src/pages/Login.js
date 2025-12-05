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
    <div style={{ textAlign: "center" }}>
      <h2>로그인</h2>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />

      <br />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "250px" }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4a4aff",
          color: "#fff",
          borderRadius: "6px",
          border: "none",
        }}
      >
        로그인
      </button>
    </div>
  );
}

export default Login;
