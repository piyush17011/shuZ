import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NavBar from "./NavBar";
import "../styles/Category.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/get/${category}`
        );
        setProducts(data);
      } catch (error) {}
    };
    fetchData();
  }, [category]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cat-page">
      <NavBar />

      <div className="cat-page-header">
        <p className="cat-page-label">category</p>
        <h2 className="cat-page-heading">{category}</h2>

        <div className="search-bar-container" style={{ padding: '0 0 1.5rem' }}>
          <input
            type="text"
            placeholder={`search ${category}'s shoes…`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      <div className="cat-container">
        {filteredProducts.map((product) => (
          <Card className="cat-card" key={product._id}>
            <img
              className="cat-img"
              src={product.imageURL}
              alt={product.title}
              onClick={() => navigate(`/single/${product._id}`)}
            />
            <Card.Body className="cat-body">
              <h3 className="cat-title">{product.title}</h3>
              <p className="cat-details">{product.details}</p>
              <p className="cat-category">{product.category}</p>
              <Button
                className="cat-price-btn"
                onClick={() => navigate(`/single/${product._id}`)}
              >
                ₹{product.price}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;
