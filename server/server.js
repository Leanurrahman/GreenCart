// server.js

import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';

// Step 1: Connect to MongoDB
await connectDB(); // Works only if "type": "module" is set in package.json
await connectCloudinary()


// Step 3: Create Express App
const app = express();
const port = process.env.PORT || 4000;

// Step 2: Allowed CORS origins
const allowedOrigins = ['http://localhost:5173'];

// Step 4: Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Step 5: Sample Route
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)

// Step 6: Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
