// Simple notification system for admin alerts
// For now, this logs to console and could be extended with actual email service

interface NotificationData {
  type: 'investor_application' | 'user_signup' | 'admin_action';
  email: string;
  data: Record<string, unknown>;
}

export async function sendAdminNotification(notification: NotificationData) {
  const adminEmail = 'mmcdonald@grahmos.com';
  
  // Log the notification (in production, you'd send actual email)
  console.log(`📧 ADMIN NOTIFICATION for ${adminEmail}:`);
  console.log(`Type: ${notification.type}`);
  console.log(`User Email: ${notification.email}`);
  console.log(`Data:`, JSON.stringify(notification.data, null, 2));
  
  // In a production environment, you would integrate with:
  // - SendGrid, Mailgun, AWS SES, or similar email service
  // - Slack webhook
  // - Discord webhook
  // - SMS service
  
  try {
    // For now, we'll just create a record that an admin can check
    // This could be extended to actual email sending
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      adminEmail,
      notificationType: notification.type,
      userEmail: notification.email,
      data: notification.data
    };
    
    // This would be where you'd send the actual email
    // await sendEmail({
    //   to: adminEmail,
    //   subject: `New ${notification.type} - Investor Portal`,
    //   body: generateEmailBody(notification)
    // });
    
    return { success: true, logged: true };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error: String(error) };
  }
}

function generateEmailBody(notification: NotificationData): string {
  switch (notification.type) {
    case 'investor_application':
      return `
        New Investor Application Received
        
        User: ${notification.email}
        Pitch: ${notification.data.pitch || 'None provided'}
        Accredited: ${notification.data.accreditation ? 'Yes' : 'No'}
        
        Please review at: http://localhost:8888/admin/requests
      `;
    
    case 'user_signup':
      return `
        New User Signup
        
        Email: ${notification.email}
        Role: ${notification.data.role || 'standard'}
        Name: ${notification.data.firstName || ''} ${notification.data.lastName || ''}
      `;
    
    case 'admin_action':
      return `
        Admin Action Taken
        
        Action: ${notification.data.action}
        Target User: ${notification.email}
        Details: ${JSON.stringify(notification.data.details)}
      `;
    
    default:
      return `
        Portal Notification
        
        Type: ${notification.type}
        User: ${notification.email}
        Data: ${JSON.stringify(notification.data)}
      `;
  }
}
