import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Cards from './Cards';
import TopSellingItems from './TopSellingItems';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <NavBar />
      <Hero />
      <Cards />

      {/* ── TOP SELLING SECTION ── */}
      <section className="ts-section">
        <div className="ts-header">
          <div>
            <p className="ts-label">most wanted</p>
            <h2 className="ts-heading">top selling</h2>
          </div>
          <button className="ts-view-all" onClick={() => navigate('/allproducts')}>
            view all →
          </button>
        </div>
        <TopSellingItems category="men" />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
