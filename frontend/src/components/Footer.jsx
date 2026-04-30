import React from 'react';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div style={{ textAlign: 'center' }}>
        <h5>ShüZ</h5>
        <p>
          your go-to store for the latest trends in shoes for men, women, and kids.
          crafted for every stride — bold, light, and built to last.
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <span
            onClick={() => navigate('/about')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            about
          </span>
          <span
            onClick={() => navigate('/allproducts')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            products
          </span>
          <span
            onClick={() => navigate('/orders')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            orders
          </span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} ShüZ. all rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
