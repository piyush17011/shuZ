import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';

// ❌ ShoeModel3D removed from here — it lives inside Hero.jsx only
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