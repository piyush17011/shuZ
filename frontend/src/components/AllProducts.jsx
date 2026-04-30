import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import '../styles/AllProducts.css';
import axios from 'axios';

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/get`);
        setProducts(data);
      } catch (error) {}
    };
    fetchdata();
  }, []);

  const filteredProducts = products.filter(product =>
    (product.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.details?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.category?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (product.price?.toString() || "").includes(searchTerm)
  );

  return (
    <div className="allp-page">
      <NavBar />

      <div className="allp-inner">
        <p className="allp-label">full collection</p>
        <h2 className="allp-heading">all products</h2>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="search shoes, styles, brands…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="allp-container">
        {filteredProducts.map((product) => (
          <Card className="card" key={product._id}>
            <img
              className="card-img"
              src={product.imageURL}
              alt={product.title}
              onClick={() => navigate(`/single/${product._id}`)}
            />
            <Card.Body className="card-body">
              <p className="category">{product.category}</p>
              <Card.Title className="card-title">{product.title}</Card.Title>
              <Card.Text className="card-text">{product.details}</Card.Text>
              <Button
                className="btn-primary-custom"
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

export default AllProducts;
