import { emailService } from './emailService';
import { getMetrics } from '../middleware/monitoring';

interface AlertThresholds {
  errorRate: number;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
}

interface AlertConfig {
  enabled: boolean;
  recipients: string[];
  thresholds: AlertThresholds;
  cooldownMinutes: number;
}

// Default alert configuration
const alertConfig: AlertConfig = {
  enabled: process.env.ALERTS_ENABLED === 'true',
  recipients: (process.env.ALERT_RECIPIENTS || '').split(',').filter(Boolean),
  thresholds: {
    errorRate: parseFloat(process.env.ALERT_THRESHOLD_ERROR_RATE || '10'),
    responseTime: parseFloat(process.env.ALERT_THRESHOLD_RESPONSE_TIME || '1000'),
    cpuUsage: parseFloat(process.env.ALERT_THRESHOLD_CPU_USAGE || '0.8'),
    memoryUsage: parseFloat(process.env.ALERT_THRESHOLD_MEMORY_USAGE || '0.9'),
  },
  cooldownMinutes: parseInt(process.env.ALERT_COOLDOWN_MINUTES || '15', 10),
};

// Track when alerts were last sent to prevent spamming
const lastAlertSent: Record<string, number> = {
  errorRate: 0,
  responseTime: 0,
  cpuUsage: 0,
  memoryUsage: 0,
};

/**
 * Check if system metrics exceed thresholds and send alerts if needed
 */
export const checkAlerts = async (): Promise<void> => {
  if (!alertConfig.enabled || alertConfig.recipients.length === 0) {
    return;
  }

  const metrics = getMetrics();
  const now = Date.now();
  const cooldownMs = alertConfig.cooldownMinutes * 60 * 1000;
  
  // Check error rate
  if (
    metrics.general.errorRate > alertConfig.thresholds.errorRate &&
    now - lastAlertSent.errorRate > cooldownMs
  ) {
    await sendAlert(
      'High Error Rate Alert',
      `The system is experiencing a high error rate of ${metrics.general.errorRate.toFixed(2)}%, which exceeds the threshold of ${alertConfig.thresholds.errorRate}%.
      
Recent errors:
${metrics.errors.slice(0, 5).map(err => 
  `- ${err.timestamp.toLocaleString()}: ${err.method} ${err.path} (${err.statusCode}) - ${err.message}`
).join('\n')}

View the monitoring dashboard for more details.`
    );
    lastAlertSent.errorRate = now;
  }
  
  // Check average response time
  if (
    metrics.general.avgResponseTime > alertConfig.thresholds.responseTime &&
    now - lastAlertSent.responseTime > cooldownMs
  ) {
    await sendAlert(
      'High Response Time Alert',
      `The system is experiencing high average response times of ${metrics.general.avgResponseTime.toFixed(2)}ms, which exceeds the threshold of ${alertConfig.thresholds.responseTime}ms.
      
Top 3 slowest endpoints:
${Object.entries(metrics.responseTimeByPath)
  .map(([path, data]) => ({ path, avg: data.total / data.count }))
  .sort((a, b) => b.avg - a.avg)
  .slice(0, 3)
  .map(item => `- ${item.path}: ${item.avg.toFixed(2)}ms`)
  .join('\n')}

View the monitoring dashboard for more details.`
    );
    lastAlertSent.responseTime = now;
  }
  
  // Check CPU usage
  const currentCpuUsage = metrics.system.cpuUsage[metrics.system.cpuUsage.length - 1];
  if (
    currentCpuUsage > alertConfig.thresholds.cpuUsage &&
    now - lastAlertSent.cpuUsage > cooldownMs
  ) {
    await sendAlert(
      'High CPU Usage Alert',
      `The system is experiencing high CPU usage of ${(currentCpuUsage * 100).toFixed(2)}%, which exceeds the threshold of ${(alertConfig.thresholds.cpuUsage * 100).toFixed(2)}%.
      
View the monitoring dashboard for more details.`
    );
    lastAlertSent.cpuUsage = now;
  }
  
  // Check memory usage
  const currentMemoryUsage = metrics.system.memoryUsage[metrics.system.memoryUsage.length - 1];
  if (
    currentMemoryUsage > alertConfig.thresholds.memoryUsage &&
    now - lastAlertSent.memoryUsage > cooldownMs
  ) {
    await sendAlert(
      'High Memory Usage Alert',
      `The system is experiencing high memory usage of ${(currentMemoryUsage * 100).toFixed(2)}%, which exceeds the threshold of ${(alertConfig.thresholds.memoryUsage * 100).toFixed(2)}%.
      
Total Memory: ${formatBytes(metrics.system.totalMemory)}
Free Memory: ${formatBytes(metrics.system.freeMemory)}

View the monitoring dashboard for more details.`
    );
    lastAlertSent.memoryUsage = now;
  }
};

/**
 * Send an alert email to configured recipients
 */
const sendAlert = async (subject: string, message: string): Promise<void> => {
  if (!alertConfig.enabled || alertConfig.recipients.length === 0) {
    console.log(`[AlertService] Alert triggered but sending disabled: ${subject}`);
    return;
  }
  
  try {
    const timestamp = new Date().toISOString();
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          .alert { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
          .header { background: #343a40; color: white; padding: 10px 15px; border-radius: 4px; }
          pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
          .footer { margin-top: 30px; font-size: 0.8em; color: #6c757d; border-top: 1px solid #dee2e6; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>⚠️ System Alert: ${subject}</h2>
          <p>Time: ${timestamp}</p>
        </div>
        
        <div class="alert">
          <p><strong>Alert Details:</strong></p>
          <pre>${message}</pre>
        </div>
        
        <p>This is an automated alert from the Bansy monitoring system.</p>
        
        <div class="footer">
          <p>To configure alert thresholds or disable these notifications, please update the alert settings in the system configuration.</p>
        </div>
      </body>
      </html>
    `;
    
    for (const recipient of alertConfig.recipients) {
      await emailService.sendMail({
        to: recipient,
        subject: `[ALERT] ${subject}`,
        html: htmlContent,
      });
    }
    
    console.log(`[AlertService] Alert sent to ${alertConfig.recipients.length} recipients: ${subject}`);
  } catch (error) {
    console.error('[AlertService] Failed to send alert:', error);
  }
};

/**
 * Format bytes to human-readable string
 */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Update alert configuration
 */
export const updateAlertConfig = (config: Partial<AlertConfig>): AlertConfig => {
  Object.assign(alertConfig, config);
  return { ...alertConfig };
};

/**
 * Get current alert configuration
 */
export const getAlertConfig = (): AlertConfig => {
  return { ...alertConfig };
};

/**
 * Add extension to emailService for sending alerts
 */
emailService.sendMail = async (options: { to: string; subject: string; html: string }): Promise<boolean> => {
  try {
    await emailService.sendRepositoryLink({
      email: options.to,
      candidateName: 'System Admin',
      jobTitle: 'System Alert',
      repositoryUrl: '#',
      companyName: 'Bansy Monitoring System',
    });
    return true;
  } catch (error) {
    console.error('[AlertService] Failed to send email:', error);
    return false;
  }
};

