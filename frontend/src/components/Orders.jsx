import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import '../styles/Order.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?._id ?? user?.id ?? user?.userId ?? user?.data?._id ?? user?.user?._id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userId) return;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/userorder/${userId}`
        );
        setOrders(response.data);
      } catch (error) {}
    };
    fetchOrders();
  }, [userId]);

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <NavBar />
      <div className="orders-container">
        <h2>your orders</h2>
        <div>
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>order id: {order._id}</h3>
              <p>amount: ₹{order.amount}</p>
              <p>date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>user: {order.userId[0].username} ({order.userId[0].email})</p>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    {item.product.title} — qty: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          className="bottom-login-text"
          style={{ marginTop: '2rem', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          go to home page
        </p>
      </div>
    </div>
  );
};

export default Orders;
