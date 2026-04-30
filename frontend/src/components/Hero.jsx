import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import ShoeModel3D from './ShoeModel3D';
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    happyCustomers: '+12k',
    pairsShipped: '+80k',
    stylesAvailable: '+500',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats from:', `${API_BASE_URL}/api/stats`);
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Stats fetched successfully:', data);
          setStats({
            happyCustomers: data.happyCustomers || '+12k',
            pairsShipped: data.pairsShipped || '+80k',
            stylesAvailable: data.stylesAvailable || '+500',
          });
        } else {
          console.warn('Stats API returned non-ok status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="hero-section">

      {/* ── BACKGROUND VIDEO ── */}
      {/* <video
        className="hero-video"
        autoPlay loop muted playsInline
        src="https://videos.pexels.com/video-files/5077817/5077817-uhd_2560_1440_25fps.mp4"
      /> */}

      {/* ── BOTTOM GRADIENT ── */}
      <div className="hero-bottom-grad" />

      {/* ── STAGGERED HEADLINE WORDS ── */}
      <h1 className="hero-word hero-word-walk">walk</h1>
      <h1 className="hero-word hero-word-your">your</h1>
      <h1 className="hero-word hero-word-story">story</h1>

      {/* ── 3D SHOE MODEL SLOT ──
           The 3D model is absolutely centered between the three words.
      ── */}
      <div className="hero-model-slot">
        <ShoeModel3D />
      </div>

      {/* ── DESCRIPTION ── */}
      <p className="hero-desc">
        footwear crafted for every stride — bold, light, and built to last.
      </p>

      {/* ── STAT: top-right ── */}
      <div className="hero-stat hero-stat-tr">
        <div className="hero-stat-row right">
          <div className="hero-stat-divider up" />
          <span className="hero-stat-num">{stats.happyCustomers}</span>
        </div>
        <p className="hero-stat-label right">happy customers</p>
      </div>

      {/* ── STAT: bottom-left ── */}
      <div className="hero-stat hero-stat-bl">
        <div className="hero-stat-row">
          <span className="hero-stat-num">{stats.pairsShipped}</span>
          <div className="hero-stat-divider down" />
        </div>
        <p className="hero-stat-label">pairs shipped</p>
      </div>

      {/* ── STAT: bottom-right ── */}
      <div className="hero-stat hero-stat-br">
        <div className="hero-stat-row right">
          <div className="hero-stat-divider down" />
          <span className="hero-stat-num">{stats.stylesAvailable}</span>
        </div>
        <p className="hero-stat-label right">styles available</p>
      </div>

      {/* ── EXPLORE BUTTON ── */}
      <button
        className="hero-explore-btn"
        onClick={() => navigate('/allproducts')}
      >
        SHOP NOW
      </button>

    </section>
  );
};

export default Hero;
