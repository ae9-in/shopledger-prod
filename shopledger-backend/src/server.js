import dotenv from 'dotenv';
dotenv.config();

import './config/db.js';
import app from './app.js';
import { startCleanupJob } from './utils/cleanupJob.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startCleanupJob();
});
