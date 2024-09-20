import os from 'os';
import Config from '../config/config';

export const getSystemHealthStatus = () => {
  const systemHealthStatus = {
    cpuUsage: os.loadavg(),
    totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
    freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
  };
  return systemHealthStatus;
};

export const getApplicationHealthStatus = () => {
  const applicationHealthStatus = {
    environment: Config.ENV,
    uptime: `${process.uptime().toFixed(2)} seconds`,
    memoryUsage: {
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    }
  };
  return applicationHealthStatus;
};
