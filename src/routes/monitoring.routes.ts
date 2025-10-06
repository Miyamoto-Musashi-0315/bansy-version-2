import { Router } from 'express';
import { getMetrics } from '../middleware/monitoring';
import { authenticateUser, requireDeveloper } from '../middleware/auth';

const router = Router();

/**
 * @route GET /api/monitoring/metrics
 * @desc Get system metrics and performance data
 * @access Private (Developer only)
 */
router.get('/metrics', authenticateUser, requireDeveloper, (req, res) => {
  const metrics = getMetrics();
  res.json(metrics);
});

/**
 * @route GET /api/monitoring/health
 * @desc Simple health check endpoint
 * @access Public
 */
router.get('/health', (req, res) => {
  const metrics = getMetrics();
  
  // Calculate health status based on error rate and response time
  const errorRate = metrics.general.errorRate;
  const avgResponseTime = metrics.general.avgResponseTime;
  
  let status = 'healthy';
  let statusCode = 200;
  
  if (errorRate > 10 || avgResponseTime > 1000) {
    status = 'degraded';
    statusCode = 200; // Still return 200 to avoid triggering alerts
  }
  
  if (errorRate > 25 || avgResponseTime > 3000) {
    status = 'critical';
    statusCode = 200; // Still return 200 to avoid triggering alerts
  }
  
  res.status(statusCode).json({
    status,
    uptime: metrics.general.uptime,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

/**
 * @route GET /api/monitoring/errors
 * @desc Get recent system errors
 * @access Private (Developer only)
 */
router.get('/errors', authenticateUser, requireDeveloper, (req, res) => {
  const metrics = getMetrics();
  res.json({
    errors: metrics.errors,
    errorCount: metrics.general.errorCount,
    errorRate: metrics.general.errorRate,
  });
});

export default router;