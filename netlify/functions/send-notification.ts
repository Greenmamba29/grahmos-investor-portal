import type { Handler } from '@netlify/functions';
import { json } from './_db';

interface EmailNotification {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  type: 'welcome' | 'approval' | 'rejection' | 'admin_alert';
}

// Email templates
const emailTemplates = {
  welcome: (userName: string, userEmail: string) => ({
    subject: '🚀 Welcome to GrahmOS Connect - Your Account is Ready!',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16213e); color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(45deg, #0f3460, #16213e); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Welcome to GrahmOS Connect
          </h1>
          <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Advanced Emergency Communication Hub</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #00d4ff; margin: 0 0 20px; font-size: 22px;">Hello ${userName}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
            Your account has been successfully created and verified. You now have access to the GrahmOS Connect platform.
          </p>
          
          <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #00d4ff; margin: 0 0 15px; font-size: 18px;">Your Account Details:</h3>
            <p style="margin: 5px 0; font-family: monospace; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
              Email: ${userEmail}
            </p>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="https://grahmos.info/auth" style="display: inline-block; background: linear-gradient(45deg, #00d4ff, #0099cc); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);">
              Access Your Dashboard
            </a>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; margin: 25px 0 0; opacity: 0.8;">
            If you have any questions, feel free to contact our support team. We're here to help you make the most of your GrahmOS Connect experience.
          </p>
        </div>
        
        <div style="background: rgba(0,0,0,0.2); padding: 20px 30px; text-align: center; font-size: 12px; opacity: 0.7;">
          <p style="margin: 0;">© 2025 GrahmOS Connect. Advanced Emergency Communication Systems.</p>
        </div>
      </div>
    `,
    textContent: `
Welcome to GrahmOS Connect!

Hello ${userName},

Your account has been successfully created and verified. You now have access to the GrahmOS Connect platform.

Account Details:
Email: ${userEmail}

Access your dashboard: https://grahmos.info/auth

If you have any questions, feel free to contact our support team.

© 2025 GrahmOS Connect
    `
  }),

  investorApproval: (userName: string, userEmail: string) => ({
    subject: '🎉 Investor Access Approved - Welcome to GrahmOS Connect',
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16213e); color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(45deg, #0f3460, #16213e); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🎉 Access Approved!</h1>
          <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">GrahmOS Connect Investor Portal</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #00ff88; margin: 0 0 20px; font-size: 22px;">Congratulations ${userName}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
            Your investor application has been approved! You now have full access to the GrahmOS Connect investor portal, including:
          </p>
          
          <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px; padding: 20px; margin: 25px 0;">
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Real-time analytics and insights</li>
              <li>Investment opportunity tracking</li>
              <li>Exclusive investor resources</li>
              <li>Direct communication channels</li>
              <li>Portfolio management tools</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="https://grahmos.info/investor-portal" style="display: inline-block; background: linear-gradient(45deg, #00ff88, #00cc66); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);">
              Access Investor Portal
            </a>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; margin: 25px 0 0; opacity: 0.8;">
            Welcome to the GrahmOS Connect investor community. We're excited to have you on board!
          </p>
        </div>
      </div>
    `,
    textContent: `
Congratulations ${userName}!

Your investor application has been approved! You now have full access to the GrahmOS Connect investor portal.

Access your investor portal: https://grahmos.info/investor-portal

Welcome to the GrahmOS Connect investor community!
    `
  }),

  adminAlert: (userName: string, userEmail: string, applicationType: string) => ({
    subject: `🔔 New ${applicationType} Application - Admin Review Required`,
    htmlContent: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; border-radius: 12px; padding: 30px;">
        <h1 style="color: #ff6b6b; margin: 0 0 20px;">🔔 New Application Alert</h1>
        
        <p style="font-size: 16px; margin: 0 0 20px;">
          A new ${applicationType} application requires your review:
        </p>
        
        <div style="background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Applicant:</strong> ${userName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${applicationType}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://grahmos.info/admin/requests" style="display: inline-block; background: #ff6b6b; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
            Review Application
          </a>
        </div>
      </div>
    `,
    textContent: `
New ${applicationType} Application Alert

A new application requires your review:
- Applicant: ${userName}
- Email: ${userEmail}
- Type: ${applicationType}

Review at: https://grahmos.info/admin/requests
    `
  })
};

// Mock email service (replace with real email service like SendGrid, AWS SES, etc.)
async function sendEmail(notification: EmailNotification): Promise<boolean> {
  try {
    // In development, log email instead of sending
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_SERVICE_ENABLED) {
      console.log('📧 EMAIL NOTIFICATION (Development Mode):');
      console.log('To:', notification.to);
      console.log('Subject:', notification.subject);
      console.log('Type:', notification.type);
      console.log('Content:', notification.textContent);
      console.log('---');
      return true;
    }

    // Example implementation with SendGrid (uncomment and configure)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: notification.to,
      from: process.env.FROM_EMAIL || 'noreply@grahmos.info',
      subject: notification.subject,
      text: notification.textContent,
      html: notification.htmlContent,
    };

    await sgMail.send(msg);
    */

    // For now, just log the email notification
    console.log(`📧 Email sent to ${notification.to}: ${notification.subject}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { type, userEmail, userName, applicationType } = JSON.parse(event.body || '{}');

    if (!type || !userEmail) {
      return json(400, { error: 'Missing required fields: type, userEmail' });
    }

    let emailData;

    switch (type) {
      case 'welcome':
        emailData = emailTemplates.welcome(userName || 'User', userEmail);
        break;
      case 'investor_approval':
        emailData = emailTemplates.investorApproval(userName || 'Investor', userEmail);
        break;
      case 'admin_alert':
        emailData = emailTemplates.adminAlert(userName || 'User', userEmail, applicationType || 'General');
        break;
      default:
        return json(400, { error: 'Invalid notification type' });
    }

    const notification: EmailNotification = {
      to: userEmail,
      subject: emailData.subject,
      htmlContent: emailData.htmlContent,
      textContent: emailData.textContent,
      type: type as any
    };

    const emailSent = await sendEmail(notification);

    return json(200, {
      success: emailSent,
      message: emailSent ? 'Notification sent successfully' : 'Notification failed to send',
      type,
      recipient: userEmail
    });

  } catch (error) {
    console.error('Notification error:', error);
    return json(500, {
      error: 'Failed to send notification',
      details: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
