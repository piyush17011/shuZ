import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location.state]);

  function handleInput(e) {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      dispatch({ type: "LOGIN_START" });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        user
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message });

      if (!err?.response) {
        setError("Cannot connect to server. Please try again.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response.status === 400) {
        setError(err.response.data?.message || "Please fill in all fields.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <p className="auth-page-label">welcome back</p>
        <h1 className="login-text">log in</h1>
        <p className="auth-sub">sign in to your account</p>

        {success && <div className="auth-success">{success}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "logging in..." : "log in"}
          </button>
        </form>

        <p className="bottom-login-text">
          don't have an account?{' '}
          <Link to="/signup">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;