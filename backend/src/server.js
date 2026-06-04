import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './config/db.js';

async function start() {
  try {
    await testConnection();
    console.log('✓ MySQL connected (Laragon)');
    console.log(`  Database: ${env.db.database} @ ${env.db.host}:${env.db.port}`);
  } catch (err) {
    console.error('✗ MySQL connection failed:', err.message);
    console.error('\n  Check Laragon MySQL is running and .env settings are correct.');
    console.error('  Copy backend/.env.example to backend/.env and run: npm run db:setup\n');
    process.exit(1);
  }

  app.listen(env.port, () => {
    console.log(`✓ AMH API server running on http://localhost:${env.port}`);
    console.log(`  Health: http://localhost:${env.port}/api/health`);
  });
}

start();
