import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface CandidateEmailData {
  email: string;
  candidateName: string;
  jobTitle: string;
  repositoryUrl: string;
  companyName?: string;
  testUrl?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isEmailDisabled: boolean;

  constructor() {
    this.isEmailDisabled = !process.env.EMAIL_HOST || process.env.EMAIL_DISABLED === 'true';
    
    if (!this.isEmailDisabled) {
      this.initializeTransporter();
    } else {
      console.log('Email service disabled - no EMAIL_HOST configured or EMAIL_DISABLED=true');
    }
  }

  private async initializeTransporter() {
    try {
      const config: EmailConfig = {
        host: process.env.EMAIL_HOST!,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      };

      console.log('DEBUG: Email User:', config.auth.user);
      console.log('DEBUG: Email Pass:', config.auth.pass);

      this.transporter = nodemailer.createTransport(config);

      // Verify connection configuration
      await this.testConnection();

      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      this.isEmailDisabled = true;
    }
  }

  async sendRepositoryLink(candidateData: CandidateEmailData): Promise<boolean> {
    if (this.isEmailDisabled || !this.transporter) {
      console.log(`Email disabled - would send repository link to ${candidateData.email}: ${candidateData.repositoryUrl}`);
      return false;
    }

    try {
      const subject = `Your Coding Assessment for ${candidateData.jobTitle}`;
      const htmlContent = this.generateEmailTemplate(candidateData);

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER!,
        to: candidateData.email,
        subject,
        html: htmlContent,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${candidateData.email}:`, result.messageId);
      return true;
    } catch (error) {
      console.error(`❌ Failed to send email to ${candidateData.email}:`, error);
      return false;
    }
  }

  async sendBulkRepositoryLinks(candidatesData: CandidateEmailData[]): Promise<{
    successful: number;
    failed: number;
    results: Array<{ email: string; success: boolean; error?: string }>;
  }> {
    const results: Array<{ email: string; success: boolean; error?: string }> = [];

    for (const candidateData of candidatesData) {
      try {
        const success = await this.sendRepositoryLink(candidateData);
        results.push({ email: candidateData.email, success });
      } catch (error: any) {
        results.push({ 
          email: candidateData.email, 
          success: false, 
          error: error.message 
        });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Bulk email results: ${successful} successful, ${failed} failed`);

    return { successful, failed, results };
  }

  private generateEmailTemplate(candidateData: CandidateEmailData): string {
    const { email, candidateName, jobTitle, repositoryUrl, companyName, testUrl } = candidateData;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Coding Assessment</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
          }
          .title {
            color: #34495e;
            font-size: 20px;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 30px;
          }
          .repo-button, .test-button {
            display: inline-block;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 10px 5px;
            text-align: center;
          }
          .repo-button { background-color: #3498db; }
          .repo-button:hover { background-color: #2980b9; }
          .test-button { background-color: #2ecc71; }
          .test-button:hover { background-color: #27ae60; }
          .instructions {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
          }
          .highlight {
            background-color: #f39c12;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
          }
          .button-row { text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 AI Assessment Platform</div>
            <h1 class="title">Your Coding Assessment is Ready!</h1>
          </div>
          
          <div class="content">
            <p>Dear ${candidateName || 'Candidate'},</p>
            
            <p>Congratulations! You've been selected to take the coding assessment for the <strong>${jobTitle}</strong> position${companyName ? ` at ${companyName}` : ''}.</p>
            
            <p>We've created a personalized GitHub repository just for you with:</p>
            <ul>
              <li>✅ Complete project requirements and specifications</li>
              <li>⚙️ Pre-configured CI/CD pipeline for automated testing</li>
              <li>📋 GitHub Issues with detailed tasks to complete</li>
              <li>🔄 Real-time feedback on every code push</li>
            </ul>
            
            <div class="button-row">
              <a href="${repositoryUrl}" class="repo-button">🔗 Open GitHub Repository</a>
              ${testUrl ? `<a href="${testUrl}" class="test-button">🧪 Open Test Page</a>` : ''}
            </div>
            
            <div class="instructions">
              <h3>📝 How to Get Started:</h3>
              <ol>
                <li>Click the repository link above to access your private assessment repo</li>
                <li>Clone the repository to your local development environment</li>
                <li>Read the README.md file for complete project requirements</li>
                <li>Review the GitHub Issues - each one represents a feature to implement</li>
                <li>Start coding! The CI/CD pipeline will automatically test your work</li>
                ${testUrl ? '<li>Use the Test Page to run tests and submit your solution when finished</li>' : ''}
                <li>Push your commits regularly to track your progress</li>
              </ol>
            </div>
            
            <p><span class="highlight">Important:</span> The repository includes automated testing that runs on every push. You'll see real-time feedback via GitHub Actions and issue updates.</p>
            
            <p>Good luck! We're excited to see what you'll build. 🎯</p>
            
            <p>Best regards,<br>
            The Recruitment Team</p>
          </div>
          
          <div class="footer">
            <p>Repository URL: <a href="${repositoryUrl}">${repositoryUrl}</a></p>
            ${testUrl ? `<p>Test Page: <a href="${testUrl}">${testUrl}</a></p>` : ''}
            <p>If you have any questions, please reply to this email.</p>
            <p>This assessment was powered by AI Assessment Platform</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async testConnection(): Promise<boolean> {
    if (this.isEmailDisabled || !this.transporter) {
      console.log('Email service is disabled - skipping connection test');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection test failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export { EmailService, CandidateEmailData }; 