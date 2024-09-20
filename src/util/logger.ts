import { inspect } from 'util';
import { createLogger, format, Logger, transports } from 'winston';
import { EApplicationEnvironment } from '../constant/application';
import {
  ConsoleTransportInstance,
  FileTransportInstance
} from 'winston/lib/winston/transports';
import path from 'path';
import Config from '../config/config';
import * as SourceMapSupport from 'source-map-support';

// Linking typescript trace with dist
SourceMapSupport.install();

/**
 * Determines the logging level based on the application environment.
 * In development mode all messages from debug upwards will be logged.
 * In production mode only warn and error messages will be logged.
 * @returns {string} - Returns 'debug' if the environment is development, otherwise 'warn'.
 */
const level = (): string => {
  const env = process.env.NODE_ENV;
  return env === EApplicationEnvironment.DEVELOPMENT ? 'debug' : 'warn';
};

// Custom log format for console output
const consoleFormat = format.printf(({ level, message, metadata }) => {
  const detailedMetadata = inspect(metadata, { depth: null, colors: true });
  return `[${level}]: ${message} ${detailedMetadata}`;
});

// Custom log format for file output
const fileFormat = format.printf(({ level, message, timestamp, metadata }) => {
  const formattedMessage =
    typeof message === 'string' ? message : JSON.stringify(message);
  const formattedMetadata = JSON.stringify(metadata);
  return `${timestamp} | ${level} | ${formattedMessage} | ${formattedMetadata}`;
});

// Console transport configuration
const isProduction =
  process.env.NODE_ENV === EApplicationEnvironment.PRODUCTION;
const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (!isProduction) {
    return [
      new transports.Console({
        format: format.combine(
          format.colorize({ all: true }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          consoleFormat
        )
      })
    ];
  } else return [];
};

// File transport configuration
const filePath = path.join(
  __dirname,
  '../',
  '../',
  'logs',
  `${Config.ENV}.log`
);
const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: filePath,
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        fileFormat
      ),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ];
};

// Create the logger
const logger: Logger = createLogger({
  level: level(),
  format: format.combine(
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
  ),
  transports: [...consoleTransport(), ...fileTransport()]
});

export default logger;
