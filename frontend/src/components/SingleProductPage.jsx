import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth/AuthContext';
import NavBar from './NavBar';
import '../styles/SingleProductPage.css';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?._id ?? user?.id ?? user?.userId ?? user?.data?._id ?? user?.user?._id;

  const handleAddToCart = async (productToAdd) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    try {
      await axios.post("https://sshoplify.onrender.com/api/cart/add", {
        userId,
        productId: productToAdd._id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (error) {
      alert("Failed to add to cart.");
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `https://sshoplify.onrender.com/api/products/get/single/${id}`
      );
      setProduct(response.data);
    };
    fetchdata();
  }, [id]);

  return (
    <div className="single-product-page">
      <NavBar />
      <div className="single-product-container">
        <img
          className="product-image"
          src={product.imageURL}
          alt={product.title}
        />
        <div className="product-details">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.details}</p>
          <p className="product-price">₹{product.price}</p>
          <Button
            className="button-primary"
            onClick={() => handleAddToCart(product)}
          >
            add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
