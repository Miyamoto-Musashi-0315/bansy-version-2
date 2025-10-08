import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import os from 'os';

// Simple in-memory metrics storage
interface Metrics {
  requestCount: number;
  errorCount: number;
  responseTimeTotal: number;
  responseTimeByPath: Record<string, { count: number; total: number; max: number }>;
  statusCodes: Record<number, number>;
  lastErrors: Array<{
    path: string;
    method: string;
    statusCode: number;
    message: string;
    timestamp: Date;
  }>;
  cpuUsage: number[];
  memoryUsage: number[];
  uptimeStart: number;
}

const metrics: Metrics = {
  requestCount: 0,
  errorCount: 0,
  responseTimeTotal: 0,
  responseTimeByPath: {},
  statusCodes: {},
  lastErrors: [],
  cpuUsage: [],
  memoryUsage: [],
  uptimeStart: Date.now(),
};

// Keep only the last 100 data points for charts
const MAX_HISTORY_POINTS = 100;
// Keep only the last 50 errors
const MAX_ERRORS = 50;

// Update system metrics every 60 seconds
setInterval(() => {
  // Get CPU usage
  const cpuUsage = os.loadavg()[0] / os.cpus().length; // Normalize by CPU count
  metrics.cpuUsage.push(cpuUsage);
  if (metrics.cpuUsage.length > MAX_HISTORY_POINTS) {
    metrics.cpuUsage.shift();
  }

  // Get memory usage
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedPercent = (totalMem - freeMem) / totalMem;
  metrics.memoryUsage.push(usedPercent);
  if (metrics.memoryUsage.length > MAX_HISTORY_POINTS) {
    metrics.memoryUsage.shift();
  }
}, 60000);

/**
 * Middleware to track request metrics
 */
export const monitoringMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = performance.now();
  const path = req.path;
  const method = req.method;

  // Initialize path metrics if not exists
  if (!metrics.responseTimeByPath[path]) {
    metrics.responseTimeByPath[path] = { count: 0, total: 0, max: 0 };
  }

  // Track request count
  metrics.requestCount++;

  // Capture response metrics
  const originalSend = res.send;
  res.send = function(body) {
    const responseTime = performance.now() - startTime;
    
    // Update path-specific metrics
    metrics.responseTimeByPath[path].count++;
    metrics.responseTimeByPath[path].total += responseTime;
    metrics.responseTimeByPath[path].max = Math.max(
      metrics.responseTimeByPath[path].max,
      responseTime
    );

    // Update total response time
    metrics.responseTimeTotal += responseTime;

    // Track status codes
    const statusCode = res.statusCode;
    metrics.statusCodes[statusCode] = (metrics.statusCodes[statusCode] || 0) + 1;

    // Track errors (4xx and 5xx)
    if (statusCode >= 400) {
      metrics.errorCount++;
      
      // Extract error message from response body if possible
      let errorMessage = 'Unknown error';
      try {
        if (typeof body === 'string' && body.startsWith('{')) {
          const parsed = JSON.parse(body);
          errorMessage = parsed.error || parsed.message || 'Unknown error';
        } else if (body && typeof body === 'object') {
          errorMessage = body.error || body.message || 'Unknown error';
        }
      } catch (e) {
        errorMessage = 'Error parsing response';
      }

      // Add to error log
      metrics.lastErrors.unshift({
        path,
        method,
        statusCode,
        message: errorMessage,
        timestamp: new Date(),
      });

      // Limit error log size
      if (metrics.lastErrors.length > MAX_ERRORS) {
        metrics.lastErrors.pop();
      }
    }

    // Continue with the original send
    return originalSend.call(this, body);
  };

  next();
};

/**
 * Get current metrics
 */
export const getMetrics = () => {
  const totalRequests = metrics.requestCount || 1; // Avoid division by zero
  
  return {
    general: {
      uptime: Math.floor((Date.now() - metrics.uptimeStart) / 1000), // in seconds
      requestCount: metrics.requestCount,
      errorCount: metrics.errorCount,
      errorRate: (metrics.errorCount / totalRequests) * 100,
      avgResponseTime: metrics.responseTimeTotal / totalRequests,
    },
    statusCodes: metrics.statusCodes,
    performance: {
      topPaths: Object.entries(metrics.responseTimeByPath)
        .map(([path, data]) => ({
          path,
          count: data.count,
          avgResponseTime: data.total / data.count,
          maxResponseTime: data.max,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    },
    system: {
      cpuUsage: metrics.cpuUsage,
      memoryUsage: metrics.memoryUsage,
      platform: os.platform(),
      cpuCores: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
    },
    errors: metrics.lastErrors,
  };
};

/**
 * Reset metrics (for testing)
 */
export const resetMetrics = () => {
  metrics.requestCount = 0;
  metrics.errorCount = 0;
  metrics.responseTimeTotal = 0;
  metrics.responseTimeByPath = {};
  metrics.statusCodes = {};
  metrics.lastErrors = [];
  metrics.cpuUsage = [];
  metrics.memoryUsage = [];
  metrics.uptimeStart = Date.now();
};


