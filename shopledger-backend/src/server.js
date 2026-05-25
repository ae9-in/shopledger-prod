// ── Catch any synchronous crash before the server starts ─────────────────────
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config();

console.log('ENV loaded. NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL present:', Boolean(process.env.DATABASE_URL));
console.log('PORT:', process.env.PORT || 5000);

try {
  const { default: app } = await import('./app.js');
  await import('./config/db.js');
  const { startCleanupJob } = await import('./utils/cleanupJob.js');

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    startCleanupJob();
  });
} catch (err) {
  console.error('Startup crashed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
