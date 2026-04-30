import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "../styles/FetchedCards.css";

const FetchedTSCards = ({ category }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://sshoplify.onrender.com/api/products/get/${category}`
        );
        setProducts(response.data);
      } catch (error) {}
    };
    fetchdata();
  }, [category]);

  return (
    <div className="ts-cards-container">
      {products.map((product) => (
        <Card
          className="ts-card"
          key={product._id}
          onClick={() => navigate(`/single/${product._id}`)}
        >
          <img className="ts-card-img" src={product.imageURL} alt={product.title} />
          <Card.Body>
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
      ))}
    </div>
  );
};

export default FetchedTSCards;
