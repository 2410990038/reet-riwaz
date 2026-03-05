const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://reet-riwaz-8l82.vercel.app',
    'https://reet-riwaz-qzcd.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/returns', require('./routes/returnRoutes'));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));