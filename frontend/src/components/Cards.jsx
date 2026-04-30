import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/Cards.css';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const navigate = useNavigate();

  return (
    <section className="cards-section">
      <p className="cards-section-label">shop by category</p>
      <h2 className="cards-section-heading">categories</h2>

      <div className="home-cards-container">

        {/* MEN */}
        <Card className="home-card" onClick={() => navigate('/men')}>
          <img className="home-card-img" src="/images/men2.jpg" alt="Men" />
          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">men</Card.Title>
            <Card.Text className="home-card-text">
              Style, comfort, and durability — from sports to formal wear.
            </Card.Text>
            <Button onClick={() => navigate('/men')}>men's section</Button>
          </Card.Body>
        </Card>

        {/* WOMEN */}
        <Card className="home-card" onClick={() => navigate('/women')}>
          <img className="home-card-img" src="/images/women.png" alt="Women" />
          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">women</Card.Title>
            <Card.Text className="home-card-text">
              Versatility, comfort and chic style — from training to evening wear.
            </Card.Text>
            <Button onClick={() => navigate('/women')}>women's section</Button>
          </Card.Body>
        </Card>

        {/* KIDS */}
        <Card className="home-card" onClick={() => navigate('/kids')}>
          <img className="home-card-img" src="/images/kids.png" alt="Kids" />
          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">kids</Card.Title>
            <Card.Text className="home-card-text">
              Durable, comfy and vibrant — perfect for growing feet and active play.
            </Card.Text>
            <Button onClick={() => navigate('/kids')}>kids' section</Button>
          </Card.Body>
        </Card>

      </div>
    </section>
  );
};

export default Cards;
