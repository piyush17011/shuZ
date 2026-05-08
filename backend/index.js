const express = require('express');
const connect = require('./dbConnection');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const statsRoutes = require('./routes/statsRoutes');
const cors = require('cors');
const helmet = require('helmet')
const redis = require('./config/redis');

const app = express();

// Connect DB
connect();

// Allow Netlify + Localhost
const allowedOrigins = [
  'http://localhost:3000',
  'https://shoelify.onrender.com',
  'https://shuz.onrender.com',   // <--- CHANGE THIS AFTER DEPLOY
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(helmet());
app.use(express.json());
app.use(helmet())        // XSS protection
app.use(generalLimiter)
// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/stats", statsRoutes);

// Port for Render + Local
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
