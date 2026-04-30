import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Cart.css';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = user?._id ?? user?.id ?? user?.userId ?? user?.data?._id ?? user?.user?._id;
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId, fetchCart]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/update`, { userId, productId, quantity });
      fetchCart();
    } catch (err) {}
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/remove`, { data: { userId, productId } });
      fetchCart();
    } catch (err) {}
  };

  const handleBuyNow = async () => {
    if (!cart || !cart.items.length) return;
    try {
      const orderItems = cart.items.map((item) => ({
        product: item.productId._id,
        quantity: Number(item.quantity),
      }));
      const amount = orderItems.reduce((sum, item) => {
        const product = cart.items.find((p) => p.productId._id === item.product);
        return sum + product.productId.price * item.quantity;
      }, 0);
      if (!userId) { alert("User not logged in"); return; }

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-order`, { amount });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "ShüZ",
        description: "Sneaker purchase",
        order_id: data.orderId,
        handler: async function () {
          try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/addorder`, { userId, orderItems, amount });
            try {
              await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/clear`, { data: { userId } });
            } catch (clearErr) {
              if (cart?.items?.length) {
                await Promise.all(
                  cart.items.map((item) =>
                    axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/remove`, { data: { userId, productId: item.productId._id } })
                  )
                );
              }
            }
            await fetchCart();
            alert("Payment successful! Order placed.");
            navigate("/order-success", { state: { orderId: res.data._id, amount } });
          } catch (err) {
            alert("Payment ok but order failed. Contact support.");
          }
        },
        prefill: { name: user?.username || user?.name || user?.data?.username || user?.data?.name || "", email: user?.email || user?.data?.email || "" },
        theme: { color: "#ffffff" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Failed to start payment. Check console for details.");
    }
  };

  if (loading) return (
    <div className="cart-page">
      <NavBar />
      <div className="cart-inner">
        <div className="state-center">loading your cart…</div>
      </div>
    </div>
  );

  if (!cart || cart.items.length === 0) return (
    <div className="cart-page">
      <NavBar />
      <div className="cart-inner">
        <div className="state-center">your cart is empty</div>
      </div>
    </div>
  );

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  );

  return (
    <div className="cart-page">
      <NavBar />
      <div className="cart-inner">
        <p className="cart-label">your selection</p>
        <h2 className="cart-heading">your cart</h2>
      </div>

      <div className="cart-wrapper">
        {cart.items.map((item) => (
          <Card className="cart-card" key={item._id}>
            <div className="cart-item-row">
              <div className="cart-item-left">
                <img src={item.productId.imageURL} className="cart-img" alt="" />
                <div className="cart-item-details">
                  <h5 className="cart-title">{item.productId.title}</h5>
                  <p className="cart-price">₹{item.productId.price}</p>
                </div>
              </div>
              <div className="cart-item-right">
                <Button className="quantity-btn" onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}>−</Button>
                <span style={{ color: '#fff', fontSize: '0.88rem', minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
                <Button className="quantity-btn" onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}>+</Button>
                <Button className="remove-btn" onClick={() => handleRemove(item.productId._id)}>remove</Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="total-card">
          <div className="cart-total-row">
            <h4>₹{totalPrice}</h4>
            <Button className="placeorder-button" onClick={handleBuyNow}>buy now</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
