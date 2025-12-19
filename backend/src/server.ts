import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRoutes from './routes/content';
import analyticsRoutes from './routes/analytics';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Content Automation API is running' });
});

app.listen(PORT, () => {
  console.log(`\ud83d\ude80 Server running on http://localhost:${PORT}`);
});
