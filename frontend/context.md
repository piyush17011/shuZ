# Project context: frontend
Generated: 2026-04-30 · 43 files · stripped: comments, blank_lines, console_logs

---

## Project structure

```
frontend/
├── package.json
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── auth/
    │   └── AuthContext.js
    ├── components/
    │   ├── About.jsx
    │   ├── Admin.jsx
    │   ├── AllProducts.jsx
    │   ├── Cards.jsx
    │   ├── Cart.jsx
    │   ├── Category.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Home.jsx
    │   ├── LogIn.jsx
    │   ├── NavBar.jsx
    │   ├── OrderSuccess.jsx
    │   ├── Orders.jsx
    │   ├── ShoeModel3D.jsx
    │   ├── SignUp.jsx
    │   ├── SingleProductPage.jsx
    │   └── TopSellingItems.jsx
    ├── config/
    │   └── api.js
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── setupTests.js
    └── styles/
        ├── About.css
        ├── AllProducts.css
        ├── Cards.css
        ├── Cart.css
        ├── Category.css
        ├── FetchedCards.css
        ├── Footer.css
        ├── Hero.css
        ├── NavBar.css
        ├── Order.css
        ├── OrderSuccess.css
        ├── ShoeModel3D.css
        ├── SignUp_Login.css
        └── SingleProductPage.css
```

---

## Files

### `package.json`

```json
{
  "name": "to-do",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@auth0/auth0-react": "^2.2.4",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.18.0",
    "axios": "^1.7.2",
    "bootstrap": "^5.3.3",
    "piyush": "^1.0.0",
    "piyushai": "^1.0.6",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.3",
    "react-dom": "^18.2.0",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "^5.0.1",
    "three": "^0.184.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "tailwindcss": "^3.4.4"
  }
}
```

### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="ShuZ — footwear crafted for every stride." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>ShuZ</title>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <style>
      html, body, #root { height: 100%; }
      body { margin: 0; background: #000; }
    </style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### `public/manifest.json`

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
"icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### `src/App.css`

```css
.app {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.content {
  position: relative;
  z-index: 2;      
  width: 100%;
  min-height: 100vh;
}
```

### `src/App.js`

```js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import About from './components/About';
import Home from './components/Home';
import Admin from './components/Admin';
import Category from './components/Category';
import Cart from './components/Cart';
import AllProducts from './components/AllProducts';
import SingleProductPage from './components/SingleProductPage';
import Orders from './components/Orders';
import OrderSuccess from './components/OrderSuccess';

function App() {
  const { user } = useContext(AuthContext);

  const ValidateRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/men" element={<Category category={"men"} />} />
            <Route path="/women" element={<Category category={"women"} />} />
            <Route path="/kids" element={<Category category={"kids"} />} />
            <Route path="/cart" element={<ValidateRoute><Cart /></ValidateRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/single/:id" element={<SingleProductPage />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-success" element={<ValidateRoute><OrderSuccess /></ValidateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
```

### `src/App.test.js`

```js
import { render, screen } from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### `src/auth/AuthContext.js`

```js
import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const normalizeUser = (rawUser) => {
  if (!rawUser) return null;
  if (rawUser.user) return normalizeUser(rawUser.user);
  if (rawUser.data) return normalizeUser(rawUser.data);
  if (Array.isArray(rawUser) && rawUser.length === 1) return normalizeUser(rawUser[0]);
  return rawUser._doc ?? rawUser;
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: normalizeUser(action.payload),
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser);
      dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser });
    } catch (err) {
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### `src/components/About.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/About.css';
import NavBar from './NavBar';
const About = () => {
  const [stats, setStats] = useState({
    happyCustomers: '+12k',
    stylesAvailable: '+500',
    pairsShipped: '+80k',
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            happyCustomers: data.happyCustomers || '+12k',
            stylesAvailable: data.stylesAvailable || '+500',
            pairsShipped: data.pairsShipped || '+80k',
          });
        } else {
        }
      } catch (error) {
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="about-page">
      <NavBar />
      <div className="about-container">
        <p className="about-label">our story</p>
        <h1 className="about-heading">about<br/>ShüZ.</h1>
        <p className="about-content">
          ShüZ is your go-to online store for the latest trends in shoes for men, women, and kids.
          We offer a wide range of shoes to suit all styles and preferences — from bold trainers to
          elegant formals, casual flats to rugged boots.
        </p>
        <div className="about-divider" />
        <div className="about-stat-grid">
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.happyCustomers}</p>
            <p className="about-stat-label">happy customers</p>
          </div>
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.stylesAvailable}</p>
            <p className="about-stat-label">styles available</p>
          </div>
          <div className="about-stat-card">
            <p className="about-stat-num">{stats.pairsShipped}</p>
            <p className="about-stat-label">pairs shipped</p>
          </div>
        </div>
        <div className="about-divider" />
        <h2 className="about-heading" style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', marginBottom: '1rem' }}>the builder</h2>
        <p className="about-content">
          Built with care by a developer who believes great products deserve great design.
          Find the project on GitHub and reach out with ideas, feedback, or just to say hi.
        </p>
      </div>
    </div>
  );
};
export default About;
```

### `src/components/Admin.jsx`

```jsx
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin(){




    const navigate = useNavigate(); 

    const handleHomeClick = () => {
      navigate('/'); 
    };

    const[product,setProduct] = useState({
      title : "",
      imageURL : "",
      price:"",
      category:"",
      details:"",
    })

    function handleInput(e){
      let name = e.target.name;
      let value = e.target.value;
      setProduct({
        ...product,
        [name] : value,   
      });
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
    try{

      const response = await  axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/add`,product );
        setProduct({title : "",imageURL : "",price:"",category:"",details:"",});
        alert("Product Added ")
        navigate("/")  
     }

    catch(error){
        if (error.response && error.response.status === 401) {
            alert(error.response.data.message);
          } 
        }
      }


    return(
      <>
        <div className='admin'>
        <center className='login-text'><h1 >Admin</h1></center>

        <form onSubmit={handleSubmit }>

         <FloatingLabel

         label="title "
         className="mb-3 pass-field">
         <Form.Control type="text" 
                       placeholder="name@example.com"
                       name ='title'
                       id='title'
                       required 
                       autoComplete='off' 
                       value={product.title}
                       onChange={handleInput} />
         <br></br>
       </FloatingLabel>
       <FloatingLabel label="imageURL" className='pass-field'>
         <Form.Control type="text" 
                       name='imageURL'
                       placeholder="imageURL"
                       id='imageURL'
                       required 
                       autoComplete='off' 
                       value={product.imageURL}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="price" className='pass-field'>
         <Form.Control type="number" 
                       name='price'
                       placeholder="price"details                id='price'
                       required 
                       autoComplete='off' 
                       value={product.price}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="category " className='pass-field'>
         <Form.Control type="text" 
                       name='category'
                       placeholder="category"details                id='category'
                       required 
                       autoComplete='off' 
                       value={product.category}
                       onChange={handleInput} />
       </FloatingLabel>
       <FloatingLabel label="details" className='pass-field'>
         <Form.Control type="text" 
                       name='details'
                       placeholder="details"
                       id='details'
                       required 
                       autoComplete='off' 
                       value={product.details}
                       onChange={handleInput} />
       </FloatingLabel>
       <Button  className='signup-button' variant="info" type="submit">Add </Button>
       </form>
        <center className='bottom-login-text'>
        Check Products
        <a onClick={handleHomeClick} className=''> Home Page!</a>
        </center>
        </div>
{}
        </>
    );
}


export default Admin
```

### `src/components/AllProducts.jsx`

```jsx
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
```

### `src/components/Cards.jsx`

```jsx
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
        {}
        <Card className="home-card" onClick={() => navigate('/men')}>
          <img className="home-card-img" src="../images/men2.jpg" alt="Men" />
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
          <img className="home-card-img" src="../images/women.png" alt="Women" />
          <Card.Body className="home-card-body">
            <Card.Title className="home-card-title">women</Card.Title>
            <Card.Text className="home-card-text">
              Versatility, comfort and chic style — from training to evening wear.
            </Card.Text>
            <Button onClick={() => navigate('/women')}>women's section</Button>
          </Card.Body>
        </Card>
        {}
        <Card className="home-card" onClick={() => navigate('/kids')}>
          <img className="home-card-img" src="../images/kids.png" alt="Kids" />
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
```

### `src/components/Cart.jsx`

```jsx
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
```

### `src/components/Category.jsx`

```jsx
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
```

### `src/components/Footer.jsx`

```jsx
import React from 'react';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div style={{ textAlign: 'center' }}>
        <h5>ShüZ - By Piyush</h5>
        <p>
          your go-to store for the latest trends in shoes for men, women, and kids.
          crafted for every stride — bold, light, and built to last.   
          Github : https:
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <span
            onClick={() => navigate('/about')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            about
          </span>
          <span
            onClick={() => navigate('/allproducts')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            products
          </span>
          <span
            onClick={() => navigate('/orders')}
            style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            orders
          </span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} ShüZ. all rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
```

### `src/components/Hero.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import ShoeModel3D from './ShoeModel3D';
import '../styles/Hero.css';
const Hero = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    happyCustomers: '+12k',
    pairsShipped: '+80k',
    stylesAvailable: '+500',
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            happyCustomers: data.happyCustomers || '+12k',
            pairsShipped: data.pairsShipped || '+80k',
            stylesAvailable: data.stylesAvailable || '+500',
          });
        } else {
        }
      } catch (error) {
      }
    };
    fetchStats();
  }, []);
  return (
    <section className="hero-section">
      {}
      {}
      {}
      <div className="hero-bottom-grad" />
      {}
      <h1 className="hero-word hero-word-walk">walk</h1>
      <h1 className="hero-word hero-word-your">your</h1>
      <h1 className="hero-word hero-word-story">story</h1>
      {}
      <div className="hero-model-slot">
        <ShoeModel3D />
      </div>
      {}
      <p className="hero-desc">
        footwear crafted for every stride — bold, light, and built to last.
      </p>
      {}
      <div className="hero-stat hero-stat-tr">
        <div className="hero-stat-row right">
          <div className="hero-stat-divider up" />
          <span className="hero-stat-num">{stats.happyCustomers}</span>
        </div>
        <p className="hero-stat-label right">happy customers</p>
      </div>
      {}
      <div className="hero-stat hero-stat-bl">
        <div className="hero-stat-row">
          <span className="hero-stat-num">{stats.pairsShipped}</span>
          <div className="hero-stat-divider down" />
        </div>
        <p className="hero-stat-label">pairs shipped</p>
      </div>
      {}
      <div className="hero-stat hero-stat-br">
        <div className="hero-stat-row right">
          <div className="hero-stat-divider down" />
          <span className="hero-stat-num">{stats.stylesAvailable}</span>
        </div>
        <p className="hero-stat-label right">styles available</p>
      </div>
      {}
      <button
        className="hero-explore-btn"
        onClick={() => navigate('/allproducts')}
      >
        SHOP NOW
      </button>
    </section>
  );
};
export default Hero;
```

### `src/components/Home.jsx`

```jsx
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
      {}
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
```

### `src/components/LogIn.jsx`

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
function LogIn() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, user);
      const loginPayload = response.data?.data?.user ?? response.data?.user ?? response.data?.data ?? response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: loginPayload });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
      alert("Login Failed");
    }
  };
  return (
    <div className="login-page">
      <div className="auth-card">
        <p className="auth-page-label">welcome back</p>
        <h1 className="login-text">sign in</h1>
        <p className="auth-sub">enter your credentials to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <input
              type="email"
              name="email"
              placeholder="email address"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="pass-field">
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <button type="submit" className="login-button">sign in</button>
        </form>
        <p className="bottom-login-text">
          no account?{' '}
          <a onClick={() => navigate('/signup')}>create one</a>
        </p>
        <p className="bottom-login-text">
          <a onClick={() => navigate('/')}>go to home page</a>
        </p>
      </div>
    </div>
  );
}
export default LogIn;
```

### `src/components/NavBar.jsx`

```jsx
import React, { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth/AuthContext';
import { RiAdminLine, RiShoppingCartLine } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const userId = user?._id ?? user?.id ?? user?.userId ?? user?.data?._id ?? user?.user?._id;
  const displayName = user?.username ?? user?.name ?? user?.data?.username ?? user?.data?.name ?? user?.user?.username ?? user?.user?.name ?? user?.email?.split('@')[0] ?? user?.data?.email?.split('@')[0] ?? 'User';
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (!userId) { setCartCount(0); return; }
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`);
        const data = await res.json();
        setCartCount(data?.items?.length || 0);
      } catch (err) {}
    };
    fetchCart();
  }, [userId]);
  const handleLoginClick  = () => navigate('/login');
  const handleLogoutClick = () => { dispatch({ type: "LOGOUT" }); navigate('/login'); };
  return (
    <nav className="main-nav">
      {}
      <div className="nav-left-pill">
        <svg className="nav-shoe-icon" viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="29" rx="17" ry="5.5" fill="#fff" opacity="0.9"/>
          <path d="M6 29 Q4 19 10 12 Q16 6 24 8 Q32 10 34 19 L34 29 Z" fill="#fff"/>
          <path d="M10 17 Q14 14 20 15 Q26 16 30 21"
                stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        <Link to="/" className="nav-logo-text">ShüZ</Link>
      </div>
      {}
      <div className="nav-center-pill">
        <Link to="/"           className="nav-text">home</Link>
        <Link to="/men"        className="nav-text">men</Link>
        <Link to="/women"      className="nav-text">women</Link>
        <Link to="/kids"       className="nav-text">kids</Link>
        <Link to="/allproducts" className="nav-text">all products</Link>
        <Link to="/about"      className="nav-text">about</Link>
      </div>
      {}
      <div className="nav-right-pill">
        {}
        <Link to={user ? "/orders" : "/login"} className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
          <GoInbox className="cart-icon" />
        </Link>
        {}
        <Link to={user ? "/cart" : "/login"} className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
          <RiShoppingCartLine className="cart-icon" />
          {cartCount > 0 && (
            <Badge className="cart-badge" bg="light" text="dark">{cartCount}</Badge>
          )}
        </Link>
        {}
        {user?.email === "admin@admin.com" && (
          <Link to="/admin" className="nav-text" style={{padding:'0.45rem 0.75rem'}}>
            <RiAdminLine className="cart-icon" />
          </Link>
        )}
        {}
        {user ? (
          <>
            <span className="nav-user-name">{displayName}</span>
            <Button className="nav-login-button" onClick={handleLogoutClick}>logout</Button>
          </>
        ) : (
          <Button className="nav-login-button" onClick={handleLoginClick}>log in</Button>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
```

### `src/components/OrderSuccess.jsx`

```jsx
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
```

### `src/components/Orders.jsx`

```jsx
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
```

### `src/components/ShoeModel3D.jsx`

```jsx
import React, { useEffect, useRef } from 'react';
import '../styles/ShoeModel3D.css';
let cachedShoeGLTF = null;
let cachedShoePromise = null;
const ShoeModel3D = () => {
  const containerRef = useRef(null);
  const initialisedRef = useRef(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialisedRef.current) return;
    initialisedRef.current = true;
    let scene, camera, renderer, controls, animationId;
    let cleanupFn = null;
    const initScene = async () => {
      try {
        const [
          THREE,
          { GLTFLoader },
          { OrbitControls },
          { MeshoptDecoder },
        ] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/controls/OrbitControls.js'),
          import('three/examples/jsm/libs/meshopt_decoder.module.js'),
        ]);
        const getW = () => container.clientWidth  || 400;
        const getH = () => container.clientHeight || 400;
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(getW(), getH());
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(45, getW() / getH(), 0.1, 1000);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping   = true;
        controls.dampingFactor   = 0.05;
        controls.enablePan       = false;
        controls.enableZoom      = true;
        controls.minDistance     = 2;
        controls.maxDistance     = 10;
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 0.8;
        controls.target.set(0, 0, 0);
        controls.update();
        scene.add(new THREE.AmbientLight(0xffffff, 3));
        const key = new THREE.DirectionalLight(0xffffff, 4);
        key.position.set(3, 5, 5);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0x8888ff, 2);
        fill.position.set(-5, 2, -3);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xffffff, 3);
        rim.position.set(0, 5, -8);
        scene.add(rim);
        const bottom = new THREE.DirectionalLight(0xffffff, 1.5);
        bottom.position.set(0, -5, 0);
        scene.add(bottom);
        const setupModel = (gltf) => {
          scene.children.filter(c => c.isGroup).forEach(c => scene.remove(c));
          const group  = new THREE.Group();
          const cloned = gltf.scene.clone(true);
          cloned.scale.set(0.75, 0.75, 0.75);
          group.add(cloned);
          scene.add(group);
          group.updateMatrixWorld(true);
          const box    = new THREE.Box3().setFromObject(group);
          const centre = new THREE.Vector3();
          box.getCenter(centre);
          cloned.position.set(-centre.x, -centre.y, -centre.z);
          cloned.traverse((c) => {
            if (c.isMesh && c.material) {
              const mats = Array.isArray(c.material) ? c.material : [c.material];
              mats.forEach(m => {
                m.side = THREE.DoubleSide;
                if (m.emissive) m.emissive.set(0x111111);
                m.needsUpdate = true;
              });
            }
          });
        };
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        if (cachedShoeGLTF) {
          setupModel(cachedShoeGLTF);
        } else if (cachedShoePromise) {
          cachedShoePromise.then(setupModel);
        } else {
          cachedShoePromise = loader.loadAsync('/models/shoe.glb');
          cachedShoePromise.then((gltf) => { cachedShoeGLTF = gltf; setupModel(gltf); });
        }
        const handleResize = () => {
          camera.aspect = getW() / getH();
          camera.updateProjectionMatrix();
          renderer.setSize(getW(), getH());
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(container);
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
        cleanupFn = () => {
          cancelAnimationFrame(animationId);
          ro.disconnect();
          controls.dispose();
          renderer.dispose();
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
          initialisedRef.current = false;
        };
      } catch (err) {
        initialisedRef.current = false;
      }
    };
    initScene();
    return () => { if (cleanupFn) cleanupFn(); };
  }, []);
  return <div className="shoe-model-container" ref={containerRef} />;
};
export default ShoeModel3D;
```

### `src/components/SignUp.jsx`

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp_Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  function handleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, user);
      if (response.data.message === "Exists") {
        alert("Already Exists");
        setUser({ username: "", email: "", password: "" });
      } else {
        setUser({ username: "", email: "", password: "" });
        alert("Account Created");
        navigate("/login");
      }
    } catch (err) {
      if (!err?.response) { alert('No Server Response'); }
      else { alert('Registration Failed'); }
    }
  };
  return (
    <div className="sign-up">
      <div className="auth-card">
        <p className="auth-page-label">new here</p>
        <h1 className="signup-text">create account</h1>
        <p className="auth-sub">sign up to start shopping</p>
        <form onSubmit={handleSubmit}>
          <div className="username-field">
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="email-field">
            <input
              type="email"
              name="email"
              placeholder="email address"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="pass-field">
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <button type="submit" className="signup-button">register</button>
        </form>
        <p className="bottom-login-text">
          already have an account?{' '}
          <a onClick={() => navigate('/login')}>log in</a>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
```

### `src/components/SingleProductPage.jsx`

```jsx
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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/add`, {
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
        `${process.env.REACT_APP_API_URL}/api/products/get/single/${id}`
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
```

### `src/components/TopSellingItems.jsx`

```jsx
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
          `${process.env.REACT_APP_API_URL}/api/products/get/${category}`
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
```

### `src/config/api.js`

```js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
```

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap');
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #root {
  height: 100%;
}
body {
  font-family: 'Readex Pro', system-ui, -apple-system, sans-serif;
  background: #000;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 99px; }
.hero-title {
  letter-spacing: -0.04em;
  line-height: 0.95;
}
.page-wrapper {
  background: #000;
  min-height: 100vh;
  color: #fff;
}
.state-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 1rem;
  color: rgba(255,255,255,0.4);
  font-family: 'Readex Pro', sans-serif;
  letter-spacing: 0.05em;
}
```

### `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './auth/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);
reportWebVitals();
```

### `src/reportWebVitals.js`

```js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
export default reportWebVitals;
```

### `src/setupTests.js`

```js
import '@testing-library/jest-dom';
```

### `src/styles/About.css`

```css
.about-page {
  background: #000;
  min-height: 100vh;
  padding-top: 5.5rem;
  padding-bottom: 8rem;
}
.about-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 4rem 2rem 0;
}
.about-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.75rem;
}
.about-heading {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 3.5rem;
  text-align: left;
}
.about-content {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: left;
}
.about-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 3rem 0;
}
.about-stat-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.25rem;
  padding: 1.8rem;
}
.about-stat-num {
  font-family: 'Readex Pro', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 0.3rem;
  animation: scaleIn 0.8s ease-out;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
.about-stat-label {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
}
.about-divider {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 2.5rem 0;
}
@media (max-width: 640px) {
  .about-page { padding-top: 4.5rem; padding-bottom: 6rem; }
  .about-container { padding: 2rem 1.5rem 0; }
  .about-stat-grid { grid-template-columns: 1fr; gap: 1.2rem; }
  .about-heading { font-size: 2.2rem; margin-bottom: 2rem; }
  .about-stat-num { font-size: 2rem; }
  .about-stat-card { padding: 1.5rem; }
  .about-content { font-size: 0.95rem; }
}
@media (max-width: 480px) {
  .about-container { padding: 1.5rem 1rem 0; }
  .about-heading { font-size: 1.8rem; }
  .about-stat-num { font-size: 1.5rem; }
  .about-stat-label { font-size: 0.7rem; }
}
```

### `src/styles/AllProducts.css`

```css
.allp-page {
  background: #000;
  min-height: 100vh;
  padding-top: 5.5rem;
  padding-bottom: 8rem;
}
.allp-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 0;
}
.allp-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}
.allp-heading {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 2.5rem;
}
.search-bar-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 1.5rem;
}
.search-bar {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 9999px !important;
  padding: 0.75rem 1.4rem !important;
  color: #fff !important;
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.88rem !important;
  outline: none !important;
  transition: border-color 0.2s !important;
  width: 100% !important;
  max-width: 420px !important;
}
.search-bar:focus {
  border-color: rgba(255,255,255,0.35) !important;
  box-shadow: none !important;
  background: rgba(255,255,255,0.07) !important;
}
.search-bar::placeholder { color: rgba(255,255,255,0.28) !important; }
.allp-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
.card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 1.25rem !important;
  overflow: hidden !important;
  transition: border-color 0.3s, background 0.3s !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
}
.card:hover {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.18) !important;
  transform: none !important;
  box-shadow: none !important;
}
.card-img {
  width: 100% !important;
  height: 220px !important;
  object-fit: contain !important;
  background: rgba(255,255,255,0.06) !important;
  padding: 0.75rem !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  cursor: pointer;
  transition: transform 0.35s;
}
.card:hover .card-img { transform: scale(1.04); }
.card-body {
  padding: 1.1rem !important;
  background: transparent !important;
}
.category {
  font-size: 0.62rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.3em !important;
  text-transform: uppercase !important;
  color: rgba(255,255,255,0.35) !important;
  margin-bottom: 0.35rem !important;
  opacity: 1 !important;
}
.card-title {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  margin-bottom: 0.3rem !important;
}
.card-text {
  font-size: 0.78rem !important;
  color: rgba(255,255,255,0.4) !important;
  line-height: 1.55 !important;
  margin-bottom: 1rem !important;
}
.btn-primary-custom {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 0.45rem 1.1rem !important;
  transition: background 0.2s !important;
}
.btn-primary-custom:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 640px) {
  .allp-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0 1rem;
  }
  .card-img { height: 170px !important; }
}
@media (max-width: 400px) {
  .allp-container { grid-template-columns: 1fr; }
}
html, body { overflow-x: hidden; }
```

### `src/styles/Cards.css`

```css
.cards-section {
  background: #000;
  padding: 6rem 2.5rem 5rem;
}
.cards-section-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  text-align: center;
  margin-bottom: 0.75rem;
}
.cards-section-heading {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
}
.home-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
}
.home-card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 1.25rem !important;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s !important;
  cursor: pointer;
}
.home-card:hover {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.18) !important;
}
.home-card-img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
  filter: brightness(0.7);
  transition: filter 0.4s;
}
.home-card:hover .home-card-img {
  filter: brightness(0.85);
}
.home-card-body {
  padding: 1.4rem !important;
  background: transparent !important;
}
.home-card-title {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem !important;
}
.home-card-text {
  font-size: 0.82rem !important;
  color: rgba(255,255,255,0.45) !important;
  line-height: 1.65 !important;
  margin-bottom: 1.1rem !important;
}
.home-card-body .btn {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 0.5rem 1.3rem !important;
  letter-spacing: 0.02em;
  transition: background 0.2s !important;
}
.home-card-body .btn:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 768px) {
  .home-cards-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
```

### `src/styles/Cart.css`

```css
.cart-page {
  background: #000;
  min-height: 100vh;
  padding-top: 5.5rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-inner {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 2rem;
  width: 100%;
  margin-bottom: 1.5rem;
}
.cart-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}
.cart-heading {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: clamp(2.5rem, 5vw, 3.5rem) !important;
  font-weight: 500 !important;
  letter-spacing: -0.04em !important;
  line-height: 0.95 !important;
  color: #fff !important;
  margin-bottom: 2.5rem !important;
  text-align: left !important;
}
.cart-wrapper {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}
.cart-card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  margin-bottom: 0.75rem !important;
  transition: all 0.3s ease !important;
  animation: slideIn 0.4s ease-out;
}
.cart-card:hover {
  border-color: rgba(255,255,255,0.15) !important;
  background: rgba(255,255,255,0.06) !important;
  transform: translateX(4px);
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}
.cart-item-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1.1rem !important;
  gap: 1rem;
}
.cart-item-left {
  display: flex !important;
  align-items: center !important;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}
.cart-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: rgba(255,255,255,0.08);
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
  flex-shrink: 0;
  padding: 8px;
}
.cart-item-details {
  min-width: 0;
}
.cart-title {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.88rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  margin-bottom: 0.2rem !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cart-price {
  font-size: 0.8rem !important;
  color: rgba(255,255,255,0.45) !important;
}
.cart-item-right {
  display: flex !important;
  align-items: center !important;
  gap: 0.6rem;
  flex-shrink: 0;
}
.quantity-btn {
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
  border: 1px solid rgba(255,255,255,0.15) !important;
  background: transparent !important;
  color: #fff !important;
  font-size: 1rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  transition: background 0.2s !important;
  line-height: 1;
}
.quantity-btn:hover {
  background: rgba(255,255,255,0.1) !important;
  border-color: rgba(255,255,255,0.3) !important;
}
.remove-btn {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 400 !important;
  background: transparent !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: rgba(255,255,255,0.4) !important;
  border-radius: 9999px !important;
  padding: 0.3rem 0.9rem !important;
  transition: all 0.2s !important;
}
.remove-btn:hover {
  border-color: rgba(255,255,255,0.4) !important;
  color: #fff !important;
  background: transparent !important;
}
.total-card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 1rem !important;
  margin-top: 0.75rem !important;
  padding: 1.4rem !important;
}
.cart-total-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.cart-total-row h4 {
  font-family: 'Readex Pro', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0;
}
.placeorder-button {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 0.6rem !important;
  padding: 0.8rem 2rem !important;
  transition: background 0.2s !important;
}
.placeorder-button:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 768px) {
  .cart-page { padding-top: 4.5rem; padding-bottom: 3rem; }
  .cart-inner { padding: 1.5rem 1.5rem; }
  .cart-wrapper { padding: 0; }
  .cart-img { width: 56px; height: 56px; }
  .cart-item-row { padding: 0.9rem !important; }
  .cart-title { font-size: 0.8rem !important; }
}
@media (max-width: 480px) {
  .cart-page { padding-top: 4rem; }
  .cart-inner { padding: 1rem 1rem; }
  .cart-heading { font-size: 2rem !important; margin-bottom: 1.5rem !important; }
  .cart-img { width: 48px; height: 48px; padding: 6px; }
  .cart-item-row { padding: 0.75rem !important; gap: 0.75rem; }
  .cart-item-left { gap: 0.75rem; }
  .quantity-btn { width: 28px !important; height: 28px !important; font-size: 0.9rem !important; }
  .cart-title { font-size: 0.75rem !important; }
  .cart-price { font-size: 0.7rem !important; }
  .remove-btn { padding: 0.25rem 0.7rem !important; font-size: 0.65rem !important; }
}
@media (max-width: 600px) {
  .cart-wrapper, .cart-inner { padding: 0 1rem; }
  .cart-item-row { flex-wrap: wrap; }
  .cart-item-right { margin-left: auto; }
}
```

### `src/styles/Category.css`

```css
.cat-page {
  background: #000;
  min-height: 100vh;
  padding-top: 5.5rem;
  padding-bottom: 8rem;
}
.cat-page-header {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 0;
}
.cat-page-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}
.cat-page-heading {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 2rem;
  text-transform: lowercase;
}
.cat-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
.cat-card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 1.25rem !important;
  overflow: hidden !important;
  transition: border-color 0.3s, background 0.3s !important;
  cursor: pointer;
}
.cat-card:hover {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.18) !important;
}
.cat-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  background: rgba(255,255,255,0.06);
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: block;
  transition: transform 0.35s;
}
.cat-card:hover .cat-img { transform: scale(1.04); }
.cat-body {
  padding: 1.1rem !important;
  background: transparent !important;
}
.cat-title {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  margin-bottom: 0.3rem !important;
}
.cat-details {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.55;
  margin-bottom: 0.5rem;
}
.cat-category {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.9rem;
}
.cat-price-btn {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 0.45rem 1.1rem !important;
  transition: background 0.2s !important;
}
.cat-price-btn:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 640px) {
  .cat-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem;
    gap: 0.75rem;
  }
  .cat-img { height: 170px; }
}
```

### `src/styles/FetchedCards.css`

```css
.ts-section {
  background: #000;
  padding: 5rem 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.07);
}
.ts-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto 2.5rem;
}
.ts-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}
.ts-heading {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
}
.ts-view-all {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Readex Pro', sans-serif;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
  flex-shrink: 0;
}
.ts-view-all:hover { color: #fff; }
.ts-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
}
.ts-card {
  background: rgba(255,255,255,0.04) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 1.25rem !important;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s !important;
}
.ts-card:hover {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.18) !important;
}
.ts-card-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  background: rgba(255,255,255,0.06);
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: transform 0.35s;
}
.ts-card:hover .ts-card-img { transform: scale(1.04); }
.ts-card .card-body {
  padding: 1rem !important;
  background: transparent !important;
}
.ts-card-title {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.88rem !important;
  font-weight: 600 !important;
  color: #fff !important;
  margin-bottom: 0.25rem !important;
}
.ts-card-price {
  font-size: 0.82rem !important;
  color: rgba(255,255,255,0.5) !important;
  margin-bottom: 0.9rem !important;
}
.ts-card .btn {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 0.4rem 1rem !important;
  transition: background 0.2s !important;
}
.ts-card .btn:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 640px) {
  .ts-cards-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
```

### `src/styles/Footer.css`

```css
.footer {
  background: #000 !important;
  border-top: 1px solid rgba(255,255,255,0.07) !important;
  padding: 2.5rem 2.5rem !important;
  margin-top: 0 !important;
}
.footer h5 {
  font-family: 'Readex Pro', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.75rem;
}
.footer p {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.65;
  max-width: 520px;
  margin: 0 auto 1.5rem;
  text-align: center;
}
.footer-copy {
  font-size: 0.75rem !important;
  color: rgba(255,255,255,0.25) !important;
  letter-spacing: 0.05em;
  margin: 0 !important;
}
```

### `src/styles/Hero.css`

```css
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  z-index: 0;
}
.hero-bottom-grad {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18rem;
  background: linear-gradient(to top, #000 0%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}
.hero-word {
  position: absolute;
  font-family: 'Readex Pro', sans-serif;
  font-weight: 500;
  font-size: clamp(4rem, 14vw, 13vw);
  color: #fff;
  letter-spacing: -0.04em;
  line-height: 0.95;
  z-index: 3;
  text-transform: lowercase;
  pointer-events: none;
  animation: heroFadeUp 0.9s ease both;
}
.hero-word-walk  { left: 4vw;  top: 18%; animation-delay: 0.1s;  z-index: 6; }
.hero-word-your  { right: 4vw; top: 38%; animation-delay: 0.25s; z-index: 6; }
.hero-word-story { left: 18%;  top: 58%; animation-delay: 0.4s;  z-index: 6; }
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-model-slot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(320px, 55vw, 700px);
  height: clamp(320px, 70vh, 700px);
  z-index: 4;
  pointer-events: auto;
}
.hero-desc {
  position: absolute;
  left: 4vw;
  top: 46%;
  max-width: 220px;
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.7);
  z-index: 6;
  animation: heroFadeUp 0.9s ease 0.35s both;
}
.hero-stat {
  position: absolute;
  z-index: 6;
  animation: heroFadeUp 0.9s ease 0.5s both;
}
.hero-stat-tr { right: 5vw; top: 14%; }
.hero-stat-bl { left: 5vw;  bottom: 6rem; }
.hero-stat-br { right: 5vw; bottom: 5rem; }
.hero-stat-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.hero-stat-row.right { justify-content: flex-end; }
.hero-stat-num {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #fff;
  animation: statPulse 2.5s ease-in-out infinite;
}
.hero-stat-divider {
  height: 1px;
  width: 96px;
  background: rgba(255,255,255,0.35);
}
.hero-stat-divider.up   { transform: rotate(20deg); }
.hero-stat-divider.down { transform: rotate(-20deg); }
.hero-stat-label {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.65);
  margin-top: 0.3rem;
  letter-spacing: 0.02em;
}
.hero-stat-label.right { text-align: right; }
@keyframes statPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
}
.hero-explore-btn {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 7;                       
  font-family: 'Readex Pro', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 9999px;
  padding: 0.9rem 2.5rem;
  cursor: pointer;
  animation: heroFadeUp 0.9s ease 0.6s both, buttonBounce 3s ease-in-out 1.5s infinite;
  transition: background 0.2s, box-shadow 0.2s;
}
.hero-explore-btn:hover {
  background: #e5e5e5;
  box-shadow: 0 8px 24px rgba(255,255,255,0.2);
  transform: translateX(-50%) scale(1.05);
}
@keyframes buttonBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-5px); }
}
@media (max-width: 768px) {
  .hero-word { font-size: clamp(2.5rem, 10vw, 6vw); }
  .hero-model-slot {
    width: 90vw;
    height: 55vh;
    top: 45%;
  }
  .hero-stat-tr { right: 2vw; top: 12%; }
  .hero-stat-bl { left: 2vw;  bottom: 5.5rem; }
  .hero-stat-br { right: 2vw; bottom: 4.5rem; }
  .hero-stat-divider { display: none; }
  .hero-desc { display: none; }
  .hero-explore-btn {
    bottom: 1.75rem;
    padding: 0.85rem 2.2rem;
    font-size: 0.7rem;
    animation: heroFadeUp 0.9s ease 0.6s both;
  }
  .hero-explore-btn:hover {
    transform: translateX(-50%) scale(1.03);
  }
}
@media (max-width: 480px) {
  .hero-word { font-size: clamp(2rem, 10vw, 4rem); }
  .hero-model-slot {
    width: 95vw;
    height: 50vh;
    top: 44%;
  }
  .hero-stat-tr { right: 1vw; top: 10%; }
  .hero-stat-bl { left: 1vw;  bottom: 5rem; }
  .hero-stat-br { right: 1vw; bottom: 4rem; }
  .hero-explore-btn {
    bottom: 1.25rem;
    padding: 0.8rem 2rem;
    font-size: 0.68rem;
    width: calc(100% - 4rem);       
    text-align: center;
  }
}
```

### `src/styles/NavBar.css`

```css
.main-nav {
  position: fixed !important;
  top: 0;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: min(1200px, calc(100% - 2rem));
  z-index: 100;
  padding: 1.25rem 2rem !important;
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: none !important;
  box-shadow: none !important;
}
.nav-left-pill {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  background: rgba(15,15,15,0.90);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 9999px;
  padding: 0.65rem 1.4rem 0.65rem 1rem;
  border: 1px solid rgba(255,255,255,0.07);
}
.nav-shoe-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.nav-logo-text {
  font-family: 'Readex Pro', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.9rem !important;
  letter-spacing: -0.01em !important;
  color: #fff !important;
  text-decoration: none !important;
  line-height: 1;
}
.nav-center-pill {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  background: rgba(15,15,15,0.90);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 9999px;
  padding: 0.4rem;
  border: 1px solid rgba(255,255,255,0.07);
}
.nav-text {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 400 !important;
  color: rgba(255,255,255,0.55) !important;
  text-decoration: none !important;
  padding: 0.45rem 1.1rem !important;
  border-radius: 9999px !important;
  transition: color 0.2s, background 0.2s !important;
  letter-spacing: 0.01em;
  white-space: nowrap;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.nav-text:hover {
  color: #fff !important;
  background: rgba(255,255,255,0.06) !important;
}
.nav-right-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cart-badge-wrap {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.cart-icon {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.7);
}
.cart-badge {
  background: #fff !important;
  color: #000 !important;
  font-size: 0.6rem !important;
  font-weight: 700 !important;
  min-width: 16px !important;
  height: 16px !important;
  border-radius: 9999px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.nav-login-button {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 0.55rem 1.3rem !important;
  transition: background 0.2s !important;
  white-space: nowrap;
  letter-spacing: 0.01em;
}
.nav-login-button:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
.nav-user-name {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
  white-space: nowrap;
}
.nav-admin-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  transition: all 0.2s;
  text-decoration: none;
}
.nav-admin-link:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}
.navbar-toggler {
  display: none !important;
}
@media (max-width: 768px) {
  .main-nav {
    padding: 1rem 1rem !important;
  }
  .nav-center-pill {
    display: none !important;
  }
  .nav-hide-mobile {
    display: none !important;
  }
}
```

### `src/styles/Order.css`

```css
.orders-container {
  background: #000;
  min-height: 100vh;
  padding: 7rem 2rem 8rem;
  max-width: 760px;
  margin: 0 auto;
}
.orders-container h2 {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 2.5rem;
}
.order-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.25rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}
.order-card:hover { border-color: rgba(255,255,255,0.18); }
.order-card h3 {
  font-family: 'Readex Pro', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.75rem;
  font-weight: 500;
}
.order-card p {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.35rem;
}
.order-card ul {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}
.order-card ul li {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  padding: 0.35rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.order-card ul li:last-child { border-bottom: none; }
.order-card hr {
  display: none;
}
```

### `src/styles/OrderSuccess.css`

```css
.order-success-container {
  background: #000;
  min-height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}
.order-success-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: none;
}
.order-success-card::after { display: none; }
.order-success-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 auto 2rem;
  box-shadow: none;
}
.order-success-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.75rem;
}
.order-success-card h2 {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 0.95;
}
.order-success-subtitle {
  color: rgba(255,255,255,0.4);
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.order-success-meta {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  padding: 1.3rem 1.5rem;
  text-align: left;
  margin-bottom: 1.5rem;
}
.order-success-meta p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-success-meta p:last-child { border-bottom: none; }
.order-success-meta strong {
  color: rgba(255,255,255,0.35);
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.order-success-hint {
  color: rgba(255,255,255,0.3);
  font-size: 0.82rem;
  line-height: 1.65;
  margin-bottom: 2rem;
}
.order-success-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
.order-success-actions button {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  border: none !important;
  border-radius: 0.6rem !important;
  padding: 0.8rem 1.8rem !important;
  cursor: pointer;
  transition: background 0.2s !important;
  background: #fff !important;
  color: #000 !important;
  box-shadow: none !important;
}
.order-success-actions button:hover {
  background: #e5e5e5 !important;
  transform: none !important;
}
.order-success-actions button.secondary {
  background: transparent !important;
  color: rgba(255,255,255,0.6) !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  box-shadow: none !important;
}
.order-success-actions button.secondary:hover {
  border-color: rgba(255,255,255,0.35) !important;
  color: #fff !important;
  background: transparent !important;
}
@media (max-width: 480px) {
  .order-success-card { padding: 2rem 1.5rem; }
  .order-success-actions { flex-direction: column; }
  .order-success-actions button { width: 100%; }
}
```

### `src/styles/ShoeModel3D.css`

```css
.shoe-model-container {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
}
.shoe-model-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  touch-action: none;
  cursor: grab;
}
.shoe-model-container canvas:active {
  cursor: grabbing;
}
@media (max-width: 767px) {
  .shoe-model-container canvas {
    cursor: default;
  }
}
```

### `src/styles/SignUp_Login.css`

```css
.sign-up,
.login-page {
  background: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem 4rem;
}
.auth-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
  padding: 2.8rem;
  width: 100%;
  max-width: 420px;
}
.auth-page-label {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.75rem;
}
.login-text,
.signup-text {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: left !important;
}
.auth-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 2rem;
}
.form-floating > .form-control,
.username-field .form-control,
.email-field .form-control,
.pass-field .form-control {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 0.75rem !important;
  color: #fff !important;
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.9rem !important;
  padding: 0.85rem 1.1rem !important;
  transition: border-color 0.2s !important;
  box-shadow: none !important;
}
.form-floating > .form-control:focus,
.username-field .form-control:focus,
.email-field .form-control:focus,
.pass-field .form-control:focus {
  border-color: rgba(255,255,255,0.4) !important;
  background: rgba(255,255,255,0.07) !important;
  box-shadow: none !important;
  color: #fff !important;
}
.form-floating > .form-control::placeholder,
.username-field .form-control::placeholder,
.email-field .form-control::placeholder,
.pass-field .form-control::placeholder {
  color: rgba(255,255,255,0.25) !important;
}
.form-floating > label {
  color: rgba(255,255,255,0.35) !important;
  font-size: 0.82rem !important;
}
.username-field,
.email-field,
.pass-field {
  width: 100% !important;
  margin: 0 0 0.75rem !important;
}
.signup-button,
.login-button {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 0.6rem !important;
  padding: 0.85rem 2rem !important;
  width: 100% !important;
  height: auto !important;
  margin: 0.75rem 0 !important;
  transition: background 0.2s !important;
  cursor: pointer;
  letter-spacing: 0.01em;
  display: block !important;
}
.signup-button:hover,
.login-button:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
.bottom-login-text {
  text-align: center;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  margin-top: 1.25rem;
  font-family: 'Readex Pro', sans-serif;
}
.bottom-login-text a {
  color: rgba(255,255,255,0.65) !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
  cursor: pointer;
  transition: color 0.2s;
}
.bottom-login-text a:hover { color: #fff !important; }
.admin {
  background: #000;
  min-height: 100vh;
  padding: 6rem 1.5rem 4rem;
  max-width: 480px;
  margin: 0 auto;
}
.admin h1 {
  font-family: 'Readex Pro', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 2.5rem;
  text-align: center;
}
```

### `src/styles/SingleProductPage.css`

```css
.single-product-page {
  background: #000;
  min-height: 100vh;
  padding-top: 5.5rem;
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.single-product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
  align-items: start;
  background: transparent;
  flex-wrap: unset;
  align-self: center;
}
.product-image {
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
}
.product-details {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 100%;
}
.product-category {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1rem;
}
.product-title {
  font-family: 'Readex Pro', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #fff;
  margin-bottom: 1rem;
}
.product-description {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}
.product-price {
  font-family: 'Readex Pro', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 2rem;
}
.button-primary {
  font-family: 'Readex Pro', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  background: #fff !important;
  color: #000 !important;
  border: none !important;
  border-radius: 0.6rem !important;
  padding: 0.85rem 2rem !important;
  cursor: pointer;
  transition: background 0.2s !important;
  width: fit-content;
}
.button-primary:hover {
  background: #e5e5e5 !important;
  color: #000 !important;
}
@media (max-width: 768px) {
  .single-product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .product-title { font-size: 1.8rem; }
  .product-price { font-size: 1.5rem; }
  .button-primary { width: 100% !important; }
}
```

---

*End of context. You now have full visibility into this project.*
