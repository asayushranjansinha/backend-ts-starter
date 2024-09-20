import morgan from 'morgan';
import logger from '../util/logger';

const morganFormat = ':remote-addr :method :url :status :response-time ms'; 

const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logParts = message.split(' ');
      const logObject = {
        ip: logParts[0],               // The IP address is now the first element
        method: logParts[1],           // HTTP method
        url: logParts[2],              // Request URL
        status: logParts[3],           // Response status
        responseTime: logParts[4]      // Response time in ms
      };
      logger.info(JSON.stringify(logObject));
    }
  }
});

export default morganMiddleware;
