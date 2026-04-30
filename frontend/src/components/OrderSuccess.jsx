import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <NavBar />
      <div className="order-success-container">
        <div className="order-success-card">
          <div className="order-success-icon">✓</div>
          <p className="order-success-label">order confirmed</p>
          <h2>you're all set.</h2>
          <p className="order-success-subtitle">
            we've emailed you the receipt and delivery details.
          </p>

          {orderId && (
            <div className="order-success-meta">
              <p><strong>order id</strong> {orderId}</p>
              <p><strong>total</strong> ₹{amount}</p>
            </div>
          )}

          <p className="order-success-hint">
            track your purchase from the orders page or continue browsing for more styles.
          </p>

          <div className="order-success-actions">
            <button onClick={() => navigate("/orders")}>view orders</button>
            <button onClick={() => navigate("/")} className="secondary">continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
