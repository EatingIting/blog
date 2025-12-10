import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";
import useAuth from "../hooks/useAuth";

function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">MyBlog</Link>

        <nav className="nav">
          <Link to="/posts">Posts</Link>

          {user ? (
            <>
              <Link to="/write">Write</Link>
              <Link to="/myposts">My Posts</Link>
              <span>{user.displayName}님</span>
              <button className="logout-btn" onClick={() => signOut(auth)}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
