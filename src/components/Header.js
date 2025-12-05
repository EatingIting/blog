import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="logo">
          MyBlog
        </Link>

        <nav className="nav-menu">
          <Link to="/posts">Posts</Link>
          <Link to="/write">Write</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
