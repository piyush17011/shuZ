import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInput(e) {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user.username.trim().length < 3) {
      return setError("Username must be at least 3 characters");
    }
    if (user.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, user);
      navigate("/login", { state: { message: "Account created! Please log in." } });
    } catch (err) {
      if (!err?.response) {
        setError("Cannot connect to server. Please try again.");
      } else {
        setError(err.response.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <div className="auth-card">
        <p className="auth-page-label">new here</p>
        <h1 className="signup-text">create account</h1>
        <p className="auth-sub">sign up to start shopping</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="username-field">
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="email-field">
            <input
              type="email"
              name="email"
              placeholder="email address"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="pass-field">
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "creating account..." : "register"}
          </button>
        </form>

        <p className="bottom-login-text">
          already have an account?{' '}
          <Link to="/login">log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;