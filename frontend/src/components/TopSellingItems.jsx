import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "../styles/FetchedCards.css";

const TopSellingItems = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/get/ts`
        );
        setProducts(response.data);
      } catch (error) {}
    };
    fetchdata();
  }, []);

  return (
    <div className="ts-cards-container">
      {products.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', padding: '2rem' }}>
          no top selling products yet — mark products as "top selling" from the admin panel.
        </p>
      ) : (
        products.map((product) => (
          <Card
            className="ts-card"
            key={product._id}
            onClick={() => navigate(`/single/${product._id}`)}
          >
            <img className="ts-card-img" src={product.imageURL} alt={product.title} />
            <Card.Body>
              <p className="ts-card-category">{product.category}</p>
              <h5 className="ts-card-title">{product.title}</h5>
              <p className="ts-card-price">₹{product.price}</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/single/${product._id}`);
                }}
              >
                view product
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TopSellingItems;