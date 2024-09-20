import app from './app';
import Config from './config/config';
import logger from './util/logger';

const server = app.listen(Config.PORT, () => {
  logger.info('Server started', {
    metadata: {
      PORT: Config.PORT,
      SERVER_URL: Config.SERVER_URL
    }
  });
});

server.on('error', (error: NodeJS.ErrnoException) => {
  logger.error('Server error', { meta: error });
  server.close((closeError) => {
    if (closeError) {
      logger.error('Error closing server', { meta: closeError });
    }
    process.exit(1);
  });
});

// Graceful shutdown on termination signals
const shutdown = () => {
  logger.info('Received shutdown signal, shutting down gracefully...');
  server.close((error) => {
    if (error) {
      logger.error('Error during shutdown', { meta: error });
      process.exit(1);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
