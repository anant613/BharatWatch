import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class Logger {
  static log(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };

    // Console output
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);

    // File output in production
    if (process.env.NODE_ENV === 'production') {
      const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
  }

  static info(message, meta = {}) {
    this.log('info', message, meta);
  }

  static error(message, meta = {}) {
    this.log('error', message, meta);
  }

  static warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  static debug(message, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, meta);
    }
  }
}

export default Logger;
