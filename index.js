// index.js (entry point)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import logger from './utils/logger.js';
import morgan from 'morgan';
import router from './routes/routes.js';

// Load environment variables
dotenv.config({quiet:true});

const PORT = process.env.PORT || 4040;
const DB_URL = process.env.MONGO_DB;

// Initialize Express
const app = express();

app.use(helmet()); 
const allowedOrigins = [
  "http://localhost:3000",
  "https://projectsbyvinodmanimaran.vercel.app",
  // "https://*.yourdomain.com", // wildcard subdomains
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(o => new RegExp(o.replace("*", ".*")).test(origin))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend is running!',
    app: 'Official Portfolio Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1',router)


// MongoDB connection
mongoose.connect(DB_URL)
.then(() => {
  console.log('MongoDB connected successfully');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
