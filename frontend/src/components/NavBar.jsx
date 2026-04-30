import React, { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth/AuthContext';
import { RiAdminLine, RiShoppingCartLine } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const userId = user?._id ?? user?.id ?? user?.userId ?? user?.data?._id ?? user?.user?._id;
  const displayName = user?.username ?? user?.name ?? user?.data?.username ?? user?.data?.name ?? user?.user?.username ?? user?.user?.name ?? user?.email?.split('@')[0] ?? user?.data?.email?.split('@')[0] ?? 'User';
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!userId) { setCartCount(0); return; }
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`);
        const data = await res.json();
        setCartCount(data?.items?.length || 0);
      } catch (err) {}
    };
    fetchCart();
  }, [userId]);

  const handleLoginClick  = () => navigate('/login');
  const handleLogoutClick = () => { dispatch({ type: "LOGOUT" }); navigate('/login'); };

  return (
    <nav className="main-nav">
      {/* ── LEFT PILL: logo ── */}
      <div className="nav-left-pill">
        <svg className="nav-shoe-icon" viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="29" rx="17" ry="5.5" fill="#fff" opacity="0.9"/>
          <path d="M6 29 Q4 19 10 12 Q16 6 24 8 Q32 10 34 19 L34 29 Z" fill="#fff"/>
          <path d="M10 17 Q14 14 20 15 Q26 16 30 21"
                stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        <Link to="/" className="nav-logo-text">ShüZ</Link>
      </div>

      {/* ── CENTER PILL: nav links ── */}
      <div className="nav-center-pill">
        <Link to="/"           className="nav-text">home</Link>
        <Link to="/men"        className="nav-text">men</Link>
        <Link to="/women"      className="nav-text">women</Link>
        <Link to="/kids"       className="nav-text">kids</Link>
        <Link to="/allproducts" className="nav-text">all products</Link>
        <Link to="/about"      className="nav-text">about</Link>
      </div>

      {/* ── RIGHT: icons + auth ── */}
      <div className="nav-right-pill">

        {/* orders */}
        <Link to={user ? "/orders" : "/login"} className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
          <GoInbox className="cart-icon" />
        </Link>

        {/* cart */}
        <Link to={user ? "/cart" : "/login"} className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
          <RiShoppingCartLine className="cart-icon" />
          {cartCount > 0 && (
            <Badge className="cart-badge" bg="light" text="dark">{cartCount}</Badge>
          )}
        </Link>

        {/* admin */}
        {user?.email === "admin@admin.com" && (
          <Link to="/admin" className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
            <RiAdminLine className="cart-icon" />
          </Link>
        )}

        {/* user / auth */}
        {user ? (
          <>
            <span className="nav-user-name">{displayName}</span>
            <Button className="nav-login-button" onClick={handleLogoutClick}>logout</Button>
          </>
        ) : (
          <Button className="nav-login-button" onClick={handleLoginClick}>log in</Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
