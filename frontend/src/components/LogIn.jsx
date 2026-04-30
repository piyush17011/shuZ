import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function LogIn() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });

  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post('https://sshoplify.onrender.com/api/users/login', user);
      const loginPayload = response.data?.data?.user ?? response.data?.user ?? response.data?.data ?? response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: loginPayload });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <p className="auth-page-label">welcome back</p>
        <h1 className="login-text">sign in</h1>
        <p className="auth-sub">enter your credentials to continue</p>

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
          <button type="submit" className="login-button">sign in</button>
        </form>

        <p className="bottom-login-text">
          no account?{' '}
          <a onClick={() => navigate('/signup')}>create one</a>
        </p>
        <p className="bottom-login-text">
          <a onClick={() => navigate('/')}>go to home page</a>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
