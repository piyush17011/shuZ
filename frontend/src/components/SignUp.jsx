import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post('https://sshoplify.onrender.com/api/users/register', user);
      if (response.data.message === "Exists") {
        alert("Already Exists");
        setUser({ username: "", email: "", password: "" });
      } else {
        setUser({ username: "", email: "", password: "" });
        alert("Account Created");
        navigate("/login");
      }
    } catch (err) {
      if (!err?.response) { alert('No Server Response'); }
      else { alert('Registration Failed'); }
    }
  };

  return (
    <div className="sign-up">
      <div className="auth-card">
        <p className="auth-page-label">new here</p>
        <h1 className="signup-text">create account</h1>
        <p className="auth-sub">sign up to start shopping</p>

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
          <button type="submit" className="signup-button">register</button>
        </form>

        <p className="bottom-login-text">
          already have an account?{' '}
          <a onClick={() => navigate('/login')}>log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
