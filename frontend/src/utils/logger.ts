type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = import.meta.env.MODE === 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${data ? '\n' + JSON.stringify(data, null, 2) : ''}`;
  }

  public debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, data));
    }
  }

  public info(message: string, data?: any): void {
    console.info(this.formatMessage('info', message, data));
  }

  public warn(message: string, data?: any): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  public error(message: string, error?: any): void {
    console.error(this.formatMessage('error', message, error));
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}

export const logger = Logger.getInstance();
