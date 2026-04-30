import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/About.css';
import NavBar from './NavBar';

const About = () => {
  const [stats, setStats] = useState({
    happyCustomers: '+12k',
    stylesAvailable: '+500',
    pairsShipped: '+80k',
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
            stylesAvailable: data.stylesAvailable || '+500',
            pairsShipped: data.pairsShipped || '+80k',
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
    <div className="about-page">
      <NavBar />
      <div className="about-container">
        <p className="about-label">our story</p>
        <h1 className="about-heading">about<br/>ShüZ.</h1>

        <p className="about-content">
          ShüZ is your go-to online store for the latest trends in shoes for men, women, and kids.
          We offer a wide range of shoes to suit all styles and preferences — from bold trainers to
          elegant formals, casual flats to rugged boots.
        </p>

        <div className="about-divider" />

        <div className="about-stat-grid">
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.happyCustomers}</p>
            <p className="about-stat-label">happy customers</p>
          </div>
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.stylesAvailable}</p>
            <p className="about-stat-label">styles available</p>
          </div>
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.pairsShipped}</p>
            <p className="about-stat-label">pairs shipped</p>
          </div>
        </div>

        <div className="about-divider" />

        <h2 className="about-heading" style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', marginBottom: '1rem' }}>the builder</h2>
        <p className="about-content">
          Built with care by a developer who believes great products deserve great design.
          Find the project on GitHub and reach out with ideas, feedback, or just to say hi.
        </p>
      </div>
    </div>
  );
};

export default About;
